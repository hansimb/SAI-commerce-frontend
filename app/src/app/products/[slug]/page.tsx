import { notFound } from "next/navigation";
import { Container, Separator, SimpleGrid, Stack } from "@chakra-ui/react";
import { CustomizationCard } from "@/components/page-components/product-sections/customization-card";
import { Hero } from "@/components/page-components/product-sections/hero";
import { Highlights } from "@/components/page-components/product-sections/highlights";
import { ImageSpecsHorizontal } from "@/components/page-components/product-sections/image-specs-horizontal";
import { ImageSpecsVertical } from "@/components/page-components/product-sections/image-specs-vertical";
import { KeySpecs } from "@/components/page-components/product-sections/key-specs";
import { LargeImage } from "@/components/page-components/product-sections/large-image";
import { getProductDetailPageData } from "@/data/products/product-detail-page";
import { TextContentBlock } from "@/components/page-components/text-content-block";

interface ProductDetailRouteProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductDetailRoute({
  params,
}: ProductDetailRouteProps) {
  const { slug } = await params;
  const data = getProductDetailPageData(slug);

  if (!data) {
    notFound();
  }

  return (
    <Container>
      <Stack gap={{ base: 16, md: 24 }} py={{ base: 10, md: 14 }}>
        <Hero product={data.product} ctaLabel={data.ctaLabel} />
        <Separator />
        <LargeImage title={data.detail.largeImageTitle} image={data.product.image} />
        <Separator />

        <SimpleGrid
          columns={{ base: 1, xl: 2 }}
          gap={6}
          w="full"
          maxW="5xl"
          mx="auto"
          justifyItems="center"
        >
          <KeySpecs section={data.detail.keySpecs} />
          <Highlights section={data.detail.highlights} />
        </SimpleGrid>
        <Separator />

        <CustomizationCard section={data.customization} />
        <Separator />
        <ImageSpecsHorizontal section={data.detail.horizontalSpecs} />
        <Separator />
        <ImageSpecsVertical section={data.detail.verticalSpecs} />
        <TextContentBlock ctaBtnText="Buy now" href="/" />
      </Stack>
      <Separator />
    </Container>
  );
}
