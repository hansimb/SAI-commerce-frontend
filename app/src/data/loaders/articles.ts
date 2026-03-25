import {
  articlesListMockData,
  articlesPageIntroMockData,
} from "@/data/mock/articles";
import type { ArticlesPageData } from "@/types/articles";

export function hasArticlesContent(): boolean {
  return articlesListMockData.length > 0;
}

export function getArticlesPageData(): ArticlesPageData {
  return {
    intro: articlesPageIntroMockData,
    items: articlesListMockData,
  };
}
