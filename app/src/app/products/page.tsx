import { ProductCard } from "@/components/page-components/product-card";
import { TextContentBlock } from "@/components/page-components/text-content-block";
import {
  productCardMockData,
  textContentBlockMockData,
} from "@/data/mock-data";
import { Container, Separator } from "@chakra-ui/react";

export default function Home() {
  return (
    <Container>
      <TextContentBlock {...textContentBlockMockData} />
      <Separator />
      <ProductCard data={productCardMockData} />
      <ProductCard data={productCardMockData} />
    </Container>
  );
}
