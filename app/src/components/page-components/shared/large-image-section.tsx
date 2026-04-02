import { Box, Image } from "@chakra-ui/react";
import type { ProductImageAsset } from "@/types/products";

interface LargeImageSectionProps {
  image: ProductImageAsset;
}

export function LargeImageSection({ image }: LargeImageSectionProps) {
  if (!image.src) {
    return null;
  }

  return (
    <Box
      as="section"
      rounded="3xl"
      p={{ base: 6, md: 10 }}
      minH={{ base: "340px", md: "560px" }}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Image
        src={image.src}
        alt={image.alt}
        w="full"
        h="full"
        maxH={{ base: "320px", md: "540px" }}
        objectFit="contain"
      />
    </Box>
  );
}
