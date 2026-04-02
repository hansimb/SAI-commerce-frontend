import { hasArticlesContent } from "@/data/loaders/articles";
import { buildFooterLinkGroups } from "@/data/mappers";
import { getProductsPageData } from "@/data/loaders/products-page";
import { getNavigationLinks } from "@/data/contents/navigation-links";
import type { FooterData } from "@/types/footer";
import { getContactMethodsData } from "./contact-methods";

export async function getFooterData(): Promise<FooterData> {
  const { items } = await getProductsPageData();
  const navigationLinks = getNavigationLinks(await hasArticlesContent());

  return {
    linkGroups: buildFooterLinkGroups({
      navigationLinks,
      products: items,
    }),
    contactItems: await getContactMethodsData(),
  };
}
