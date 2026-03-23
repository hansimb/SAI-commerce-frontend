import { Box, Heading, Image, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import type { ProductHorizontalImageSpecsSectionData } from "@/types/products";

interface ImageSpecsHorizontalProps {
  section: ProductHorizontalImageSpecsSectionData;
}

export function ImageSpecsHorizontal({
  section,
}: ImageSpecsHorizontalProps) {
  return (
    <Stack gap={6}>
      {section.title ? <Heading as="h2" size="2xl">{section.title}</Heading> : null}

      <Box
        borderWidth="1px"
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

      <SimpleGrid columns={{ base: 1, md: section.specs.length }} gap={6}>
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
