import { Box, Flex, Separator, Stack, Text } from "@chakra-ui/react";
import type { ProductSpecItem } from "@/types/products";

interface ProductSpecsListProps {
  specs: ProductSpecItem[];
  boxed?: boolean;
}

export function ProductSpecsList({
  specs,
  boxed = true,
}: ProductSpecsListProps) {
  const content = (
    <Stack gap={0}>
      {specs.map((spec, index) => (
        <Box key={spec.label}>
          {index > 0 ? <Separator borderColor="border" /> : null}
          <Flex justify="space-between" py={3} gap={4}>
            <Text fontSize="sm" color="gray.400">
              {spec.label}
            </Text>
            <Text fontWeight="semibold" textAlign="right">
              {spec.value}
            </Text>
          </Flex>
        </Box>
      ))}
    </Stack>
  );

  if (!boxed) {
    return content;
  }

  return (
    <Box borderWidth="1px" rounded="md" p={5}>
      {content}
    </Box>
  );
}
