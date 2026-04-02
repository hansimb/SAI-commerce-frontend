import type { HomeHeroData } from "@/types/home";

export const homeHeroCtaContent: Pick<
  HomeHeroData,
  "primaryCtaText" | "primaryCtaHref" | "secondaryCtaText" | "secondaryCtaHref"
> = {
  primaryCtaText: "View products",
  primaryCtaHref: "/products",
  secondaryCtaText: "Contact",
  secondaryCtaHref: "/contact",
};
