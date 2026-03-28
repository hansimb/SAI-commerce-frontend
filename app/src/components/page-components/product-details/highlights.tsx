import { Box, List, Stack, Text } from "@chakra-ui/react";
import type { ProductHighlightsSectionData } from "@/types/products";

interface HighlightsProps {
  section: ProductHighlightsSectionData;
}

export function Highlights({ section }: HighlightsProps) {
  return (
    <Box
      borderWidth="1px"
      rounded="3xl"
      p={{ base: 6, md: 8 }}
      maxW="2xl"
      w="full"
    >
      <Text
        fontSize="sm"
        textTransform="uppercase"
        letterSpacing="wide"
        mb={4}
        color="accentBright"
      >
        {section.title}
      </Text>

      <List.Root gap={4}>
        {section.items.map((item) => (
          <List.Item key={item}>
            <Stack gap={1}>
              <Text lineHeight="tall">{item}</Text>
            </Stack>
          </List.Item>
        ))}
      </List.Root>
    </Box>
  );
}
