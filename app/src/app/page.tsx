import { ContentBoxes } from "@/components/page-components/content-boxes";
import { Hero } from "@/components/page-components/hero";
import { LargeImageSection } from "@/components/page-components/large-image-section";
import { ProcessSteps } from "@/components/page-components/process-steps";
import { QuoteBlock } from "@/components/page-components/quote-block";
import { TextContentBlock } from "@/components/page-components/text-content-block";
import { getBrandData } from "@/data/brand";
import { getHomePageData } from "@/data/loaders/home";
import { Container, Separator } from "@chakra-ui/react";

export default async function Home() {
  const brand = await getBrandData();
  const homePageData = await getHomePageData();

  return (
    <>
      <Hero
        {...homePageData.hero}
        title={homePageData.hero.title || brand.name}
        subtitle={homePageData.hero.subtitle || brand.slogan}
      />
      <Separator />
      <Container>
        <TextContentBlock {...homePageData.textContentBlock1} />
        <ContentBoxes items={homePageData.contentBoxes} />
        <Separator />

        {homePageData.largeImage ? (
          <LargeImageSection image={homePageData.largeImage} />
        ) : null}
        <Separator />
        <TextContentBlock {...homePageData.textContentBlock2} />
        <ProcessSteps steps={homePageData.processSteps} />
        <Separator />
        <QuoteBlock data={homePageData.quote} />
      </Container>
    </>
  );
}
