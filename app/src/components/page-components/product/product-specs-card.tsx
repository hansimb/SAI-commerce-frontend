import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import type { ProductDetailPageData } from "@/types/products";

interface ProductSpecsCardProps {
  specs: ProductDetailPageData["specs"];
}

export function ProductSpecsCard({ specs }: ProductSpecsCardProps) {
  return (
    <Box borderWidth="1px" rounded="md" p={5} mb={6}>
      <Text
        fontSize="sm"
        textTransform="uppercase"
        letterSpacing="wide"
        mb={3}
        color="accentBright"
      >
        Key specs
      </Text>
      <Stack gap={3}>
        {specs.map((spec) => (
          <Flex key={spec.label} justify="space-between" gap={4}>
            <Text fontSize="sm" color="fgMuted">
              {spec.label}
            </Text>
            <Text fontWeight="semibold" textAlign="right">
              {spec.value}
            </Text>
          </Flex>
        ))}
      </Stack>
    </Box>
  );
}
