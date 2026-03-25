import { contactMethodsData } from "@/data/contact";
import { hasArticlesContent } from "@/data/loaders/articles";
import { getProductsPageData } from "@/data/loaders/products";
import { getNavigationLinks } from "@/data/navigation-links";
import type { FooterData } from "@/types/footer";

export function getFooterData(): FooterData {
  const { items } = getProductsPageData();
  const navigationLinks = getNavigationLinks(hasArticlesContent());

  return {
    linkGroups: [
      {
        title: "Navigation",
        links: navigationLinks,
      },
      {
        title: "Products",
        links: items.map((product) => ({
          label: product.title,
          href: `/products/${product.slug}`,
        })),
      },
    ],
    contactItems: contactMethodsData,
  };
}
