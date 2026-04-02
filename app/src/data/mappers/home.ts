import type { ContentBoxIcon } from "@/components/page-components/home/content-boxes";
import type { ProcessStepItem } from "@/components/page-components/home/process-steps";
import type { HomePageData } from "@/types/home";
import type { ShopifyScalarMetaobjectField } from "@/types/shopify";
import { homeComponentFieldKeys } from "@/data/shopify/metaobjects/components";
import { getMetaobjectTextValue, parseStringList } from "./shopify";

export function mapContentBoxes(
  fields: ShopifyScalarMetaobjectField[] | undefined,
  fallback: HomePageData["contentBoxes"],
): HomePageData["contentBoxes"] {
  if (!fields?.length) {
    return fallback;
  }

  const titles = parseStringList(
    getMetaobjectTextValue(fields, homeComponentFieldKeys.titles),
  );
  const texts = parseStringList(
    getMetaobjectTextValue(fields, homeComponentFieldKeys.texts),
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

export function mapProcessSteps(
  fields: ShopifyScalarMetaobjectField[] | undefined,
  fallback: HomePageData["processSteps"],
): HomePageData["processSteps"] {
  if (!fields?.length) {
    return fallback;
  }

  const titles = parseStringList(
    getMetaobjectTextValue(fields, homeComponentFieldKeys.titleList),
  );
  const texts = parseStringList(
    getMetaobjectTextValue(fields, homeComponentFieldKeys.textList),
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

export function mapQuote(
  fields: ShopifyScalarMetaobjectField[] | undefined,
  fallback: HomePageData["quote"],
): HomePageData["quote"] {
  if (!fields?.length) {
    return fallback;
  }

  const quote = getMetaobjectTextValue(fields, homeComponentFieldKeys.quoteBody);
  const author = getMetaobjectTextValue(
    fields,
    homeComponentFieldKeys.quoteAuthor,
  );
  const subtitle = getMetaobjectTextValue(
    fields,
    homeComponentFieldKeys.quoteAuthorTitle,
  );

  if (!quote || !author) {
    return fallback;
  }

  return {
    quote,
    author,
    subtitle: subtitle || undefined,
  };
}
