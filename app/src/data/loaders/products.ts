import { productBasicDataBySlug } from "@/data/mock/products/product-basic";
import { productCustomizationCardDataBySlug } from "@/data/mock/products/customization-card";
import { productPageDataBySlug } from "@/data/mock/products/product-page";
import { productsIntroTextContentBlock } from "@/data/mock/products/text-content-block";
import { isShopifyDataSource } from "@/data/source";
import type {
  ProductDetailPageData,
  ProductListItem,
  ProductsPageData,
} from "@/types/products";

const ctaLabel = "Add to cart";
const ctaText = "View Details";

function toListItem(slug: string): ProductListItem | undefined {
  const basic = productBasicDataBySlug[slug];

  if (!basic) {
    return undefined;
  }

  return {
    slug: basic.slug,
    categoryLabel: basic.categoryLabel,
    title: basic.title,
    subtitle: basic.subtitle,
    description: basic.description,
    imageUrl: basic.image.src,
    price: basic.price,
    priceSubtitle: basic.priceSubtitle,
    specs: basic.cardSpecs,
    ctaText,
  };
}

export function getProductsPageData(): ProductsPageData {
  if (isShopifyDataSource()) {
    return getShopifyProductsPageData();
  }

  return getMockProductsPageData();
}

function getMockProductsPageData(): ProductsPageData {
  return {
    textContentBlock: productsIntroTextContentBlock,
    items: Object.keys(productBasicDataBySlug)
      .map(toListItem)
      .filter((item): item is ProductListItem => Boolean(item)),
  };
}

export function getProductPageData(
  slug: string,
): ProductDetailPageData | undefined {
  if (isShopifyDataSource()) {
    return getShopifyProductPageData(slug);
  }

  return getMockProductPageData(slug);
}

function getMockProductPageData(
  slug: string,
): ProductDetailPageData | undefined {
  const basic = productBasicDataBySlug[slug];
  const page = productPageDataBySlug[slug];
  const customization = productCustomizationCardDataBySlug[slug];

  if (!basic || !page || !customization) {
    return undefined;
  }

  return {
    slug,
    hero: {
      title: basic.title,
      price: basic.price,
      image: basic.image,
      ctaLabel,
    },
    largeImage: {
      title: page.largeImageTitle,
      image: basic.image,
    },
    keySpecs: {
      title: page.keySpecsTitle,
      specs: page.keySpecs,
    },
    highlights: {
      title: page.highlightsTitle,
      items: page.highlights,
    },
    customization: {
      title: customization.title,
      image: customization.image,
      optionGroups: customization.optionGroups,
    },
    horizontalSpecs: {
      title: page.horizontalSpecsTitle,
      image: basic.image,
      specs: page.horizontalSpecs,
    },
    verticalSpecs: {
      title: page.verticalSpecsTitle,
      image: basic.image,
      specs: page.verticalSpecs,
    },
  };
}

function getShopifyProductsPageData(): ProductsPageData {
  return getMockProductsPageData();
}

function getShopifyProductPageData(
  slug: string,
): ProductDetailPageData | undefined {
  return getMockProductPageData(slug);
}
