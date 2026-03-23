import { contactMethodsData } from "@/data/contact";
import { getProductsPageData } from "@/data/loaders/products";
import { NavigationLinks } from "@/data/navigation-links";
import type { FooterData } from "@/types/footer";

export function getFooterData(): FooterData {
  const { items } = getProductsPageData();

  return {
    linkGroups: [
      {
        title: "Navigation",
        links: NavigationLinks,
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
