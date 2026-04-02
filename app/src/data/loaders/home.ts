import {
  mapMediaImageReference,
  getMetaobjectTextValue,
  parseStringList,
  mapTextContentBlockFields,
} from "@/data/mappers/mappers";
import { shopifyMetaobjects } from "@/data/shopify/metaobjects/metaobjects";
import { storefrontQuery } from "@/data/shopify/storefront-client";
import type {
  ShopifyMediaImageReference,
  ShopifyMetaobjectField,
  ShopifyScalarMetaobjectField,
} from "@/types/shopify";
import { isShopifyDataSource } from "@/data/source";
import type { HomePageData } from "@/types/home";
import type { ContentBoxIcon } from "@/components/page-components/home/content-boxes";
import type { ProcessStepItem } from "@/components/page-components/home/process-steps";
import {
  homeContentBoxesFallbackData,
  homeHeroFallbackData,
  homeLargeImageFallbackData,
  homeProcessStepsFallbackData,
  homeQuoteFallbackData,
  homeTextContentBlock1FallbackData,
  homeTextContentBlock2FallbackData,
} from "../fallback/home-page-fallback";
import {
  HOME_FIELD_KEYS,
  HOME_PAGE_KEYS,
} from "../shopify/metaobjects/home-metaobjects";

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
  return getFallbackHomePageData();
}

function getFallbackHomePageData(): HomePageData {
  return {
    hero: homeHeroFallbackData,
    textContentBlock1: homeTextContentBlock1FallbackData,
    contentBoxes: homeContentBoxesFallbackData,
    largeImage: homeLargeImageFallbackData,
    textContentBlock2: homeTextContentBlock2FallbackData,
    processSteps: homeProcessStepsFallbackData,
    quote: homeQuoteFallbackData,
  };
}

async function getShopifyHomePageData(): Promise<HomePageData> {
  const fallback = getFallbackHomePageData();
  const data = await storefrontQuery<ShopifyHomePageQueryData>(homePageQuery);
  const homePage = data.metaobjects.nodes[0];

  if (!homePage) return fallback;

  const fields = homePage.fields;

  return {
    hero: {
      ...fallback.hero,
      backgroundImage:
        mapMediaImageReference(
          getMediaImageReference(fields, HOME_PAGE_KEYS.HERO_IMAGE),
          "Home hero image",
        )?.src || fallback.hero.backgroundImage,
    },
    textContentBlock1:
      mapTextContentBlockFields(
        getMetaobjectFields(fields, HOME_PAGE_KEYS.TEXT_CONTENT_1),
        fallback.textContentBlock1,
      ) ?? fallback.textContentBlock1,
    contentBoxes: mapContentBoxes(
      getMetaobjectFields(fields, HOME_PAGE_KEYS.CONTENT_BOXES),
      fallback.contentBoxes,
    ),
    largeImage:
      mapMediaImageReference(
        getMediaImageReference(fields, HOME_PAGE_KEYS.LARGE_IMAGE),
        "Home large image",
      ) || fallback.largeImage,
    textContentBlock2:
      mapTextContentBlockFields(
        getMetaobjectFields(fields, HOME_PAGE_KEYS.TEXT_CONTENT_2),
        fallback.textContentBlock2,
      ) ?? fallback.textContentBlock2,
    processSteps: mapProcessSteps(
      getMetaobjectFields(fields, HOME_PAGE_KEYS.PROCESS_STEPS),
      fallback.processSteps,
    ),
    quote: mapQuote(
      getMetaobjectFields(fields, HOME_PAGE_KEYS.QUOTE),
      fallback.quote,
    ),
  };
}

// --- HELPERS ---

function getFieldReference(
  fields: ShopifyMetaobjectField[],
  keys: readonly string[],
) {
  return fields.find((field) => keys.includes(field.key))?.reference;
}

function getMetaobjectFields(
  fields: ShopifyMetaobjectField[],
  keys: readonly string[],
) {
  const reference = getFieldReference(fields, keys);
  if (!reference || reference.__typename !== "Metaobject") return undefined;
  return reference.fields;
}

function getMediaImageReference(
  fields: ShopifyMetaobjectField[],
  keys: readonly string[],
): ShopifyMediaImageReference | undefined {
  const reference = getFieldReference(fields, keys);
  if (!reference || reference.__typename !== "MediaImage") return undefined;
  return reference;
}

function mapContentBoxes(
  fields: ShopifyScalarMetaobjectField[] | undefined,
  fallback: HomePageData["contentBoxes"],
): HomePageData["contentBoxes"] {
  if (!fields?.length) return fallback;

  const titles = parseStringList(
    getMetaobjectTextValue(fields, HOME_FIELD_KEYS.TITLES),
  );
  const texts = parseStringList(
    getMetaobjectTextValue(fields, HOME_FIELD_KEYS.TEXTS),
  );
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
  if (!fields?.length) return fallback;

  const titles = parseStringList(
    getMetaobjectTextValue(fields, HOME_FIELD_KEYS.TITLE_LIST),
  );
  const texts = parseStringList(
    getMetaobjectTextValue(fields, HOME_FIELD_KEYS.TEXT_LIST),
  );
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
  if (!fields?.length) return fallback;

  const quote = getMetaobjectTextValue(fields, HOME_FIELD_KEYS.QUOTE_BODY);
  const author = getMetaobjectTextValue(fields, HOME_FIELD_KEYS.QUOTE_AUTHOR);
  const subtitle = getMetaobjectTextValue(
    fields,
    HOME_FIELD_KEYS.QUOTE_AUTHOR_TITLE,
  );

  if (!quote || !author) return fallback;

  return {
    quote,
    author,
    subtitle: subtitle || undefined,
  };
}
