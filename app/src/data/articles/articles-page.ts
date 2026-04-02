import {
  articlesListMockData,
  articlesPageIntroMockData,
} from "@/data/mock/articles-page";
import { storefrontQuery } from "@/data/shopify/storefront-client";
import { isShopifyDataSource } from "@/data/source";
import type { ArticleListItem, ArticlesPageData } from "@/types/articles";

interface ShopifyArticlesQueryData {
  articles: {
    nodes: Array<{
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
    }>;
  };
}

const articlesPageQuery = `
  query ArticlesPage {
    articles(first: 20, sortKey: PUBLISHED_AT, reverse: true) {
      nodes {
        handle
        title
        excerpt
        contentHtml
        publishedAt
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

export async function getArticlesPageData(): Promise<ArticlesPageData> {
  if (isShopifyDataSource()) {
    return getShopifyArticlesPageData();
  }

  return getMockArticlesPageData();
}

function getMockArticlesPageData(): ArticlesPageData {
  return {
    intro: articlesPageIntroMockData,
    items: articlesListMockData,
  };
}

async function getShopifyArticlesPageData(): Promise<ArticlesPageData> {
  const data =
    await storefrontQuery<ShopifyArticlesQueryData>(articlesPageQuery);

  return {
    intro: articlesPageIntroMockData,
    items: data.articles.nodes.map(mapStorefrontArticleToListItem),
  };
}

function mapStorefrontArticleToListItem(
  article: ShopifyArticlesQueryData["articles"]["nodes"][number],
): ArticleListItem {
  return {
    slug: article.handle,
    category: article.blog?.title || "Article",
    title: article.title,
    excerpt: article.excerpt || createExcerpt(article.contentHtml),
    author: article.authorV2?.name,
    publishedAt: formatPublishedAt(article.publishedAt),
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

function createExcerpt(contentHtml: string | null): string {
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
