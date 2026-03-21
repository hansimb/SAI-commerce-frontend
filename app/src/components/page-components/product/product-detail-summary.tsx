import { Box, Heading, Stack, Text } from "@chakra-ui/react";

interface ProductDetailSummaryProps {
  categoryLabel: string;
  title: string;
  subtitle: string;
  intro: string;
  description: string[];
}

export function ProductDetailSummary({
  categoryLabel,
  title,
  subtitle,
  intro,
  description,
}: ProductDetailSummaryProps) {
  return (
    <Box>
      <Text
        textTransform="uppercase"
        fontSize="sm"
        fontWeight="semibold"
        letterSpacing="wide"
        mb={3}
        color="accentBright"
      >
        {categoryLabel}
      </Text>
      <Heading as="h1" size="2xl" mb={2}>
        {title}
      </Heading>
      <Text fontSize="lg" fontStyle="italic" mb={4}>
        {subtitle}
      </Text>
      <Text mb={4}>{intro}</Text>
      <Stack gap={4} mb={6}>
        {description.map((paragraph) => (
          <Text key={paragraph}>{paragraph}</Text>
        ))}
      </Stack>
    </Box>
  );
}
