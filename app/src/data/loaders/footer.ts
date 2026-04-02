
import { hasArticlesContent } from "@/data/loaders/articles";
import { getProductsPageData } from "@/data/loaders/products-page";
import { getNavigationLinks } from "@/data/contents/navigation-links";
import type { FooterData } from "@/types/footer";
import { getContactMethodsData } from "./contact-methods";

export async function getFooterData(): Promise<FooterData> {
  const { items } = await getProductsPageData();
  const navigationLinks = getNavigationLinks(await hasArticlesContent());

  return {
    linkGroups: [
      {
        title: "Navigation",
        links: navigationLinks,
      },
      {
        title: "Products",
        links: items
          .filter((product) => product.hasDetails)
          .map((product) => ({
            label: product.title,
            href: `/products/${product.slug}`,
          })),
      },
    ],
    contactItems: await getContactMethodsData(),
  };
}
