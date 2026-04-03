import type { Metadata } from "next";
import { ProductCard } from "@/components/page-components/products/product-card";
import { TextContentBlock } from "@/components/page-components/shared/text-content-block";
import { getProductsPageData } from "@/data/loaders/products-page";
import { buildPageTitle, createDescription, createMetadata } from "@/lib/seo";
import { Box, Container, Separator } from "@chakra-ui/react";

export async function generateMetadata(): Promise<Metadata> {
  const productsPageData = await getProductsPageData();

  return createMetadata({
    title: buildPageTitle("Products"),
    description: createDescription(
      productsPageData.textContentBlock.mainTitle,
      productsPageData.textContentBlock.text1,
      productsPageData.textContentBlock.text2,
    ),
    path: "/products",
    image: productsPageData.items[0]?.image.src || "/logo_horizontal.png",
  });
}

export default async function ProductsList() {
  const productsPageData = await getProductsPageData();

  return (
    <Container>
      <Box mb={6}>
        <TextContentBlock {...productsPageData.textContentBlock} />
      </Box>
      <Separator />
      {productsPageData.items.map((product) => (
        <ProductCard key={product.slug} data={product} />
      ))}
    </Container>
  );
}
