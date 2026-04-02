// data/shopify/home-metaobjects.ts

export const HOME_PAGE_KEYS = {
  HERO_IMAGE: ["hero_image", "hero-image"],
  TEXT_CONTENT_1: ["text_content_block_1", "text-content-block-1"],
  CONTENT_BOXES: ["content_boxes", "content-boxes"],
  LARGE_IMAGE: ["large_image", "large-image"],
  TEXT_CONTENT_2: ["text_content_block_2", "text-content-block-2"],
  PROCESS_STEPS: ["process_steps", "process-steps"],
  QUOTE: ["quote"],
} as const;

export const HOME_FIELD_KEYS = {
  // Content Boxes & Process Steps (Lists)
  TITLES: "titles",
  TEXTS: "texts",
  TITLE_LIST: "title", // Joskus yksikössä Shopifyn puolella
  TEXT_LIST: "text",

  // Quote
  QUOTE_BODY: "quote",
  QUOTE_AUTHOR: "author",
  QUOTE_AUTHOR_TITLE: "author_title",
} as const;
