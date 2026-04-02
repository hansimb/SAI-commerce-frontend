import { articlesPageIntroContent } from "@/data/contents/articles-page-intro";
import { mapStorefrontArticleToListItem } from "@/data/mappers";
import { articlesListMockData } from "@/data/mock/articles-page";
import { storefrontQuery } from "@/data/shopify/storefront-client";
import { isShopifyDataSource } from "@/data/source";
import type { ArticlesPageData } from "@/types/articles";

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
    intro: articlesPageIntroContent,
    items: articlesListMockData,
  };
}

async function getShopifyArticlesPageData(): Promise<ArticlesPageData> {
  const data =
    await storefrontQuery<ShopifyArticlesQueryData>(articlesPageQuery);

  return {
    intro: articlesPageIntroContent,
    items: data.articles.nodes.map(mapStorefrontArticleToListItem),
  };
}
