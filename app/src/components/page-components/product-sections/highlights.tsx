import { Box, Stack, Text } from "@chakra-ui/react";
import type { ProductHighlightsSectionData } from "@/types/products";

interface HighlightsProps {
  section: ProductHighlightsSectionData;
}

export function Highlights({ section }: HighlightsProps) {
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
        {section.items.map((item) => (
          <Text key={item}>{item}</Text>
        ))}
      </Stack>
    </Box>
  );
}
