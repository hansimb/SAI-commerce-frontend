import {
  homeContentBoxesMockData,
  homeIntroMockData,
  homeProcessStepsMockData,
  homeQuoteMockData,
} from "@/data/mock/home";
import { isShopifyDataSource } from "@/data/source";

export function getHomePageData() {
  if (isShopifyDataSource()) {
    return getShopifyHomePageData();
  }

  return getMockHomePageData();
}

function getMockHomePageData() {
  return {
    intro: homeIntroMockData,
    contentBoxes: homeContentBoxesMockData,
    processSteps: homeProcessStepsMockData,
    quote: homeQuoteMockData,
  };
}

function getShopifyHomePageData() {
  return getMockHomePageData();
}
