import type {
  ProductDetailContentData,
  ProductHighlightsSectionData,
  ProductImageAsset,
  ProductImageSpecsSectionData,
  ProductSpecItem,
  ProductSpecsSectionData,
  ProductSummary,
  ProductsTextContentBlockData,
} from "@/types/products";
import type {
  ShopifyMediaImageReference,
  ShopifyMetaobjectField,
  ShopifyMetaobjectNode,
  ShopifyMetaobjectReference,
  ShopifyProductNode,
  ShopifyScalarMetaobjectField,
} from "@/data/shopify/types";

const fallbackProductsTextContentBlock: ProductsTextContentBlockData = {
  thoughtTitle: "Products",
  mainTitle: "Built for engineers, listeners, and long-term ownership",
  text1:
    "This first pass keeps the products area intentionally simple. The page is driven by temporary mock content now, but the structure is aimed at a later Shopify-backed product flow.",
};

export function mapProductBasicToListItem(
  product: ProductSummary,
): ProductSummary {
  return {
    ...product,
  };
}

export function mapStorefrontProductToListItem(
  product: ShopifyProductNode,
  hasDetails = false,
): ProductSummary {
  return {
    slug: product.handle,
    hasDetails,
    availableForSale: product.availableForSale,
    categoryLabel: product.productType || "",
    title: product.title,
    subtitle: product.subtitleMetafield?.value || "",
    description: product.description || "",
    image: {
      src: product.featuredImage?.url || "/globe.svg",
      alt: product.featuredImage?.altText || product.title,
    },
    price: formatMoney(product.priceRange.minVariantPrice.amount),
    priceSubtitle: product.priceRange.minVariantPrice.currencyCode,
    specs: mapProductCardSpecs(product.cardSpecsMetafield?.reference?.fields),
  };
}

export function mapTextContentBlockReference(
  field: ShopifyMetaobjectField | undefined,
  fallback: ProductsTextContentBlockData = fallbackProductsTextContentBlock,
): ProductsTextContentBlockData {
  if (!field?.reference || field.reference.__typename !== "Metaobject") {
    return fallback;
  }

  return mapTextContentBlockFields(field.reference.fields, fallback) ?? fallback;
}

export function mapTextContentBlockFields(
  fields: ShopifyScalarMetaobjectField[] | undefined,
  fallback: ProductsTextContentBlockData = {},
): ProductsTextContentBlockData | undefined {
  if (!fields?.length) {
    return hasTextContentBlockContent(fallback) ? fallback : undefined;
  }

  const mapped = {
    thoughtTitle:
      getMetaobjectTextValue(fields, "thought_title") ??
      getMetaobjectTextValue(fields, "tought_title") ??
      fallback.thoughtTitle,
    mainTitle:
      getMetaobjectTextValue(fields, "main_title") ?? fallback.mainTitle,
    text1: getMetaobjectTextValue(fields, "text1") ?? fallback.text1,
    text2: getMetaobjectTextValue(fields, "text2") ?? fallback.text2,
  };

  return hasTextContentBlockContent(mapped) ? mapped : undefined;
}

export function mapProductCardSpecs(
  fields: ShopifyScalarMetaobjectField[] | undefined,
  limit?: number,
): ProductSpecItem[] {
  return mapSpecsFromMetaobjectFields(fields, "spec_description", "spec_detail", limit);
}

export function mapSpecsFromMetaobjectFields(
  fields: ShopifyScalarMetaobjectField[] | undefined,
  labelKey: string,
  valueKey: string,
  limit?: number,
): ProductSpecItem[] {
  if (!fields?.length) {
    return [];
  }

  const labels = parseStringList(getMetaobjectTextValue(fields, labelKey));
  const values = parseStringList(getMetaobjectTextValue(fields, valueKey));

  const specs = labels
    .map((label, index) => ({
      label,
      value: values[index] || "",
    }))
    .filter((spec) => spec.label && spec.value);

  return typeof limit === "number" ? specs.slice(0, limit) : specs;
}

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

