import { productBasicMockData } from "@/data/mock/products/product-basic";
import { productsIntroTextContentBlock } from "@/data/mock/products/text-content-block";
import {
  mapProductBasicToListItem,
  mapProductCardSpecs,
  mapStorefrontProductToListItem,
  mapTextContentBlockReference,
} from "@/data/products/mappers";
import { shopifyMetaobjects } from "@/data/shopify/metaobjects";
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
    detailPages: metaobjects(type: "${shopifyMetaobjects.productDetailsPage.type}", first: 50) {
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
            ... on Metaobject {
              handle
              type
              fields {
                key
                value
                type
              }
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
      type: shopifyMetaobjects.productsPage.type,
      handle: shopifyMetaobjects.productsPage.handle,
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
  const detailPageSpecs = getDetailPageSpecs(data.detailPages.nodes);

  return {
    textContentBlock: mapTextContentBlockReference(
      introField,
      productsIntroTextContentBlock,
    ),
    items: mapProductsList(productsField, detailPageHandles, detailPageSpecs),
  };
}

function mapProductsList(
  field: ShopifyMetaobjectField | undefined,
  detailPageHandles: Set<string>,
  detailPageSpecs: Map<string, ProductSummary["specs"]>,
): ProductSummary[] {
  const products = field?.references?.nodes ?? [];

  return products
    .filter((node): node is ShopifyProductNode => node.__typename === "Product")
    .map((product) =>
      mapStorefrontProductToListItem(
        product,
        detailPageHandles.has(product.handle),
        detailPageSpecs.get(product.handle),
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

function getDetailPageSpecs(
  detailPages: ShopifyMetaobjectNode[],
): Map<string, ProductSummary["specs"]> {
  return new Map(
    detailPages
      .map((detailPage) => {
        const productReference = detailPage.fields.find(
          (field) => field.key === "product",
        )?.reference;
        const keySpecsReference = detailPage.fields.find(
          (field) => field.key === "key_specs",
        )?.reference;

        if (
          !productReference ||
          productReference.__typename !== "Product" ||
          !keySpecsReference ||
          keySpecsReference.__typename !== "Metaobject"
        ) {
          return undefined;
        }

        const specs = mapProductCardSpecs(keySpecsReference.fields, 3);

        if (specs.length === 0) {
          return undefined;
        }

        return [productReference.handle, specs] as const;
      })
      .filter((entry): entry is readonly [string, ProductSummary["specs"]] =>
        Boolean(entry),
      ),
  );
}
