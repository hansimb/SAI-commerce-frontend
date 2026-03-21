import { notFound } from "next/navigation";
import { Container, Separator } from "@chakra-ui/react";
import { ProductDetailPage } from "@/components/page-components/product-detail-page";
import { productDetailMockDataBySlug } from "@/data/mock-data";

interface ProductDetailRouteProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductDetailRoute({
  params,
}: ProductDetailRouteProps) {
  const { slug } = await params;
  const data = productDetailMockDataBySlug[slug];

  if (!data) {
    notFound();
  }

  return (
    <Container>
      <ProductDetailPage data={data} />
      <Separator />
    </Container>
  );
}
