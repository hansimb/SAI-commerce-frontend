import { Box, Stack, Text, Heading } from "@chakra-ui/react";

export interface QuoteBlockData {
  quote: string;
  author: string;
  subtitle?: string;
}

interface QuoteBlockProps {
  data: QuoteBlockData;
}

export const QuoteBlock = ({ data }: QuoteBlockProps) => {
  if (!data.quote || !data.author) {
    return null;
  }

  return (
    <Box as="section" maxW={1000} py={12} mx="auto">
      <Stack padding={6} align="center" textAlign="center">
        <Text fontSize="3xl" fontStyle="italic">
          “{data.quote}”
        </Text>
        {data.subtitle && (
          <Text
            pt={8}
            fontSize="sm"
            textTransform="uppercase"
            letterSpacing="wide"
          >
            {data.subtitle}
          </Text>
        )}
        <Heading as="h3" size="md">
          {data.author}
        </Heading>
      </Stack>
    </Box>
  );
};
