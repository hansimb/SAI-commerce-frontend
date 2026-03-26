import type {
  ProductBasicData,
  ProductListItem,
  ProductsTextContentBlockData,
} from "@/types/products";
import type {
  ShopifyMetaobjectField,
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
  product: ProductBasicData,
): ProductListItem {
  return {
    slug: product.slug,
    categoryLabel: product.categoryLabel,
    title: product.title,
    subtitle: product.subtitle,
    description: product.description,
    imageUrl: product.image.src,
    price: product.price,
    priceSubtitle: product.priceSubtitle,
    specs: product.cardSpecs,
    ctaText: "View Details",
  };
}

export function mapStorefrontProductToListItem(
  product: ShopifyProductNode,
): ProductListItem {
  return {
    slug: product.handle,
    categoryLabel: product.productType || "",
    title: product.title,
    subtitle: product.subtitleMetafield?.value || "",
    description: product.description || "",
    imageUrl: product.featuredImage?.url || "/globe.svg",
    price: formatMoney(product.priceRange.minVariantPrice.amount),
    priceSubtitle: product.priceRange.minVariantPrice.currencyCode,
    specs: mapProductCardSpecs(product.cardSpecsMetafield?.reference?.fields),
    ctaText: "View Details",
  };
}

export function mapTextContentBlockReference(
  field: ShopifyMetaobjectField | undefined,
  fallback: ProductsTextContentBlockData = fallbackProductsTextContentBlock,
): ProductsTextContentBlockData {
  if (!field?.reference || field.reference.__typename !== "Metaobject") {
    return fallback;
  }

  const fields = field.reference.fields;

  return {
    thoughtTitle:
      getMetaobjectTextValue(fields, "thought_title") ??
      getMetaobjectTextValue(fields, "tought_title") ??
      fallback.thoughtTitle,
    mainTitle:
      getMetaobjectTextValue(fields, "main_title") ?? fallback.mainTitle,
    text1: getMetaobjectTextValue(fields, "text1") ?? fallback.text1,
    text2: getMetaobjectTextValue(fields, "text2") ?? fallback.text2,
  };
}

function getMetaobjectTextValue(
  fields: Array<{
    key: string;
    value: string | null;
  }>,
  key: string,
): string | undefined {
  return fields.find((field) => field.key === key)?.value ?? undefined;
}

function mapProductCardSpecs(
  fields: ShopifyScalarMetaobjectField[] | undefined,
) {
  if (!fields?.length) {
    return [];
  }

  const descriptions = parseStringList(
    getMetaobjectTextValue(fields, "spec_description"),
  );
  const details = parseStringList(getMetaobjectTextValue(fields, "spec_detail"));

  return descriptions
    .map((label, index) => ({
      label,
      value: details[index] || "",
    }))
    .filter((spec) => spec.label && spec.value);
}

function parseStringList(value: string | undefined): string[] {
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
