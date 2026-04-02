import { Box, Image, Stack } from "@chakra-ui/react";
import type { ProductImageAsset } from "@/types/products";

interface LargeImageProps {
  image: ProductImageAsset;
}

export function LargeImage({ image }: LargeImageProps) {
  if (!image.src) {
    return null;
  }

  return (
    <Stack gap={6}>
      <Box
        rounded="3xl"
        p={{ base: 2, md: 4 }}
        minH={{ base: "380px", md: "760px", xl: "860px" }}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Image
          src={image.src}
          alt={image.alt}
          w="full"
          h="full"
          maxH={{ base: "360px", md: "740px", xl: "840px" }}
          objectFit="contain"
        />
      </Box>
    </Stack>
  );
}