export function mapProductDetailsMetaobject(
  metaobject: ShopifyMetaobjectNode,
  product: ProductSummary,
): ProductDetailContentData {
  const fields = metaobject.fields;

  const heroImage =
    mapMediaImageReference(
      getMetaobjectFieldReference<ShopifyMediaImageReference>(
        fields,
        "large_hero_image",
        "MediaImage",
      ),
      `${product.title} hero image`,
    ) || product.image;

  const largeImage = mapMediaImageReference(
    getMetaobjectFieldReference<ShopifyMediaImageReference>(
      fields,
      "large_image",
      "MediaImage",
    ),
    `${product.title} detail image`,
  );

  const largeImage2 = mapMediaImageReference(
    getMetaobjectFieldReference<ShopifyMediaImageReference>(
      fields,
      "large_image_2",
      "MediaImage",
    ),
    `${product.title} secondary detail image`,
  );

  const keySpecs = mapMetaobjectSpecsSection(
    getMetaobjectFieldReference<ShopifyMetaobjectReference>(
      fields,
      "key_specs",
      "Metaobject",
    )?.fields,
    "Key specs",
    3,
  );

  const highlightItems = parseStringList(
    getMetaobjectTextValue(fields, "highlights"),
  ).slice(0, 4);
  const highlights: ProductHighlightsSectionData | undefined =
    highlightItems.length > 0
      ? {
          title: "Highlights",
          items: highlightItems,
        }
      : undefined;

  const horizontalSection = mapImageSpecsSection(
    getMetaobjectFieldReference<ShopifyMetaobjectReference>(
      fields,
      "image_specs_horizontal",
      "Metaobject",
    ),
    "horizontal",
    "Performance",
    `${product.title} horizontal specs image`,
  );

  const verticalSection = mapImageSpecsSection(
    getMetaobjectFieldReference<ShopifyMetaobjectReference>(
      fields,
      "image_specs_vertical",
      "Metaobject",
    ),
    "vertical",
    "Build",
    `${product.title} vertical specs image`,
  );

  return {
    slug: product.slug,
    heroImage,
    textContentBlock: mapTextContentBlockFields(
      getMetaobjectFieldReference<ShopifyMetaobjectReference>(
        fields,
        "chosen_text_contents",
        "Metaobject",
      )?.fields,
    ),
    textContentBlock2: mapTextContentBlockFields(
      getMetaobjectFieldReference<ShopifyMetaobjectReference>(
        fields,
        "chosen_text_contents_2",
        "Metaobject",
      )?.fields,
    ),
    largeImage,
    largeImage2,
    keySpecs,
    highlights,
    imageSpecsSections: [horizontalSection, verticalSection].filter(
      (section): section is ProductImageSpecsSectionData => Boolean(section),
    ),
  };
}

export function getMetaobjectTextValue(
  fields: Array<{
    key: string;
    value: string | null;
  }>,
  key: string,
): string | undefined {
  return fields.find((field) => field.key === key)?.value ?? undefined;
}

export function parseStringList(value: string | undefined): string[] {
  if (!value) {
    return [];
  }

  try {
    const parsed = JSON.parse(value) as unknown;

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter((item): item is string => typeof item === "string");
  } catch {
    return [];
  }
}

function mapMetaobjectSpecsSection(
  fields: ShopifyScalarMetaobjectField[] | undefined,
  title: string,
  limit?: number,
): ProductSpecsSectionData | undefined {
  if (!fields?.length) {
    return undefined;
  }

  const specs = mapProductCardSpecs(fields, limit);

  if (specs.length === 0) {
    return undefined;
  }

  return {
    title,
    specs,
  };
}

function mapImageSpecsSection(
  metaobject: ShopifyMetaobjectReference | undefined,
  layout: ProductImageSpecsSectionData["layout"],
  title: string,
  fallbackAlt: string,
): ProductImageSpecsSectionData | undefined {
  const fields = metaobject?.fields;

  if (!fields?.length) {
    return undefined;
  }

  const image =
    mapMediaImageReference(
      getMetaobjectNestedReference<ShopifyMediaImageReference>(
        fields,
        "large_image",
        "MediaImage",
      ),
      fallbackAlt,
    );

  const specs = mapSpecsFromMetaobjectFields(fields, "specs_titles", "specs_text", 4);

  if (!image || specs.length === 0) {
    return undefined;
  }

  return {
    title,
    image,
    specs,
    layout,
  };
}

function getMetaobjectFieldReference<TReference extends { __typename: string }>(
  fields: ShopifyMetaobjectField[] | ShopifyScalarMetaobjectField[],
  key: string,
  typename: TReference["__typename"],
): TReference | undefined {
  const field = fields.find((item) => item.key === key) as ShopifyMetaobjectField | undefined;
  const reference = field?.reference;

  if (!reference || reference.__typename !== typename) {
    return undefined;
  }

  return reference as unknown as TReference;
}

function getMetaobjectNestedReference<
  TReference extends { __typename: string },
>(
  fields: ShopifyScalarMetaobjectField[],
  key: string,
  typename: TReference["__typename"],
): TReference | undefined {
  const field = fields.find((item) => item.key === key);
  const reference = field?.reference;

  if (!reference || reference.__typename !== typename) {
    return undefined;
  }

  return reference as unknown as TReference;
}

function formatMoney(amount: string): string {
  const numericAmount = Number(amount);

  if (Number.isNaN(numericAmount)) {
    return amount;
  }

  return new Intl.NumberFormat("en-US", {
    style: "decimal",
    maximumFractionDigits: 0,
  }).format(numericAmount);
}

function hasTextContentBlockContent(
  block: ProductsTextContentBlockData | undefined,
): boolean {
  if (!block) {
    return false;
  }

  return Boolean(block.thoughtTitle || block.mainTitle || block.text1 || block.text2);
}
