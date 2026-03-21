import {
  productDetailMockDataBySlug,
  productCustomizationMockDataBySlug,
  productsListMockData,
  productsPageIntroMockData,
} from "@/data/mock/products";
import type {
  ProductCustomizationPageData,
  ProductDetailPageData,
  ProductsPageData,
} from "@/types/products";

export function getProductsPageData(): ProductsPageData {
  return {
    intro: productsPageIntroMockData,
    items: productsListMockData,
  };
}

export function getProductPageData(
  slug: string,
): ProductDetailPageData | undefined {
  return productDetailMockDataBySlug[slug];
}

export function getProductCustomizationPageData(
  slug: string,
): ProductCustomizationPageData | undefined {
  return productCustomizationMockDataBySlug[slug];
}
