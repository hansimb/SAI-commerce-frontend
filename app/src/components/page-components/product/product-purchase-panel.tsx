import { Button, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";

interface ProductPurchasePanelProps {
  slug: string;
  price: string;
  priceSubtitle: string;
  addToCartLabel: string;
  customizeLabel: string;
}

export function ProductPurchasePanel({
  slug,
  price,
  priceSubtitle,
  addToCartLabel,
  customizeLabel,
}: ProductPurchasePanelProps) {
  return (
    <Flex
      justify="space-between"
      align={{ base: "start", md: "center" }}
      gap={6}
      wrap="wrap"
    >
      <Stack gap={1}>
        <Text fontSize="sm" textTransform="uppercase" letterSpacing="wide">
          Starting at
        </Text>
        <Heading as="h2" size="xl">
          {price}
        </Heading>
        <Text fontSize="sm" color="fgMuted">
          {priceSubtitle}
        </Text>
      </Stack>

      <Flex gap={4} wrap="wrap">
        <Button>{addToCartLabel}</Button>
        <Button asChild variant="outline">
          <Link href={`/products/${slug}/customize`}>{customizeLabel}</Link>
        </Button>
      </Flex>
    </Flex>
  );
}
