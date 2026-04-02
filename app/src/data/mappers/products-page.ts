import type { ProductSummary } from "@/types/products";
import type {
  ShopifyMetaobjectField,
  ShopifyMetaobjectNode,
  ShopifyProductNode,
  ShopifyProductReference,
} from "@/types/shopify";
import { productsPageFieldKeys } from "@/data/shopify/metaobjects/pages";
import { mapProductCardSpecs, mapStorefrontProductToListItem } from "./product-primitives";

export function mapProductsPageItems(
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

export function getDetailPageProductHandles(
  detailPages: ShopifyMetaobjectNode[],
): Set<string> {
  return new Set(
    detailPages
      .map(
        (detailPage) =>
          detailPage.fields.find(
            (field) => field.key === productsPageFieldKeys.product,
          )?.reference,
      )
      .filter(
        (reference): reference is ShopifyProductReference =>
          reference != null && reference.__typename === "Product",
      )
      .map((reference) => reference.handle),
  );
}

export function getDetailPageSpecs(
  detailPages: ShopifyMetaobjectNode[],
): Map<string, ProductSummary["specs"]> {
  return new Map(
    detailPages
      .map((detailPage) => {
        const productReference = detailPage.fields.find(
          (field) => field.key === productsPageFieldKeys.product,
        )?.reference;
        const keySpecsReference = detailPage.fields.find(
          (field) => field.key === productsPageFieldKeys.keySpecs,
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
