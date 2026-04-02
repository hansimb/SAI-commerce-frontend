import type { ContentBoxItem } from "@/components/page-components/home/content-boxes";
import type { ProcessStepItem } from "@/components/page-components/home/process-steps";
import type { QuoteBlockData } from "@/components/page-components/home/quote-block";
import type { HomeHeroData } from "@/types/home";
import type {
  ProductsTextContentBlockData,
  ProductImageAsset,
} from "@/types/products";

// hero: HomeHeroData
export const homeHeroFallbackData: HomeHeroData = {
  backgroundImage: "",
  title: "",
  subtitle: "",
  primaryCtaText: "",
  primaryCtaHref: "",
  secondaryCtaText: "",
  secondaryCtaHref: "",
};

// textContentBlock1: ProductsTextContentBlockData
export const homeTextContentBlock1FallbackData: ProductsTextContentBlockData = {
  thoughtTitle: "",
  mainTitle: "",
  text1: "",
  text2: "",
};

// contentBoxes: ContentBoxItem[]
export const homeContentBoxesFallbackData: ContentBoxItem[] = [];

// largeImage?: ProductImageAsset
export const homeLargeImageFallbackData: ProductImageAsset = {
  src: "",
  alt: "",
};

// textContentBlock2: ProductsTextContentBlockData
export const homeTextContentBlock2FallbackData: ProductsTextContentBlockData = {
  thoughtTitle: "",
  mainTitle: "",
  text1: "",
  text2: "",
};

// processSteps: ProcessStepItem[]
export const homeProcessStepsFallbackData: ProcessStepItem[] = [];

// quote: QuoteBlockData
export const homeQuoteFallbackData: QuoteBlockData = {
  quote: "",
  author: "",
  subtitle: "",
};
