import { ContentBoxes } from "@/components/page-components/content-boxes";
import { Hero } from "@/components/page-components/hero";
import { TextContentBlock } from "@/components/page-components/text-content-block";
import {
  contentBoxesMockData,
  textContentBlockMockData,
} from "@/data/mock-data";
import { Container, Separator } from "@chakra-ui/react";

export default function Home() {
  return (
    <Container>
      <Hero />
      <Separator />
      <TextContentBlock {...textContentBlockMockData} />
      <Separator />
      <ContentBoxes items={contentBoxesMockData} />
      <Separator />
    </Container>
  );
}
