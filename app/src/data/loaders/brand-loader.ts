import { shopifyMetaobjects } from "../shopify/metaobjects/metaobjects";
import { brandFallbackData } from "../fallback/brand-fallback";
import { isShopifyDataSource } from "../source";
import { storefrontQuery } from "../shopify/storefront-client";
import { ShopifyMetaobjectField } from "../../types/shopify";
import { BrandData } from "@/types/brand";

export interface ShopifyBrandQueryData {
  metaobject: {
    handle: string;
    type: string;
    fields: ShopifyMetaobjectField[];
  } | null;
}

const brandQuery = `
  query SharedBrand($handle: String!) {
    metaobject(handle: { type: "${shopifyMetaobjects.sharedBrandData.type}", handle: $handle }) {
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
    handle: shopifyMetaobjects.sharedBrandData.handle,
  });

  if (!data.metaobject) {
    return brandFallbackData;
  }

  const fields = data.metaobject.fields;

  return {
    // Not even importing the mppers MESS for now:
    name: getMetaobjectTextValue(fields, "name") || brandFallbackData.name,
    slogan:
      getMetaobjectTextValue(fields, "slogan") || brandFallbackData.slogan,
    logoVertical:
      mapMediaImageReference(
        // Hardcoded metaobject names here also
        getMediaImageReference(fields, ["logo_vertical", "logo-vertical"]),
        "Vertical brand logo",
      )?.src || brandFallbackData.logoVertical,
    logoHorizontal:
      mapMediaImageReference(
        getMediaImageReference(fields, ["logo_horizontal", "logo-horizontal"]),
        "Horizontal brand logo",
      )?.src || brandFallbackData.logoHorizontal,
  };
}

function getMediaImageReference(
  fields: ShopifyMetaobjectField[],
  keys: string[],
) {
  const reference = fields.find((field) => keys.includes(field.key))?.reference;

  if (!reference || reference.__typename !== "MediaImage") {
    return undefined;
  }

  return reference;
}
