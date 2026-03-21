import {
  homeContentBoxesMockData,
  homeIntroMockData,
  homeProcessStepsMockData,
  homeQuoteMockData,
} from "@/data/mock/home";

export function getHomePageData() {
  return {
    intro: homeIntroMockData,
    contentBoxes: homeContentBoxesMockData,
    processSteps: homeProcessStepsMockData,
    quote: homeQuoteMockData,
  };
}
