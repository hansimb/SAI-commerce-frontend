import { Box, Heading, Image, Stack } from "@chakra-ui/react";
import { AddToCartButton } from "@/components/cart/add-to-cart-button";
import type { ProductSummary } from "@/types/products";

interface HeroProps {
  product: ProductSummary;
  ctaLabel: string;
}

export function Hero({ product, ctaLabel }: HeroProps) {
  return (
    <Stack gap={{ base: 6, md: 8 }} align="center">
      <Heading as="h1" size="4xl" textAlign="center">
        {product.title}
      </Heading>

      <Box
        w="full"
        borderWidth="1px"
        rounded="3xl"
        p={{ base: 6, md: 10 }}
        minH={{ base: "320px", md: "560px" }}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Image
          src={product.image.src}
          alt={product.image.alt}
          w="full"
          h="full"
          maxH={{ base: "300px", md: "540px" }}
          objectFit="contain"
        />
      </Box>

      <AddToCartButton
        slug={product.slug}
        title={product.title}
        price={product.price}
        imageUrl={product.image.src}
        label={ctaLabel}
      />
    </Stack>
  );
}
