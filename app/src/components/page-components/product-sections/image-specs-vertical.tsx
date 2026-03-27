import { Box, Heading, Image, Stack, Text } from "@chakra-ui/react";
import type { ProductSpecsSectionData } from "@/types/products";

interface ImageSpecsVerticalProps {
  section: ProductSpecsSectionData;
}

export function ImageSpecsVertical({ section }: ImageSpecsVerticalProps) {
  return (
    <Stack gap={6}>
      {section.title ? <Heading as="h2" size="2xl">{section.title}</Heading> : null}

      <Stack direction={{ base: "column", lg: "row" }} gap={{ base: 8, lg: 16 }}>
        <Box
          flex="0 0 48%"
          borderWidth="1px"
          rounded="3xl"
          p={{ base: 6, md: 8 }}
          minH={{ base: "320px", md: "680px" }}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {section.image ? (
            <Image
              src={section.image.src}
              alt={section.image.alt}
              w="full"
              h="full"
              maxH={{ base: "320px", md: "660px" }}
              objectFit="contain"
            />
          ) : null}
        </Box>

        <Stack flex="1" justify="space-around" py={{ base: 0, lg: 8 }} gap={8}>
          {section.specs.map((spec) => (
            <Stack key={spec.label} gap={1}>
              <Heading as="h3" size="xl">
                {spec.value}
              </Heading>
              <Text fontSize={{ base: "md", md: "lg" }} color="fgMuted">
                {spec.label}
              </Text>
            </Stack>
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
}
