import { articleDetailDataBySlug } from "@/data/mock/articles-page";
import { mapStorefrontArticleToDetailPage } from "@/data/mappers";
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
  const data =
    await storefrontQuery<ShopifyArticleDetailQueryData>(articleDetailQuery);

  const article = data.articles.nodes.find((item) => item.handle === slug);

  if (!article) {
    return undefined;
  }

  return mapStorefrontArticleToDetailPage(article);
}
