import { Box, Heading, Image, Stack } from "@chakra-ui/react";
import type { ProductLargeImageSectionData } from "@/types/products";

interface LargeImageProps {
  section: ProductLargeImageSectionData;
}

export function LargeImage({ section }: LargeImageProps) {
  return (
    <Stack gap={6}>
      {section.title ? (
        <Heading as="h2" size="2xl" textAlign="center">
          {section.title}
        </Heading>
      ) : null}

      <Box
        borderWidth="1px"
        rounded="3xl"
        p={{ base: 6, md: 10 }}
        minH={{ base: "340px", md: "560px" }}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Image
          src={section.image.src}
          alt={section.image.alt}
          w="full"
          h="full"
          maxH={{ base: "320px", md: "540px" }}
          objectFit="contain"
        />
      </Box>
    </Stack>
  );
}
