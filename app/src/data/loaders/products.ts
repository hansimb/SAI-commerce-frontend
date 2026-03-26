import {
  productBasicDataBySlug,
  productBasicMockData,
} from "@/data/mock/products/product-basic";
import { productCustomizationCardDataBySlug } from "@/data/mock/products/customization-card";
import { productPageDataBySlug } from "@/data/mock/products/product-page";
import { productsIntroTextContentBlock } from "@/data/mock/products/text-content-block";
import {
  mapProductBasicToListItem,
  mapStorefrontProductToListItem,
  mapTextContentBlockReference,
} from "@/data/products/mappers";
import { storefrontQuery } from "@/data/shopify/storefront-client";
import type {
  ShopifyMetaobjectField,
  ShopifyProductNode,
  ShopifyProductsPageQueryData,
} from "@/data/shopify/types";
import { isShopifyDataSource } from "@/data/source";
import type {
  ProductDetailPageData,
  ProductsPageData,
} from "@/types/products";

const ctaLabel = "Add to cart";
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
              productType
              metafield(namespace: "custom", key: "product_card_specs_list") {
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

export function getProductPageData(
  slug: string,
): ProductDetailPageData | undefined {
  if (isShopifyDataSource()) {
    return getShopifyProductPageData(slug);
  }

  return getMockProductPageData(slug);
}

function getMockProductPageData(
  slug: string,
): ProductDetailPageData | undefined {
  const basic = productBasicDataBySlug[slug];
  const page = productPageDataBySlug[slug];
  const customization = productCustomizationCardDataBySlug[slug];

  if (!basic || !page || !customization) {
    return undefined;
  }

  return {
    slug,
    hero: {
      title: basic.title,
      price: basic.price,
      image: basic.image,
      ctaLabel,
    },
    largeImage: {
      title: page.largeImageTitle,
      image: basic.image,
    },
    keySpecs: {
      title: page.keySpecsTitle,
      specs: page.keySpecs,
    },
    highlights: {
      title: page.highlightsTitle,
      items: page.highlights,
    },
    customization: {
      title: customization.title,
      image: customization.image,
      optionGroups: customization.optionGroups,
    },
    horizontalSpecs: {
      title: page.horizontalSpecsTitle,
      image: basic.image,
      specs: page.horizontalSpecs,
    },
    verticalSpecs: {
      title: page.verticalSpecsTitle,
      image: basic.image,
      specs: page.verticalSpecs,
    },
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

  return {
    textContentBlock: mapTextContentBlockReference(
      introField,
      productsIntroTextContentBlock,
    ),
    items: mapProductsList(productsField),
  };
}

function getShopifyProductPageData(
  slug: string,
): ProductDetailPageData | undefined {
  return getMockProductPageData(slug);
}

function mapProductsList(
  field: ShopifyMetaobjectField | undefined,
){
  const products = field?.references?.nodes ?? [];

  return products
    .filter((node): node is ShopifyProductNode => node.__typename === "Product")
    .map(mapStorefrontProductToListItem);
}
