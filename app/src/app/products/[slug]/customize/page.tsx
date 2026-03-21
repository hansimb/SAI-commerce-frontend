import { notFound } from "next/navigation";
import { Container } from "@chakra-ui/react";
import { ProductCustomization } from "@/components/page-components/product-customization";
import { productCustomizationMockDataBySlug } from "@/data/mock-data";

interface ProductCustomizeRouteProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductCustomizeRoute({
  params,
}: ProductCustomizeRouteProps) {
  const { slug } = await params;
  const data = productCustomizationMockDataBySlug[slug];

  if (!data) {
    notFound();
  }

  return (
    <Container>
      <ProductCustomization data={data} />
    </Container>
  );
}
