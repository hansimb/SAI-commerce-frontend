import { Box, Button, Heading, Stack, Text } from "@chakra-ui/react";
import type { ContactPageData } from "@/data/mock-data";

interface ContactPageProps {
  data: ContactPageData;
}

export function ContactPage({ data }: ContactPageProps) {
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
          {data.eyebrow}
        </Text>
        <Heading as="h1" size="2xl" mb={4}>
          {data.title}
        </Heading>
        <Text>{data.intro}</Text>
      </Box>

      <Stack direction={{ base: "column", md: "row" }} gap={6}>
        <Box flex="1" borderWidth="1px" rounded="lg" p={8}>
          <Heading as="h2" size="lg" mb={5}>
            Contact methods
          </Heading>
          <Stack gap={5}>
            {data.contactMethods.map((item) => (
              <Box key={item.label}>
                <Text fontWeight="bold">{item.label}</Text>
                <Text>{item.value}</Text>
                {item.detail && (
                  <Text fontSize="sm" color="fgMuted">
                    {item.detail}
                  </Text>
                )}
              </Box>
            ))}
          </Stack>
        </Box>

        <Box flex="1" borderWidth="1px" rounded="lg" p={8}>
          <Heading as="h2" size="lg" mb={3}>
            {data.studioTitle}
          </Heading>
          <Text mb={6}>{data.studioText}</Text>

          <Heading as="h3" size="md" mb={3}>
            {data.inquiryTitle}
          </Heading>
          <Text mb={6}>{data.inquiryText}</Text>

          <Button>{data.ctaLabel}</Button>
        </Box>
      </Stack>
    </Stack>
  );
}
