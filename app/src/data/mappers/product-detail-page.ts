import type { ShopifyMetaobjectNode, ShopifyProductNode } from "@/types/shopify";
import { productDetailPageFieldKeys } from "@/data/shopify/metaobjects/pages";

export function getReferencedProductFromDetailPage(
  detailPage: ShopifyMetaobjectNode,
): ShopifyProductNode | undefined {
  const reference = detailPage.fields.find(
    (field) => field.key === productDetailPageFieldKeys.product,
  )?.reference;

  if (!reference || reference.__typename !== "Product") {
    return undefined;
  }

  return reference as ShopifyProductNode;
}
