import { contactMethodsData } from "@/data/contact";
import { productsListMockData } from "@/data/mock/products";
import { NavigationLinks } from "@/data/navigation-links";
import type { FooterData } from "@/types/footer";

export function getFooterData(): FooterData {
  return {
    linkGroups: [
      {
        title: "Navigation",
        links: NavigationLinks,
      },
      {
        title: "Products",
        links: productsListMockData.map((product) => ({
          label: product.title,
          href: `/products/${product.slug}`,
        })),
      },
    ],
    contactItems: contactMethodsData,
  };
}
