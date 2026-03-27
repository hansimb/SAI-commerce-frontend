import { getContactMethodsData } from "@/data/contact";
import { contactPageMockData } from "@/data/mock/contact";
import { isShopifyDataSource } from "@/data/source";
import type { ContactPageData } from "@/types/contact";

export async function getContactPageData(): Promise<ContactPageData> {
  if (isShopifyDataSource()) {
    return getShopifyContactPageData();
  }

  return getMockContactPageData();
}

function getMockContactPageData(): ContactPageData {
  return contactPageMockData;
}

async function getShopifyContactPageData(): Promise<ContactPageData> {
  return {
    ...getMockContactPageData(),
    contactMethods: await getContactMethodsData(),
  };
}
