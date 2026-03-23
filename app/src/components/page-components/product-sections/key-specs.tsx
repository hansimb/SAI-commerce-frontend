import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import type { ProductKeySpecsSectionData } from "@/types/products";

interface KeySpecsProps {
  section: ProductKeySpecsSectionData;
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
        {section.specs.map((spec) => (
          <Flex key={spec.label} justify="space-between" gap={4} borderTopWidth="1px" pt={4}>
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
