import { notFound } from "next/navigation";
import { Container, Separator, SimpleGrid, Stack } from "@chakra-ui/react";
import { AddToCartButton } from "@/components/cart/add-to-cart-button";
import { CustomizationCard } from "@/components/page-components/product-details/customization-card";
import { Hero } from "@/components/page-components/product-details/hero";
import { Highlights } from "@/components/page-components/product-details/highlights";
import { ImageSpecsSection } from "@/components/page-components/product-details/image-specs-section";
import { KeySpecs } from "@/components/page-components/product-details/key-specs";
import { LargeImage } from "@/components/page-components/product-details/large-image";
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
  const data = await getProductDetailPageData(slug);

  if (!data) {
    notFound();
  }

  const horizontalImageSpecsSection = data.detail.imageSpecsSections.find(
    (section) => section.layout === "horizontal",
  );
  const verticalImageSpecsSection = data.detail.imageSpecsSections.find(
    (section) => section.layout === "vertical",
  );
  const showCustomization =
    process.env.NODE_ENV === "development" && Boolean(data.customization);

  return (
    <Container>
      <Stack gap={{ base: 16, md: 24 }} py={{ base: 10, md: 14 }}>
        <Hero
          product={data.product}
          image={data.detail.heroImage}
          ctaLabel={data.ctaLabel}
        />
        {data.detail.textContentBlock ? (
          <>
            <Separator />
            <TextContentBlock {...data.detail.textContentBlock} />
          </>
        ) : null}
        <Separator />
        <LargeImage image={data.detail.largeImage} />
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

        {showCustomization && data.customization ? (
          <>
            <Separator />
            <CustomizationCard section={data.customization} />
          </>
        ) : null}

        {horizontalImageSpecsSection ? (
          <>
            <Separator />
            <ImageSpecsSection section={horizontalImageSpecsSection} />
          </>
        ) : null}

        {data.detail.textContentBlock2 ? (
          <>
            <Separator />
            <TextContentBlock {...data.detail.textContentBlock2} />
          </>
        ) : null}

        {data.detail.largeImage2 ? (
          <>
            <Separator />
            <LargeImage image={data.detail.largeImage2} />
          </>
        ) : null}

        {verticalImageSpecsSection ? (
          <>
            <Separator />
            <ImageSpecsSection section={verticalImageSpecsSection} />
          </>
        ) : null}

        {data.product.availableForSale ? (
          <>
            <Separator />
            <Stack align="center">
              <AddToCartButton
                slug={data.product.slug}
                title={data.product.title}
                price={data.product.price}
                imageUrl={data.detail.heroImage.src}
                label={data.ctaLabel}
              />
            </Stack>
          </>
        ) : null}
      </Stack>
      <Separator />
    </Container>
  );
}
