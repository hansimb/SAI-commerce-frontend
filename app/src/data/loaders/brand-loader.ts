import { brandFallbackData } from "../fallback/brand-fallback";
import { isShopifyDataSource } from "../source";
import { storefrontQuery } from "../shopify/storefront-client";
import type { ShopifyMetaobjectField } from "../../types/shopify";
import type { BrandData } from "@/types/brand";
import {
  getMediaImageReference,
  getMetaobjectTextValue,
  mapMediaImageReference,
} from "../mappers";
import {
  brandFieldKeys,
  shopifySharedMetaobjects,
} from "../shopify/metaobjects/shared";

export interface ShopifyBrandQueryData {
  metaobject: {
    handle: string;
    type: string;
    fields: ShopifyMetaobjectField[];
  } | null;
}

const brandQuery = `
  query SharedBrand($handle: String!) {
    metaobject(handle: { type: "${shopifySharedMetaobjects.brand.type}", handle: $handle }) {
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
  }
`;

export async function getBrandData(): Promise<BrandData> {
  if (!isShopifyDataSource()) {
    return brandFallbackData;
  }

  const data = await storefrontQuery<ShopifyBrandQueryData>(brandQuery, {
    handle: shopifySharedMetaobjects.brand.handle,
  });

  if (!data.metaobject) {
    return brandFallbackData;
  }

  const fields = data.metaobject.fields;

  return {
    name:
      getMetaobjectTextValue(fields, brandFieldKeys.name) ||
      brandFallbackData.name,
    slogan:
      getMetaobjectTextValue(fields, brandFieldKeys.slogan) ||
      brandFallbackData.slogan,
    logoVertical:
      mapMediaImageReference(
        getMediaImageReference(fields, brandFieldKeys.logoVertical),
        "Vertical brand logo",
      )?.src || brandFallbackData.logoVertical,
    logoHorizontal:
      mapMediaImageReference(
        getMediaImageReference(fields, brandFieldKeys.logoHorizontal),
        "Horizontal brand logo",
      )?.src || brandFallbackData.logoHorizontal,
  };
}
