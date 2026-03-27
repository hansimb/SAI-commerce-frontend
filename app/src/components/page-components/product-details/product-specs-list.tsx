import { Box, Flex, Text } from "@chakra-ui/react";
import type { ProductSpecItem } from "@/types/products";

interface ProductSpecsListProps {
  specs: ProductSpecItem[];
}

export function ProductSpecsList({ specs }: ProductSpecsListProps) {
  return (
    <Box borderWidth="1px" rounded="md" p={5}>
      {specs.map((spec) => (
        <Flex key={spec.label} justify="space-between" py={2} gap={4}>
          <Text fontSize="sm" color="gray.400">
            {spec.label}
          </Text>
          <Text fontWeight="semibold" textAlign="right">
            {spec.value}
          </Text>
        </Flex>
      ))}
    </Box>
  );
}
