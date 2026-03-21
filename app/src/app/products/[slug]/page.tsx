import { notFound } from "next/navigation";
import { Box, Container, Flex, Separator, Stack } from "@chakra-ui/react";
import { ProductDetailMedia } from "@/components/page-components/product/product-detail-media";
import { ProductDetailSummary } from "@/components/page-components/product/product-detail-summary";
import { ProductHighlightsCard } from "@/components/page-components/product/product-highlights-card";
import { ProductPurchasePanel } from "@/components/page-components/product/product-purchase-panel";
import { ProductSpecsCard } from "@/components/page-components/product/product-specs-card";
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
      <Stack gap={8} py={10}>
        <Flex direction={{ base: "column", lg: "row" }} gap={8}>
          <ProductDetailMedia
            imageUrl={data.imageUrl}
            title={data.title}
            gallery={data.gallery}
          />

          <Box flex="1">
            <ProductDetailSummary
              categoryLabel={data.categoryLabel}
              title={data.title}
              subtitle={data.subtitle}
              intro={data.intro}
              description={data.description}
            />
            <ProductSpecsCard specs={data.specs} />
            <ProductHighlightsCard highlights={data.highlights} />
            <ProductPurchasePanel
              slug={data.slug}
              price={data.price}
              priceSubtitle={data.priceSubtitle}
              addToCartLabel={data.addToCartLabel}
              customizeLabel={data.customizeLabel}
            />
          </Box>
        </Flex>
      </Stack>
      <Separator />
    </Container>
  );
}
