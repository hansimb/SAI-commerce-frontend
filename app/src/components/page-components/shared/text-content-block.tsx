import { Box, Container, Heading, Text, Stack, Button } from "@chakra-ui/react";
import Link from "next/link";
import { hasTextContentBlockContent } from "@/data/predicates";

interface TextContentBlockProps {
  thoughtTitle?: string;
  mainTitle?: string;
  text1?: string;
  text2?: string;
  ctaBtnText?: string;
  href?: string;
}

export const TextContentBlock = ({
  thoughtTitle,
  mainTitle,
  text1,
  text2,
  ctaBtnText,
  href,
}: TextContentBlockProps) => {
  if (
    !hasTextContentBlockContent({ thoughtTitle, mainTitle, text1, text2 }) &&
    !(ctaBtnText && href)
  ) {
    return null;
  }

  return (
    <Box as="section" pt={12} maxW={800} mx="auto">
      <Container maxW="container.lg">
        <Stack paddingY={3} textAlign="center">
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
            <Heading p={3} as="h2" size="4xl" fontWeight="bold">
              {mainTitle}
            </Heading>
          )}

          <Stack pb={4}>
            {text1 && (
              <Text pt={2} as="p" fontSize="md" lineHeight="tall">
                {text1}
              </Text>
            )}

            {text2 && (
              <Text pt={2} as="p" fontSize="md" lineHeight="tall">
                {text2}
              </Text>
            )}
            {ctaBtnText && href && (
              <Link href={href}>
                <Button>{ctaBtnText}</Button>
              </Link>
            )}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};
