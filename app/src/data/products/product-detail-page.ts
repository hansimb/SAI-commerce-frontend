import { productBasicDataBySlug } from "@/data/mock/products/product-basic";
import { productCustomizationCardDataBySlug } from "@/data/mock/products/customization-card";
import { productPageDataBySlug } from "@/data/mock/products/product-page";
import {
  mapProductDetailsMetaobject,
  mapStorefrontProductToListItem,
} from "@/data/products/mappers";
import { shopifyMetaobjects } from "@/data/shopify/metaobjects";
import { storefrontQuery } from "@/data/shopify/storefront-client";
import type {
  ShopifyMetaobjectNode,
  ShopifyProductDetailPagesQueryData,
  ShopifyProductNode,
} from "@/types/shopify";
import { isShopifyDataSource } from "@/data/source";
import type { ProductDetailPageData } from "@/types/products";

const ctaLabel = "Buy";

const productDetailPagesQuery = `
  query ProductDetailPages {
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
            ... on Metaobject {
              handle
              type
              fields {
                key
                value
                type
                reference {
                  __typename
                  ... on MediaImage {
                    image {
                      url
                      altText
                    }
                  }
                }
              }
            }
            ... on MediaImage {
              image {
                url
                altText
              }
            }
          }
        }
      }
    }
  }
`;

export async function getProductDetailPageData(
  slug: string,
): Promise<ProductDetailPageData | undefined> {
  if (isShopifyDataSource()) {
    return getShopifyProductDetailPageData(slug);
  }

  return getMockProductDetailPageData(slug);
}

function getMockProductDetailPageData(
  slug: string,
): ProductDetailPageData | undefined {
  const product = productBasicDataBySlug[slug];
  const detail = productPageDataBySlug[slug];
  const customization = productCustomizationCardDataBySlug[slug];

  if (!product || !detail) {
    return undefined;
  }

  return {
    product,
    detail,
    customization,
    ctaLabel,
  };
}

async function getShopifyProductDetailPageData(
  slug: string,
): Promise<ProductDetailPageData | undefined> {
  const data = await storefrontQuery<ShopifyProductDetailPagesQueryData>(
    productDetailPagesQuery,
  );

  const detailPage = data.detailPages.nodes.find(
    (node) => getReferencedProduct(node)?.handle === slug,
  );

  const productReference = detailPage
    ? getReferencedProduct(detailPage)
    : undefined;

  if (!detailPage || !productReference) {
    return undefined;
  }

  const product = mapStorefrontProductToListItem(productReference, true);

  return {
    product,
    detail: mapProductDetailsMetaobject(detailPage, product),
    customization: undefined,
    ctaLabel,
  };
}

function getReferencedProduct(
  detailPage: ShopifyMetaobjectNode,
): ShopifyProductNode | undefined {
  const reference = detailPage.fields.find(
    (field) => field.key === "product",
  )?.reference;

  if (!reference || reference.__typename !== "Product") {
    return undefined;
  }

  return reference as ShopifyProductNode;
}
