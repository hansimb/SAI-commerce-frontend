import { Box, Button, Flex, Heading, Image, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";
import type { ProductDetailPageData } from "@/data/mock-data";

interface ProductDetailPageProps {
  data: ProductDetailPageData;
}

export function ProductDetailPage({ data }: ProductDetailPageProps) {
  return (
    <Stack gap={8} py={10}>
      <Flex direction={{ base: "column", lg: "row" }} gap={8}>
        <Stack flex="1" gap={4}>
          <Box borderWidth="1px" rounded="lg" p={6}>
            <Image src={data.imageUrl} alt={data.title} w="full" h="auto" rounded="md" />
          </Box>

          <SimpleGrid columns={{ base: 2, md: 3 }} gap={4}>
            {data.gallery.map((item) => (
              <Box key={item.alt} borderWidth="1px" rounded="md" p={4}>
                <Image src={item.src} alt={item.alt} w="full" h="auto" rounded="sm" />
              </Box>
            ))}
          </SimpleGrid>
        </Stack>

        <Box flex="1">
          <Text
            textTransform="uppercase"
            fontSize="sm"
            fontWeight="semibold"
            letterSpacing="wide"
            mb={3}
            color="accentBright"
          >
            {data.categoryLabel}
          </Text>
          <Heading as="h1" size="2xl" mb={2}>
            {data.title}
          </Heading>
          <Text fontSize="lg" fontStyle="italic" mb={4}>
            {data.subtitle}
          </Text>
          <Text mb={4}>{data.intro}</Text>
          <Stack gap={4} mb={6}>
            {data.description.map((paragraph) => (
              <Text key={paragraph}>{paragraph}</Text>
            ))}
          </Stack>

          <Box borderWidth="1px" rounded="md" p={5} mb={6}>
            <Text
              fontSize="sm"
              textTransform="uppercase"
              letterSpacing="wide"
              mb={3}
              color="accentBright"
            >
              Key specs
            </Text>
            <Stack gap={3}>
              {data.specs.map((spec) => (
                <Flex key={spec.label} justify="space-between" gap={4}>
                  <Text fontSize="sm" color="fgMuted">
                    {spec.label}
                  </Text>
                  <Text fontWeight="semibold" textAlign="right">
                    {spec.value}
                  </Text>
                </Flex>
              ))}
            </Stack>
          </Box>

          <Box borderWidth="1px" rounded="md" p={5} mb={6}>
            <Text
              fontSize="sm"
              textTransform="uppercase"
              letterSpacing="wide"
              mb={3}
              color="accentBright"
            >
              Highlights
            </Text>
            <Stack gap={3}>
              {data.highlights.map((item) => (
                <Text key={item}>{item}</Text>
              ))}
            </Stack>
          </Box>

          <Flex justify="space-between" align={{ base: "start", md: "center" }} gap={6} wrap="wrap">
            <Stack gap={1}>
              <Text fontSize="sm" textTransform="uppercase" letterSpacing="wide">
                Starting at
              </Text>
              <Heading as="h2" size="xl">
                {data.price}
              </Heading>
              <Text fontSize="sm" color="fgMuted">
                {data.priceSubtitle}
              </Text>
            </Stack>

            <Flex gap={4} wrap="wrap">
              <Button>{data.addToCartLabel}</Button>
              <Button asChild variant="outline">
                <Link href={`/products/${data.slug}/customize`}>
                  {data.customizeLabel}
                </Link>
              </Button>
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </Stack>
  );
}
