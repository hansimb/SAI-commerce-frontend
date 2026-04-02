import type { ProductImageAsset } from "@/types/products";
import type { ShopifyMediaImageReference } from "@/types/shopify";

export function mapMediaImageReference(
  reference: ShopifyMediaImageReference | null | undefined,
  fallbackAlt: string,
): ProductImageAsset | undefined {
  const image = reference?.image;

  if (!image?.url) {
    return undefined;
  }

  return {
    src: image.url,
    alt: image.altText || fallbackAlt,
  };
}
