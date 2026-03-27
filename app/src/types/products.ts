export interface ProductSpecItem {
  label: string;
  value: string;
}

export interface ProductImageAsset {
  src: string;
  alt: string;
}

export interface ProductSummary {
  slug: string;
  categoryLabel: string;
  title: string;
  subtitle: string;
  description: string;
  image: ProductImageAsset;
  price: string;
  priceSubtitle: string;
  specs: ProductSpecItem[];
}

export interface ProductsTextContentBlockData {
  thoughtTitle?: string;
  mainTitle?: string;
  text1?: string;
  text2?: string;
}

export interface ProductsPageData {
  textContentBlock: ProductsTextContentBlockData;
  items: ProductSummary[];
}

export interface ProductSpecsSectionData {
  title?: string;
  image?: ProductImageAsset;
  specs: ProductSpecItem[];
}

export interface ProductHighlightsSectionData {
  title: string;
  items: string[];
}

export interface ProductCustomizationOption {
  label: string;
  active?: boolean;
}

export interface ProductCustomizationOptionGroup {
  title: string;
  options: ProductCustomizationOption[];
}

export interface ProductCustomizationSectionData {
  title: string;
  image: ProductImageAsset;
  optionGroups: ProductCustomizationOptionGroup[];
}

export interface ProductDetailContentData {
  slug: string;
  largeImageTitle?: string;
  keySpecs: ProductSpecsSectionData;
  highlights: ProductHighlightsSectionData;
  horizontalSpecs: ProductSpecsSectionData;
  verticalSpecs: ProductSpecsSectionData;
}

export interface ProductDetailPageData {
  product: ProductSummary;
  detail: ProductDetailContentData;
  customization: ProductCustomizationSectionData;
  ctaLabel: string;
}
