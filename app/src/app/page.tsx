import { ContentBoxes } from "@/components/page-components/content-boxes";
import { Hero } from "@/components/page-components/hero";
import { ProcessSteps } from "@/components/page-components/process-steps";
import { QuoteBlock } from "@/components/page-components/quote-block";
import { TextContentBlock } from "@/components/page-components/text-content-block";
import {
  contentBoxesMockData,
  processStepsMockData,
  quoteBlockMockData,
  textContentBlockMockData,
} from "@/data/mock-data";
import { Container, Separator } from "@chakra-ui/react";

export default function Home() {
  return (
    <Container>
      <Hero />
      <Separator />
      <TextContentBlock {...textContentBlockMockData} />
      <ContentBoxes items={contentBoxesMockData} />
      <Separator />

      <TextContentBlock {...textContentBlockMockData} />
      <ProcessSteps steps={processStepsMockData} />
      <Separator />
      <QuoteBlock data={quoteBlockMockData} />
    </Container>
  );
}
