import { productBasicDataBySlug, productsPageIntroMockData } from "@/data/mock/products/basic";
import { productCustomizationDataBySlug } from "@/data/mock/products/customization";
import { productPageDataBySlug } from "@/data/mock/products/page";
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
  return {
    intro: productsPageIntroMockData,
    items: Object.keys(productBasicDataBySlug)
      .map(toListItem)
      .filter((item): item is ProductListItem => Boolean(item)),
  };
}

export function getProductPageData(
  slug: string,
): ProductDetailPageData | undefined {
  const basic = productBasicDataBySlug[slug];
  const page = productPageDataBySlug[slug];
  const customization = productCustomizationDataBySlug[slug];

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
