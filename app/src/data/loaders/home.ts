import {
  homeContentBoxesMockData,
  homeHeroMockData,
  homeIntroMockData,
  homeLargeImageMockData,
  homeProcessStepsMockData,
  homeQuoteMockData,
} from "@/data/mock/home";
import {
  mapMediaImageReference,
  getMetaobjectTextValue,
  parseStringList,
  mapTextContentBlockFields,
} from "@/data/products/mappers";
import { shopifyMetaobjects } from "@/data/shopify/metaobjects";
import { storefrontQuery } from "@/data/shopify/storefront-client";
import type {
  ShopifyMediaImageReference,
  ShopifyMetaobjectField,
  ShopifyScalarMetaobjectField,
} from "@/data/shopify/types";
import { isShopifyDataSource } from "@/data/source";
import type { HomePageData } from "@/types/home";
import type { ContentBoxIcon } from "@/components/page-components/content-boxes";
import type { ProcessStepItem } from "@/components/page-components/process-steps";

interface ShopifyHomePageQueryData {
  metaobjects: {
    nodes: Array<{
      handle: string;
      fields: ShopifyMetaobjectField[];
    }>;
  };
}

const homePageQuery = `
  query HomePage {
    metaobjects(type: "${shopifyMetaobjects.homePage.type}", first: 1) {
      nodes {
        handle
        fields {
          key
          value
          type
          reference {
            __typename
            ... on Metaobject {
              handle
              type
              fields {
                key
                value
                type
                reference {
                  __typename
                  ... on MediaImage {
                    image {
                      url
                      altText
                    }
                  }
                }
              }
            }
            ... on MediaImage {
              image {
                url
                altText
              }
            }
          }
        }
      }
    }
  }
`;

export async function getHomePageData(): Promise<HomePageData> {
  if (isShopifyDataSource()) {
    return getShopifyHomePageData();
  }

  return getMockHomePageData();
}

function getMockHomePageData(): HomePageData {
  return {
    hero: homeHeroMockData,
    textContentBlock1: homeIntroMockData,
    contentBoxes: homeContentBoxesMockData,
    largeImage: homeLargeImageMockData,
    textContentBlock2: homeIntroMockData,
    processSteps: homeProcessStepsMockData,
    quote: homeQuoteMockData,
  };
}

async function getShopifyHomePageData(): Promise<HomePageData> {
  const fallback = getMockHomePageData();
  const data = await storefrontQuery<ShopifyHomePageQueryData>(homePageQuery);

  const homePage = data.metaobjects.nodes[0];

  if (!homePage) {
    return fallback;
  }

  const fields = homePage.fields;

  return {
    hero: {
      ...fallback.hero,
      backgroundImage:
        mapMediaImageReference(
          getMediaImageReference(fields, ["hero_image", "hero-image"]),
          "Home hero image",
        )?.src || fallback.hero.backgroundImage,
    },
    textContentBlock1: mapTextContentBlockFields(
      getMetaobjectFields(fields, ["text_content_block_1", "text-content-block-1"]),
      fallback.textContentBlock1,
    ),
    contentBoxes: mapContentBoxes(
      getMetaobjectFields(fields, ["content_boxes", "content-boxes"]),
      fallback.contentBoxes,
    ),
    largeImage:
      mapMediaImageReference(
        getMediaImageReference(fields, ["large_image", "large-image"]),
        "Home large image",
      ) || fallback.largeImage,
    textContentBlock2: mapTextContentBlockFields(
      getMetaobjectFields(fields, ["text_content_block_2", "text-content-block-2"]),
      fallback.textContentBlock2,
    ),
    processSteps: mapProcessSteps(
      getMetaobjectFields(fields, ["process_steps", "process-steps"]),
      fallback.processSteps,
    ),
    quote: mapQuote(
      getMetaobjectFields(fields, ["quote"]),
      fallback.quote,
    ),
  };
}

function getFieldReference(
  fields: ShopifyMetaobjectField[],
  keys: string[],
) {
  return fields.find((field) => keys.includes(field.key))?.reference;
}

function getMetaobjectFields(
  fields: ShopifyMetaobjectField[],
  keys: string[],
) {
  const reference = getFieldReference(fields, keys);

  if (!reference || reference.__typename !== "Metaobject") {
    return undefined;
  }

  return reference.fields;
}

function getMediaImageReference(
  fields: ShopifyMetaobjectField[],
  keys: string[],
): ShopifyMediaImageReference | undefined {
  const reference = getFieldReference(fields, keys);

  if (!reference || reference.__typename !== "MediaImage") {
    return undefined;
  }

  return reference;
}

function mapContentBoxes(
  fields: ShopifyScalarMetaobjectField[] | undefined,
  fallback: HomePageData["contentBoxes"],
): HomePageData["contentBoxes"] {
  if (!fields?.length) {
    return fallback;
  }

  const titles = parseStringList(getMetaobjectTextValue(fields, "titles"));
  const texts = parseStringList(getMetaobjectTextValue(fields, "texts"));
  const icons: ContentBoxIcon[] = ["tool", "award", "users", "heart"];

  const items = titles
    .map((title, index) => ({
      icon: icons[index] || "tool",
      title,
      description: texts[index] || "",
    }))
    .filter((item) => item.title && item.description);

  return items.length > 0 ? items : fallback;
}

function mapProcessSteps(
  fields: ShopifyScalarMetaobjectField[] | undefined,
  fallback: HomePageData["processSteps"],
): HomePageData["processSteps"] {
  if (!fields?.length) {
    return fallback;
  }

  const titles = parseStringList(getMetaobjectTextValue(fields, "title"));
  const texts = parseStringList(getMetaobjectTextValue(fields, "text"));
  const icons: ProcessStepItem["icon"][] = ["zap", "tool", "shield"];

  const items = titles
    .map((title, index) => ({
      number: String(index + 1).padStart(2, "0"),
      icon: icons[index] || "tool",
      title,
      description: texts[index] || "",
    }))
    .filter((item) => item.title && item.description);

  return items.length > 0 ? items : fallback;
}

function mapQuote(
  fields: ShopifyScalarMetaobjectField[] | undefined,
  fallback: HomePageData["quote"],
): HomePageData["quote"] {
  if (!fields?.length) {
    return fallback;
  }

  const quote = getMetaobjectTextValue(fields, "quote");
  const author = getMetaobjectTextValue(fields, "author");
  const subtitle = getMetaobjectTextValue(fields, "author_title");

  if (!quote || !author) {
    return fallback;
  }

  return {
    quote,
    author,
    subtitle: subtitle || undefined,
  };
}
