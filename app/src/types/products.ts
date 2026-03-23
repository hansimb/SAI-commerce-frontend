export interface ProductSpecItem {
  label: string;
  value: string;
}

export interface ProductImageAsset {
  src: string;
  alt: string;
}

export interface ProductCardData {
  slug?: string;
  categoryLabel: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  price: string;
  priceSubtitle: string;
  specs: ProductSpecItem[];
  ctaText: string;
}

export interface ProductListItem extends ProductCardData {
  slug: string;
}

export interface ProductBasicData {
  slug: string;
  categoryLabel: string;
  title: string;
  subtitle: string;
  description: string;
  price: string;
  priceSubtitle: string;
  image: ProductImageAsset;
  cardSpecs: ProductSpecItem[];
}

export interface ProductPageData {
  slug: string;
  largeImageTitle?: string;
  keySpecsTitle: string;
  keySpecs: ProductSpecItem[];
  highlightsTitle: string;
  highlights: string[];
  horizontalSpecsTitle?: string;
  horizontalSpecs: ProductSpecItem[];
  verticalSpecsTitle?: string;
  verticalSpecs: ProductSpecItem[];
}

export interface ProductCustomizationOption {
  label: string;
  active?: boolean;
}

export interface ProductCustomizationOptionGroup {
  title: string;
  options: ProductCustomizationOption[];
}

export interface ProductCustomizationData {
  slug: string;
  title: string;
  image: ProductImageAsset;
  optionGroups: ProductCustomizationOptionGroup[];
}

export interface ProductHeroSectionData {
  title: string;
  price: string;
  image: ProductImageAsset;
  ctaLabel: string;
}

export interface ProductLargeImageSectionData {
  title?: string;
  image: ProductImageAsset;
}

export interface ProductCustomizationCardData {
  title: string;
  image: ProductImageAsset;
  optionGroups: ProductCustomizationOptionGroup[];
}

export interface ProductHorizontalImageSpecsSectionData {
  title?: string;
  image: ProductImageAsset;
  specs: ProductSpecItem[];
}

export interface ProductVerticalImageSpecsSectionData {
  title?: string;
  image: ProductImageAsset;
  specs: ProductSpecItem[];
}

export interface ProductKeySpecsSectionData {
  title: string;
  specs: ProductSpecItem[];
}

export interface ProductHighlightsSectionData {
  title: string;
  items: string[];
}

export interface ProductDetailPageData {
  slug: string;
  hero: ProductHeroSectionData;
  largeImage: ProductLargeImageSectionData;
  keySpecs: ProductKeySpecsSectionData;
  highlights: ProductHighlightsSectionData;
  customization: ProductCustomizationCardData;
  horizontalSpecs: ProductHorizontalImageSpecsSectionData;
  verticalSpecs: ProductVerticalImageSpecsSectionData;
}

export interface ProductsPageIntroData {
  thoughtTitle?: string;
  mainTitle?: string;
  text1?: string;
  text2?: string;
}

export interface ProductsPageData {
  intro: ProductsPageIntroData;
  items: ProductListItem[];
}
