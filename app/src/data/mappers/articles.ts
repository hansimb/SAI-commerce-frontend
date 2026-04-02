import type { ArticleDetailPageData, ArticleListItem } from "@/types/articles";

interface ShopifyArticleListNode {
  handle: string;
  title: string;
  excerpt: string | null;
  contentHtml: string | null;
  publishedAt: string | null;
  blog: {
    title: string;
  } | null;
  authorV2: {
    name: string;
  } | null;
}

interface ShopifyArticleDetailNode extends ShopifyArticleListNode {
  image: {
    url: string;
    altText: string | null;
  } | null;
}

export function mapStorefrontArticleToListItem(
  article: ShopifyArticleListNode,
): ArticleListItem {
  return {
    slug: article.handle,
    category: article.blog?.title || "Article",
    title: article.title,
    excerpt: article.excerpt || createArticleExcerpt(article.contentHtml),
    author: article.authorV2?.name,
    publishedAt: formatArticlePublishedAt(article.publishedAt),
  };
}

export function mapStorefrontArticleToDetailPage(
  article: ShopifyArticleDetailNode,
): ArticleDetailPageData {
  return {
    slug: article.handle,
    category: article.blog?.title || "Article",
    title: article.title,
    excerpt: article.excerpt || undefined,
    author: article.authorV2?.name || undefined,
    publishedAt: formatArticlePublishedAt(article.publishedAt),
    image: article.image
      ? {
          src: article.image.url,
          alt: article.image.altText || article.title,
        }
      : undefined,
    contentHtml: article.contentHtml || "",
  };
}

function formatArticlePublishedAt(value: string | null): string | undefined {
  if (!value) {
    return undefined;
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(date);
}

function createArticleExcerpt(contentHtml: string | null): string {
  if (!contentHtml) {
    return "";
  }

  const plainText = contentHtml
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!plainText) {
    return "";
  }

  if (plainText.length <= 180) {
    return plainText;
  }

  return `${plainText.slice(0, 177).trimEnd()}...`;
}
