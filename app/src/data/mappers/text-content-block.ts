import type { ProductsTextContentBlockData } from "@/types/products";
import type {
  ShopifyMetaobjectField,
  ShopifyScalarMetaobjectField,
} from "@/types/shopify";
import { textContentBlockFieldKeys } from "@/data/shopify/metaobjects/components";
import { getMetaobjectTextValue } from "./shopify";

export function mapTextContentBlockReference(
  field: ShopifyMetaobjectField | undefined,
  fallback?: ProductsTextContentBlockData,
): ProductsTextContentBlockData {
  if (!field?.reference || field.reference.__typename !== "Metaobject") {
    return fallback ?? {};
  }

  return mapTextContentBlockFields(field.reference.fields, fallback) ?? {};
}

export function mapTextContentBlockFields(
  fields: ShopifyScalarMetaobjectField[] | undefined,
  fallback?: ProductsTextContentBlockData,
): ProductsTextContentBlockData | undefined {
  if (!fields?.length) {
    return hasTextContentBlockContent(fallback) ? fallback : undefined;
  }

  const mapped = {
    thoughtTitle:
      textContentBlockFieldKeys.thoughtTitle
        .map((key) => getMetaobjectTextValue(fields, key))
        .find(Boolean) ??
      fallback?.thoughtTitle,
    mainTitle:
      getMetaobjectTextValue(fields, textContentBlockFieldKeys.mainTitle) ??
      fallback?.mainTitle,
    text1:
      getMetaobjectTextValue(fields, textContentBlockFieldKeys.text1) ??
      fallback?.text1,
    text2:
      getMetaobjectTextValue(fields, textContentBlockFieldKeys.text2) ??
      fallback?.text2,
  };

  return hasTextContentBlockContent(mapped) ? mapped : undefined;
}

function hasTextContentBlockContent(
  block: ProductsTextContentBlockData | undefined,
): boolean {
  if (!block) {
    return false;
  }

  return Boolean(
    block.thoughtTitle || block.mainTitle || block.text1 || block.text2,
  );
}
