import { Box, Button, Heading, Stack, Text } from "@chakra-ui/react";
import type { ProductCustomizationPageData } from "@/data/mock-data";

interface ProductCustomizationProps {
  data: ProductCustomizationPageData;
}

export function ProductCustomization({
  data,
}: ProductCustomizationProps) {
  return (
    <Stack gap={8} py={10}>
      <Box borderWidth="1px" rounded="lg" p={8}>
        <Text
          fontSize="sm"
          fontWeight="semibold"
          color="accentBright"
          textTransform="uppercase"
          mb={3}
        >
          Customization
        </Text>
        <Heading as="h1" size="2xl" mb={4}>
          {data.title}
        </Heading>
        <Text>{data.intro}</Text>
      </Box>

      <Stack direction={{ base: "column", md: "row" }} gap={6}>
        {data.optionGroups.map((group) => (
          <Box key={group.title} flex="1" borderWidth="1px" rounded="lg" p={8}>
            <Heading as="h2" size="lg" mb={3}>
              {group.title}
            </Heading>
            <Text mb={4}>{group.description}</Text>
            <Stack gap={2}>
              {group.options.map((option) => (
                <Text key={option}>{option}</Text>
              ))}
            </Stack>
          </Box>
        ))}
      </Stack>

      <Box borderWidth="1px" rounded="lg" p={8}>
        <Text mb={6}>{data.note}</Text>
        <Button>{data.ctaLabel}</Button>
      </Box>
    </Stack>
  );
}
