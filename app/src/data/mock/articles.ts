import type { ArticleListItem, ArticlesPageIntroData } from "@/types/articles";

export const articlesPageIntroMockData: ArticlesPageIntroData = {
  thoughtTitle: "Technical Writing",
  mainTitle: "Articles from the workshop",
  text1:
    "A lightweight first pass for the future articles area. The content is still mock-driven, but the structure is ready for later API-backed editorial content.",
};

export const articlesListMockData: ArticleListItem[] = [
  {
    slug: "how-we-voice-our-amplifiers",
    category: "Workshop Notes",
    title: "How We Voice Our Amplifiers",
    excerpt:
      "A short look at the listening tests, component choices, and tradeoffs that shape our final amplifier sound.",
    author: "Marcus Chen",
    publishedAt: "March 2026",
  },
  {
    slug: "why-monitor-control-still-matters",
    category: "Technical Writing",
    title: "Why Monitor Control Still Matters",
    excerpt:
      "Why precise level control and routing remain foundational even in highly digital studio workflows.",
    author: "Elena Brooks",
    publishedAt: "February 2026",
  },
  {
    slug: "serviceability-as-a-design-principle",
    category: "Design",
    title: "Serviceability As A Design Principle",
    excerpt:
      "We treat repairability and long-term ownership as part of the original product design, not as an afterthought.",
    author: "Marcus Chen",
    publishedAt: "January 2026",
  },
];
