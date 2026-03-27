import { Box, Heading, Image, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import type { ProductImageSpecsSectionData } from "@/types/products";

interface ImageSpecsSectionProps {
  section: ProductImageSpecsSectionData;
}

export function ImageSpecsSection({ section }: ImageSpecsSectionProps) {
  if (section.layout === "vertical") {
    return (
      <Stack gap={6}>
        {section.title ? <Heading as="h2" size="2xl">{section.title}</Heading> : null}

        <Stack direction={{ base: "column", lg: "row" }} gap={{ base: 8, lg: 16 }}>
          <Box
            flex="0 0 48%"
            rounded="3xl"
            p={{ base: 6, md: 8 }}
            minH={{ base: "320px", md: "680px" }}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Image
              src={section.image.src}
              alt={section.image.alt}
              w="full"
              h="full"
              maxH={{ base: "320px", md: "660px" }}
              objectFit="contain"
            />
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

  return (
    <Stack gap={6}>
      {section.title ? <Heading as="h2" size="2xl">{section.title}</Heading> : null}

      <Box
        rounded="3xl"
        p={{ base: 6, md: 8 }}
        minH={{ base: "260px", md: "420px" }}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Image
          src={section.image.src}
          alt={section.image.alt}
          w="full"
          h="full"
          maxH={{ base: "240px", md: "400px" }}
          objectFit="contain"
        />
      </Box>

      <SimpleGrid columns={{ base: 1, md: 4 }} gap={6}>
        {section.specs.map((spec) => (
          <Stack key={spec.label} gap={1}>
            <Heading as="h3" size="lg">
              {spec.value}
            </Heading>
            <Text color="fgMuted">{spec.label}</Text>
          </Stack>
        ))}
      </SimpleGrid>
    </Stack>
  );
}
