"use client";
import { ProductCard } from "@/components/page-components/product-card";
import { TextContentBlock } from "@/components/page-components/text-content-block";
import { getProductsPageData } from "@/data/pages/products";
import { Container, Separator } from "@chakra-ui/react";

export default function Home() {
  const productsPageData = getProductsPageData();

  return (
    <Container>
      <TextContentBlock {...productsPageData.intro} />
      <Separator />
      {productsPageData.items.map((product) => (
        <ProductCard key={product.slug} data={product} />
      ))}
    </Container>
  );
}
