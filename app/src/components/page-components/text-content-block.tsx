import { Box, Container, Heading, Text, Stack } from "@chakra-ui/react";

interface TextContentBlockProps {
  thoughtTitle?: string;
  mainTitle?: string;
  text1?: string;
  text2?: string;
}

export const TextContentBlock = ({
  thoughtTitle,
  mainTitle,
  text1,
  text2,
}: TextContentBlockProps) => {
  return (
    <Box as="section" pt={12} maxW={1000} mx="auto">
      <Container maxW="container.lg">
        <Stack padding={8} textAlign="center">
          {thoughtTitle && (
            <Text
              as="p"
              fontSize="sm"
              fontWeight="semibold"
              color={"accentBright"}
              textUnderlineOffset={1}
              textDecoration={"underline"}
              textUnderlinePosition={"under"}
            >
              {thoughtTitle}
            </Text>
          )}

          {mainTitle && (
            <Heading as="h2" size="2xl" fontWeight="bold">
              {mainTitle}
            </Heading>
          )}

          <Stack padding={6}>
            {text1 && (
              <Text as="p" fontSize="md" lineHeight="tall">
                {text1}
              </Text>
            )}

            {text2 && (
              <Text as="p" fontSize="md" lineHeight="tall">
                {text2}
              </Text>
            )}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};
