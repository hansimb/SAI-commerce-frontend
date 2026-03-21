export interface ArticleListItem {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  author?: string;
  publishedAt?: string;
}

export interface ArticlesPageIntroData {
  thoughtTitle?: string;
  mainTitle?: string;
  text1?: string;
  text2?: string;
}

export interface ArticlesPageData {
  intro: ArticlesPageIntroData;
  items: ArticleListItem[];
}
