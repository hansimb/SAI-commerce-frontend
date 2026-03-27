import { productBasicDataBySlug } from "@/data/mock/products/product-basic";
import { productCustomizationCardDataBySlug } from "@/data/mock/products/customization-card";
import { productPageDataBySlug } from "@/data/mock/products/product-page";
import { isShopifyDataSource } from "@/data/source";
import type { ProductDetailPageData } from "@/types/products";

const ctaLabel = "Add to cart";

export function getProductDetailPageData(
  slug: string,
): ProductDetailPageData | undefined {
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

  if (!product || !detail || !customization) {
    return undefined;
  }

  return {
    product,
    detail: {
      ...detail,
      horizontalSpecs: {
        ...detail.horizontalSpecs,
        image: product.image,
      },
      verticalSpecs: {
        ...detail.verticalSpecs,
        image: product.image,
      },
    },
    customization,
    ctaLabel,
  };
}

function getShopifyProductDetailPageData(
  slug: string,
): ProductDetailPageData | undefined {
  return getMockProductDetailPageData(slug);
}
