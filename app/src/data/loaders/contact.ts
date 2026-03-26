import { contactPageMockData } from "@/data/mock/contact";
import { isShopifyDataSource } from "@/data/source";
import type { ContactPageData } from "@/types/contact";

export function getContactPageData(): ContactPageData {
  if (isShopifyDataSource()) {
    return getShopifyContactPageData();
  }

  return getMockContactPageData();
}

function getMockContactPageData(): ContactPageData {
  return contactPageMockData;
}

function getShopifyContactPageData(): ContactPageData {
  return getMockContactPageData();
}
