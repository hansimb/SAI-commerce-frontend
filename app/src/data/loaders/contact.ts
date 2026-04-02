import { getContactMethodsData } from "@/data/fallback/contact-fallback";
import { contactPageIntroData } from "@/data/contents/contact-page-intro";
import { isShopifyDataSource } from "@/data/source";
import type { ContactPageData } from "@/types/contact";

export async function getContactPageData(): Promise<ContactPageData> {
  if (isShopifyDataSource()) {
    return getShopifyContactPageData();
  }

  return getContactPageIntroData();
}

function getContactPageIntroData(): ContactPageData {
  return contactPageIntroData;
}

async function getShopifyContactPageData(): Promise<ContactPageData> {
  return {
    ...getContactPageIntroData(),
    contactMethods: await getContactMethodsData(),
  };
}
