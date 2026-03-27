import { Box, Heading, Image, Stack } from "@chakra-ui/react";
import { AddToCartButton } from "@/components/cart/add-to-cart-button";
import type { ProductImageAsset, ProductSummary } from "@/types/products";

interface HeroProps {
  product: ProductSummary;
  image: ProductImageAsset;
  ctaLabel: string;
}

export function Hero({ product, image, ctaLabel }: HeroProps) {
  return (
    <Stack gap={{ base: 6, md: 8 }} align="center">
      <Heading as="h1" size="4xl" textAlign="center">
        {product.title}
      </Heading>

      <Box
        w="full"
        rounded="3xl"
        p={{ base: 6, md: 10 }}
        minH={{ base: "320px", md: "560px" }}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Image
          src={image.src}
          alt={image.alt}
          w="full"
          h="full"
          maxH={{ base: "300px", md: "540px" }}
          objectFit="contain"
        />
      </Box>

      {product.availableForSale ? (
        <AddToCartButton
          slug={product.slug}
          title={product.title}
          price={product.price}
          imageUrl={image.src}
          label={ctaLabel}
        />
      ) : null}
    </Stack>
  );
}
