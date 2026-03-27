import { productBasicMockData } from "@/data/mock/products/product-basic";
import { productsIntroTextContentBlock } from "@/data/mock/products/text-content-block";
import {
  mapProductBasicToListItem,
  mapStorefrontProductToListItem,
  mapTextContentBlockReference,
} from "@/data/products/mappers";
import { storefrontQuery } from "@/data/shopify/storefront-client";
import type {
  ShopifyMetaobjectField,
  ShopifyMetaobjectNode,
  ShopifyProductNode,
  ShopifyProductReference,
  ShopifyProductsPageQueryData,
} from "@/data/shopify/types";
import { isShopifyDataSource } from "@/data/source";
import type { ProductSummary, ProductsPageData } from "@/types/products";

const productsPageMetaobjectType = "products_page";
const productsPageMetaobjectHandle = "products-page";

const productsPageQuery = `
  query ProductsPageMetaobject($type: String!, $handle: String!) {
    metaobject(handle: { type: $type, handle: $handle }) {
      id
      type
      handle
      fields {
        key
        value
        type
        reference {
          __typename
          ... on Metaobject {
            fields {
              key
              value
              type
            }
          }
        }
        references(first: 50) {
          nodes {
            __typename
            ... on Product {
              id
              handle
              title
              description
              availableForSale
              productType
              cardSpecsMetafield: metafield(
                namespace: "custom"
                key: "product_card_specs_list"
              ) {
                type
                value
                reference {
                  __typename
                  ... on Metaobject {
                    id
                    type
                    handle
                    fields {
                      key
                      value
                      type
                    }
                  }
                }
              }
              subtitleMetafield: metafield(
                namespace: "custom"
                key: "product_subtitle"
              ) {
                type
                value
              }
              featuredImage {
                url
                altText
              }
              priceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
    }
    detailPages: metaobjects(type: "product_details_page", first: 50) {
      nodes {
        handle
        fields {
          key
          value
          type
          reference {
            __typename
            ... on Product {
              handle
              title
            }
          }
        }
      }
    }
  }
`;

export async function getProductsPageData(): Promise<ProductsPageData> {
  if (isShopifyDataSource()) {
    return getShopifyProductsPageData();
  }

  return getMockProductsPageData();
}

function getMockProductsPageData(): ProductsPageData {
  return {
    textContentBlock: productsIntroTextContentBlock,
    items: productBasicMockData.map(mapProductBasicToListItem),
  };
}

async function getShopifyProductsPageData(): Promise<ProductsPageData> {
  const data = await storefrontQuery<ShopifyProductsPageQueryData>(
    productsPageQuery,
    {
      type: productsPageMetaobjectType,
      handle: productsPageMetaobjectHandle,
    },
  );

  if (!data.metaobject) {
    throw new Error("Products page metaobject was not found in Shopify");
  }

  const introField = data.metaobject.fields.find(
    (field) => field.key === "products_intro_text_content_block",
  );
  const productsField = data.metaobject.fields.find(
    (field) => field.key === "products_list",
  );
  const detailPageHandles = getDetailPageProductHandles(data.detailPages.nodes);

  return {
    textContentBlock: mapTextContentBlockReference(
      introField,
      productsIntroTextContentBlock,
    ),
    items: mapProductsList(productsField, detailPageHandles),
  };
}

function mapProductsList(
  field: ShopifyMetaobjectField | undefined,
  detailPageHandles: Set<string>,
): ProductSummary[] {
  const products = field?.references?.nodes ?? [];

  return products
    .filter((node): node is ShopifyProductNode => node.__typename === "Product")
    .map((product) =>
      mapStorefrontProductToListItem(
        product,
        detailPageHandles.has(product.handle),
      ),
    );
}

function getDetailPageProductHandles(
  detailPages: ShopifyMetaobjectNode[],
): Set<string> {
  return new Set(
    detailPages
      .map((detailPage) =>
        detailPage.fields.find((field) => field.key === "product")?.reference,
      )
      .filter(
        (reference): reference is ShopifyProductReference =>
          reference != null && reference.__typename === "Product",
      )
      .map((reference) => reference.handle),
  );
}
