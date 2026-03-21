import { ContentBoxes } from "@/components/page-components/content-boxes";
import { Hero } from "@/components/page-components/hero";
import { ProcessSteps } from "@/components/page-components/process-steps";
import { QuoteBlock } from "@/components/page-components/quote-block";
import { TextContentBlock } from "@/components/page-components/text-content-block";
import { getHomePageData } from "@/data/pages/home";
import { Container, Separator } from "@chakra-ui/react";

export default function Home() {
  const homePageData = getHomePageData();

  return (
    <Container>
      <Hero />
      <Separator />
      <TextContentBlock {...homePageData.intro} />
      <ContentBoxes items={homePageData.contentBoxes} />
      <Separator />

      <TextContentBlock {...homePageData.intro} />
      <ProcessSteps steps={homePageData.processSteps} />
      <Separator />
      <QuoteBlock data={homePageData.quote} />
    </Container>
  );
}
