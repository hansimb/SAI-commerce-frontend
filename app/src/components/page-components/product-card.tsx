"use client";

import {
  Box,
  Flex,
  Heading,
  Image,
  Text,
  Button,
  Stack,
  Link as ChakraLink,
} from "@chakra-ui/react";
import Link from "next/link";
import { ProductSpecsList } from "@/components/page-components/product-details/product-specs-list";
import type { ProductSummary } from "@/types/products";

interface ProductCardProps {
  data: ProductSummary;
}

export const ProductCard = ({ data }: ProductCardProps) => {
  return (
    <Box as="section" py={10}>
      <Flex direction={{ base: "column", md: "row" }} gap={8}>
        <Box flex="1" p={6} rounded="lg">
          <Image
            src={data.image.src}
            alt={data.title}
            w="full"
            h="auto"
            rounded="md"
          />
        </Box>

        <Box flex="1" p={6}>
          {data.categoryLabel ? (
            <Text
              textTransform="uppercase"
              fontSize="sm"
              fontWeight="semibold"
              letterSpacing="wide"
              mb={3}
              color={"accentBright"}
            >
              {data.categoryLabel}
            </Text>
          ) : null}

          <Heading as="h2" size="2xl" mb={2}>
            {data.title}
          </Heading>

          {data.subtitle ? (
            <Text fontSize="lg" fontStyle="italic" mb={4}>
              {data.subtitle}
            </Text>
          ) : null}

          {data.description ? <Text mb={6}>{data.description}</Text> : null}

          {data.specs.length > 0 ? (
            <Box mb={6}>
              <ProductSpecsList specs={data.specs} />
            </Box>
          ) : null}

          <Text
            fontSize="sm"
            textTransform="uppercase"
            letterSpacing="wide"
            mb={2}
          >
            Starting at
          </Text>
          <Flex gap="4" justify="space-between">
            <Stack>
              <Heading as="h3" size="xl" mb={1}>
                {data.price}
              </Heading>

              <Text fontSize="sm" color="gray.400" mb={6}>
                {data.priceSubtitle}
              </Text>
            </Stack>
            {data.hasDetails ? (
              <Button asChild size="lg">
                <ChakraLink as={Link} href={`/products/${data.slug}`}>
                  View Details
                </ChakraLink>
              </Button>
            ) : null}
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};
