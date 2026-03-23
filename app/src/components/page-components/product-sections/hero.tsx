import { Box, Heading, Image, Stack } from "@chakra-ui/react";
import { AddToCartButton } from "@/components/cart/add-to-cart-button";
import type { ProductHeroSectionData } from "@/types/products";

interface HeroProps {
  slug: string;
  section: ProductHeroSectionData;
}

export function Hero({ slug, section }: HeroProps) {
  return (
    <Stack gap={{ base: 6, md: 8 }} align="center">
      <Heading as="h1" size="4xl" textAlign="center">
        {section.title}
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
          src={section.image.src}
          alt={section.image.alt}
          w="full"
          h="full"
          maxH={{ base: "300px", md: "540px" }}
          objectFit="contain"
        />
      </Box>

      <AddToCartButton
        slug={slug}
        title={section.title}
        price={section.price}
        imageUrl={section.image.src}
        label={section.ctaLabel}
      />
    </Stack>
  );
}
