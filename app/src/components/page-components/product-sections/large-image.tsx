import { Box, Heading, Image, Stack } from "@chakra-ui/react";
import type { ProductImageAsset } from "@/types/products";

interface LargeImageProps {
  title?: string;
  image: ProductImageAsset;
}

export function LargeImage({ title, image }: LargeImageProps) {
  return (
    <Stack gap={6}>
      {title ? (
        <Heading as="h2" size="2xl" textAlign="center">
          {title}
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
