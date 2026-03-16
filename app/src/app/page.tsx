import { Hero } from "@/components/page-components/hero";
import { TextContentBlock } from "@/components/page-components/text-content-block";
import { Container } from "@chakra-ui/react";

export const textContentBlockMockData = {
  thoughtTitle: "Our Philosophy",
  mainTitle: "Timeless Design,\nUncompromising Quality",
  text1:
    "At Resonance, we believe that audio equipment should be more than just functional—it should be an object of desire, a piece of art, and a lifelong companion in your musical journey.",
  text2:
    "Every component is meticulously crafted in our Portland workshop, combining time-honored techniques with modern innovation. We use vintage-inspired aesthetics with contemporary technology to create pieces that stand the test of time.",
};

export default function Home() {
  return (
    <Container>
      <Hero />
      <TextContentBlock {...textContentBlockMockData} />
    </Container>
  );
}
