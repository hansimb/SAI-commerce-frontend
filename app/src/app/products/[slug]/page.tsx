import { notFound } from "next/navigation";
import { Container, Separator, SimpleGrid, Stack } from "@chakra-ui/react";
import { CustomizationCard } from "@/components/page-components/product-sections/customization-card";
import { Hero } from "@/components/page-components/product-sections/hero";
import { Highlights } from "@/components/page-components/product-sections/highlights";
import { ImageSpecsHorizontal } from "@/components/page-components/product-sections/image-specs-horizontal";
import { ImageSpecsVertical } from "@/components/page-components/product-sections/image-specs-vertical";
import { KeySpecs } from "@/components/page-components/product-sections/key-specs";
import { LargeImage } from "@/components/page-components/product-sections/large-image";
import { getProductPageData } from "@/data/loaders/products";

interface ProductDetailRouteProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductDetailRoute({
  params,
}: ProductDetailRouteProps) {
  const { slug } = await params;
  const data = getProductPageData(slug);

  if (!data) {
    notFound();
  }

  return (
    <Container>
      <Stack gap={{ base: 16, md: 24 }} py={{ base: 10, md: 14 }}>
        <Hero slug={data.slug} section={data.hero} />
        <Separator />
        <LargeImage section={data.largeImage} />
        <Separator />

        <SimpleGrid
          columns={{ base: 1, xl: 2 }}
          gap={6}
          w="full"
          maxW="5xl"
          mx="auto"
          justifyItems="center"
        >
          <KeySpecs section={data.keySpecs} />
          <Highlights section={data.highlights} />
        </SimpleGrid>
        <Separator />

        <CustomizationCard section={data.customization} />
        <ImageSpecsHorizontal section={data.horizontalSpecs} />
        <ImageSpecsVertical section={data.verticalSpecs} />
      </Stack>
      <Separator />
    </Container>
  );
}
