import { mapMediaImageReference, getMetaobjectTextValue } from "@/data/products/mappers";
import { shopifyMetaobjects } from "@/data/shopify/metaobjects";
import { storefrontQuery } from "@/data/shopify/storefront-client";
import type { ShopifyMetaobjectField } from "@/data/shopify/types";
import { isShopifyDataSource } from "@/data/source";

export interface BrandData {
  name: string;
  slogan: string;
  logoVertical?: string;
  logoHorizontal?: string;
}

interface ShopifyBrandQueryData {
  metaobject: {
    handle: string;
    type: string;
    fields: ShopifyMetaobjectField[];
  } | null;
}

const brandFallbackData: BrandData = {
  name: "Spectrum Audio Instruments",
  slogan: "Vintage sound. Modern precision.",
};

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
    name: getMetaobjectTextValue(fields, "name") || brandFallbackData.name,
    slogan: getMetaobjectTextValue(fields, "slogan") || brandFallbackData.slogan,
    logoVertical: mapMediaImageReference(
      getMediaImageReference(fields, ["logo_vertical", "logo-vertical"]),
      "Vertical brand logo",
    )?.src,
    logoHorizontal: mapMediaImageReference(
      getMediaImageReference(fields, ["logo_horizontal", "logo-horizontal"]),
      "Horizontal brand logo",
    )?.src,
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
