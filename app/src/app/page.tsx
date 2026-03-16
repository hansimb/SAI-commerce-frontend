import { ContentBoxes } from "@/components/page-components/content-boxes";
import { Hero } from "@/components/page-components/hero";
import { TextContentBlock } from "@/components/page-components/text-content-block";
import {
  contentBoxesMockData,
  textContentBlockMockData,
} from "@/data/mock-data";
import { Container } from "@chakra-ui/react";

export default function Home() {
  return (
    <Container>
      <Hero />
      <TextContentBlock {...textContentBlockMockData} />
      <ContentBoxes items={contentBoxesMockData} />
    </Container>
  );
}
