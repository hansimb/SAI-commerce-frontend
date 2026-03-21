import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import type { ContactPageData } from "@/types/contact";

interface ContactMethodsCardProps {
  items: ContactPageData["contactMethods"];
}

export function ContactMethodsCard({ items }: ContactMethodsCardProps) {
  return (
    <Box flex="1" borderWidth="1px" rounded="lg" p={8}>
      <Heading as="h2" size="lg" mb={5}>
        Contact methods
      </Heading>
      <Stack gap={5}>
        {items.map((item) => (
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
  );
}
