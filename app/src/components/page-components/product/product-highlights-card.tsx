import { Box, Stack, Text } from "@chakra-ui/react";

interface ProductHighlightsCardProps {
  highlights: string[];
}

export function ProductHighlightsCard({
  highlights,
}: ProductHighlightsCardProps) {
  return (
    <Box borderWidth="1px" rounded="md" p={5} mb={6}>
      <Text
        fontSize="sm"
        textTransform="uppercase"
        letterSpacing="wide"
        mb={3}
        color="accentBright"
      >
        Highlights
      </Text>
      <Stack gap={3}>
        {highlights.map((item) => (
          <Text key={item}>{item}</Text>
        ))}
      </Stack>
    </Box>
  );
}
