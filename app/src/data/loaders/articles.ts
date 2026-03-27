import { isShopifyDataSource } from "@/data/source";
import { storefrontQuery } from "@/data/shopify/storefront-client";
import { articlesListMockData } from "@/data/mock/articles";

interface ShopifyArticlesPresenceQueryData {
  articles: {
    nodes: Array<{
      handle: string;
    }>;
  };
}

const articlesPresenceQuery = `
  query ArticlesPresence {
    articles(first: 1, sortKey: PUBLISHED_AT, reverse: true) {
      nodes {
        handle
      }
    }
  }
`;

export async function hasArticlesContent(): Promise<boolean> {
  if (isShopifyDataSource()) {
    return hasArticlesShopifyContent();
  }

  return hasArticlesMockContent();
}

function hasArticlesMockContent(): boolean {
  return articlesListMockData.length > 0;
}

async function hasArticlesShopifyContent(): Promise<boolean> {
  const data =
    await storefrontQuery<ShopifyArticlesPresenceQueryData>(articlesPresenceQuery);

  return data.articles.nodes.length > 0;
}
