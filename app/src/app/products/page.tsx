import { ProductCard } from "@/components/page-components/product-card";
import { TextContentBlock } from "@/components/page-components/text-content-block";
import { getProductsPageData } from "@/data/loaders/products";
import { Container, Separator } from "@chakra-ui/react";

export default async function ProductsList() {
  const productsPageData = await getProductsPageData();

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
