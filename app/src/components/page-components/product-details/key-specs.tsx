import { Box, Stack, Text } from "@chakra-ui/react";
import { ProductSpecsList } from "@/components/page-components/product-details/product-specs-list";
import type { ProductSpecsSectionData } from "@/types/products";

interface KeySpecsProps {
  section: ProductSpecsSectionData;
}

export function KeySpecs({ section }: KeySpecsProps) {
  return (
    <Box borderWidth="1px" rounded="3xl" p={{ base: 6, md: 8 }} maxW="2xl" w="full">
      <Text
        fontSize="sm"
        textTransform="uppercase"
        letterSpacing="wide"
        mb={4}
        color="accentBright"
      >
        {section.title}
      </Text>

      <Stack gap={4}>
        <ProductSpecsList specs={section.specs} />
      </Stack>
    </Box>
  );
}
