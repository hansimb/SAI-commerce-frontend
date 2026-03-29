import type { MetadataRoute } from "next";
import { getSiteUrl, isProductionSite } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl().toString().replace(/\/$/, "");
  const isProduction = isProductionSite();

  return {
    rules: {
      userAgent: "*",
      allow: isProduction ? "/" : "",
      disallow: isProduction ? [] : ["/"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
