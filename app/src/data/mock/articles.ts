import type {
  ArticleDetailPageData,
  ArticleListItem,
  ArticlesPageIntroData,
} from "@/types/articles";

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

export const articleDetailDataBySlug: Record<string, ArticleDetailPageData> = {
  "how-we-voice-our-amplifiers": {
    slug: "how-we-voice-our-amplifiers",
    category: "Workshop Notes",
    title: "How We Voice Our Amplifiers",
    excerpt:
      "A short look at the listening tests, component choices, and tradeoffs that shape our final amplifier sound.",
    author: "Marcus Chen",
    publishedAt: "March 2026",
    contentHtml: `
      <p>Voicing starts with listening, not with a spreadsheet. We compare circuits, transformers, and gain structures in small steps until the amplifier starts to feel stable, expressive, and easy to place in a real mix.</p>
      <p>That usually means accepting tradeoffs. A tighter low end may reduce bloom. Extra harmonic density may reduce transient clarity. The final decision is rarely about one measurement alone, but about how the whole instrument responds under the hands.</p>
      <p>Our goal is not maximum character at all costs. It is a controlled musical response that still works day after day in practical studio and stage use.</p>
    `,
  },
  "why-monitor-control-still-matters": {
    slug: "why-monitor-control-still-matters",
    category: "Technical Writing",
    title: "Why Monitor Control Still Matters",
    excerpt:
      "Why precise level control and routing remain foundational even in highly digital studio workflows.",
    author: "Elena Brooks",
    publishedAt: "February 2026",
    contentHtml: `
      <p>Modern production chains are often fully digital, but monitor control still shapes decision-making at the most critical point: what the engineer actually hears while working.</p>
      <p>Reliable level matching, repeatable routing, and immediate source comparison reduce guesswork. Without that stability, small monitoring errors can become large production choices that are hard to undo later.</p>
      <p>Good monitor control is not nostalgia. It is infrastructure for making cleaner, faster, and more confident decisions.</p>
    `,
  },
  "serviceability-as-a-design-principle": {
    slug: "serviceability-as-a-design-principle",
    category: "Design",
    title: "Serviceability As A Design Principle",
    excerpt:
      "We treat repairability and long-term ownership as part of the original product design, not as an afterthought.",
    author: "Marcus Chen",
    publishedAt: "January 2026",
    contentHtml: `
      <p>Serviceability begins long before a unit ever needs repair. It starts in layout decisions, access points, connector choices, and in how clearly a technician can understand the signal path later.</p>
      <p>That thinking improves ownership as much as it improves maintenance. Products that can be opened, diagnosed, and restored with confidence tend to stay in use longer and create less friction over their lifetime.</p>
      <p>For us, durability is not only about rugged parts. It is also about designing equipment that remains understandable years after it leaves the workshop.</p>
    `,
  },
};
