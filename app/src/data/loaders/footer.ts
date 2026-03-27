import { contactMethodsData } from "@/data/contact";
import { hasArticlesContent } from "@/data/loaders/articles";
import { getProductsPageData } from "@/data/products/products-page";
import { getNavigationLinks } from "@/data/navigation-links";
import type { FooterData } from "@/types/footer";

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
        links: items.map((product) => ({
          label: product.title,
          href: `/products/${product.slug}`,
        })),
      },
    ],
    contactItems: contactMethodsData,
  };
}
