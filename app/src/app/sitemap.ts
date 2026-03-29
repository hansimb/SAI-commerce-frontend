import type { MetadataRoute } from "next";
import { getArticlesPageData } from "@/data/articles/articles-page";
import { getProductsPageData } from "@/data/products/products-page";
import { getSiteUrl } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl().toString().replace(/\/$/, "");
  const productsPageData = await getProductsPageData();
  const articlesPageData = await getArticlesPageData();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/`,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/products`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/contact`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  const articleIndexRoute: MetadataRoute.Sitemap =
    articlesPageData.items.length > 0
      ? [
          {
            url: `${siteUrl}/articles`,
            changeFrequency: "weekly",
            priority: 0.8,
          },
        ]
      : [];

  const articleRoutes: MetadataRoute.Sitemap = articlesPageData.items.map((article) => ({
    url: `${siteUrl}/articles/${article.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const productRoutes: MetadataRoute.Sitemap = productsPageData.items
    .filter((product) => product.hasDetails)
    .map((product) => ({
      url: `${siteUrl}/products/${product.slug}`,
      changeFrequency: "weekly",
      priority: 0.8,
    }));

  return [...staticRoutes, ...articleIndexRoute, ...articleRoutes, ...productRoutes];
}
