import {
  articlesListMockData,
  articlesPageIntroMockData,
} from "@/data/mock/articles";
import { isShopifyDataSource } from "@/data/source";
import type { ArticlesPageData } from "@/types/articles";

export function hasArticlesContent(): boolean {
  if (isShopifyDataSource()) {
    return hasArticlesShopifyContent();
  }

  return hasArticlesMockContent();
}

function hasArticlesMockContent(): boolean {
  return articlesListMockData.length > 0;
}

export function getArticlesPageData(): ArticlesPageData {
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

function hasArticlesShopifyContent(): boolean {
  return hasArticlesMockContent();
}

function getShopifyArticlesPageData(): ArticlesPageData {
  return getMockArticlesPageData();
}
