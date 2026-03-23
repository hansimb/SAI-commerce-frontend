"use client";
import { ProductCard } from "@/components/page-components/product-card";
import { TextContentBlock } from "@/components/page-components/text-content-block";
import { getProductsPageData } from "@/data/loaders/products";
import { Container, Separator } from "@chakra-ui/react";

export default function ProductsList() {
  const productsPageData = getProductsPageData();

  return (
    <Container>
      <TextContentBlock {...productsPageData.textContentBlock} />
      <Separator />
      {productsPageData.items.map((product) => (
        <ProductCard key={product.slug} data={product} />
      ))}
    </Container>
  );
}
