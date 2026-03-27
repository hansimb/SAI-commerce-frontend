import { articleDetailDataBySlug } from "@/data/mock/articles";
import { storefrontQuery } from "@/data/shopify/storefront-client";
import { isShopifyDataSource } from "@/data/source";
import type { ArticleDetailPageData } from "@/types/articles";

interface ShopifyArticleDetailQueryData {
  articles: {
    nodes: Array<{
      handle: string;
      title: string;
      excerpt: string | null;
      contentHtml: string | null;
      publishedAt: string | null;
      image: {
        url: string;
        altText: string | null;
      } | null;
      blog: {
        title: string;
      } | null;
      authorV2: {
        name: string;
      } | null;
    }>;
  };
}

const articleDetailQuery = `
  query ArticleDetailPage {
    articles(first: 50, sortKey: PUBLISHED_AT, reverse: true) {
      nodes {
        handle
        title
        excerpt
        contentHtml
        publishedAt
        image {
          url
          altText
        }
        blog {
          title
        }
        authorV2 {
          name
        }
      }
    }
  }
`;

export async function getArticleDetailPageData(
  slug: string,
): Promise<ArticleDetailPageData | undefined> {
  if (isShopifyDataSource()) {
    return getShopifyArticleDetailPageData(slug);
  }

  return getMockArticleDetailPageData(slug);
}

function getMockArticleDetailPageData(
  slug: string,
): ArticleDetailPageData | undefined {
  return articleDetailDataBySlug[slug];
}

async function getShopifyArticleDetailPageData(
  slug: string,
): Promise<ArticleDetailPageData | undefined> {
  const data = await storefrontQuery<ShopifyArticleDetailQueryData>(
    articleDetailQuery,
  );

  const article = data.articles.nodes.find((item) => item.handle === slug);

  if (!article) {
    return undefined;
  }

  return {
    slug: article.handle,
    category: article.blog?.title || "Article",
    title: article.title,
    excerpt: article.excerpt || undefined,
    author: article.authorV2?.name || undefined,
    publishedAt: formatPublishedAt(article.publishedAt),
    image: article.image
      ? {
          src: article.image.url,
          alt: article.image.altText || article.title,
        }
      : undefined,
    contentHtml: article.contentHtml || "",
  };
}

function formatPublishedAt(value: string | null): string | undefined {
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
