import { Box, Button, Heading, Text } from "@chakra-ui/react";

interface ContactInquiryCardProps {
  studioTitle: string;
  studioText: string;
  inquiryTitle: string;
  inquiryText: string;
  ctaLabel: string;
}

export function ContactInquiryCard({
  studioTitle,
  studioText,
  inquiryTitle,
  inquiryText,
  ctaLabel,
}: ContactInquiryCardProps) {
  return (
    <Box flex="1" borderWidth="1px" rounded="lg" p={8}>
      <Heading as="h2" size="lg" mb={3}>
        {studioTitle}
      </Heading>
      <Text mb={6}>{studioText}</Text>

      <Heading as="h3" size="md" mb={3}>
        {inquiryTitle}
      </Heading>
      <Text mb={6}>{inquiryText}</Text>

      <Button>{ctaLabel}</Button>
    </Box>
  );
}
