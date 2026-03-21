import { Box, Heading, Text } from "@chakra-ui/react";

interface ContactIntroCardProps {
  eyebrow: string;
  title: string;
  intro: string;
}

export function ContactIntroCard({
  eyebrow,
  title,
  intro,
}: ContactIntroCardProps) {
  return (
    <Box borderWidth="1px" rounded="lg" p={8}>
      <Text
        fontSize="sm"
        fontWeight="semibold"
        color="accentBright"
        textTransform="uppercase"
        mb={3}
      >
        {eyebrow}
      </Text>
      <Heading as="h1" size="2xl" mb={4}>
        {title}
      </Heading>
      <Text>{intro}</Text>
    </Box>
  );
}
