export interface ProductCardData {
  slug?: string;
  categoryLabel: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  price: string;
  priceSubtitle: string;
  specs: { label: string; value: string }[];
  ctaText: string;
}

export interface ProductListItem extends ProductCardData {
  slug: string;
}

export interface ProductDetailPageData {
  slug: string;
  categoryLabel: string;
  title: string;
  subtitle: string;
  intro: string;
  description: string[];
  imageUrl: string;
  gallery: { src: string; alt: string }[];
  price: string;
  priceSubtitle: string;
  specs: { label: string; value: string }[];
  highlights: string[];
  addToCartLabel: string;
  customizeLabel: string;
}

export interface ProductCustomizationPageData {
  slug: string;
  title: string;
  intro: string;
  optionGroups: {
    title: string;
    description: string;
    options: string[];
  }[];
  note: string;
  ctaLabel: string;
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
