import { Box, Image, SimpleGrid, Stack } from "@chakra-ui/react";
import type { ProductDetailPageData } from "@/types/products";

interface ProductDetailMediaProps {
  imageUrl: string;
  title: string;
  gallery: ProductDetailPageData["gallery"];
}

export function ProductDetailMedia({
  imageUrl,
  title,
  gallery,
}: ProductDetailMediaProps) {
  return (
    <Stack flex="1" gap={4}>
      <Box borderWidth="1px" rounded="lg" p={6}>
        <Image src={imageUrl} alt={title} w="full" h="auto" rounded="md" />
      </Box>

      <SimpleGrid columns={{ base: 2, md: 3 }} gap={4}>
        {gallery.map((item) => (
          <Box key={item.alt} borderWidth="1px" rounded="md" p={4}>
            <Image src={item.src} alt={item.alt} w="full" h="auto" rounded="sm" />
          </Box>
        ))}
      </SimpleGrid>
    </Stack>
  );
}
