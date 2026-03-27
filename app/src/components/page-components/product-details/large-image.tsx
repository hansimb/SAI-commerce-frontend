import { Box, Image, Stack } from "@chakra-ui/react";
import type { ProductImageAsset } from "@/types/products";

interface LargeImageProps {
  image: ProductImageAsset;
}

export function LargeImage({ image }: LargeImageProps) {
  return (
    <Stack gap={6}>
      <Box
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
    </Stack>
  );
}
