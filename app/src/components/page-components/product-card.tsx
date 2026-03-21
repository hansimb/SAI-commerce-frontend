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

export interface ProductCardData {
  slug?: string;
  categoryLabel: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  price: string;
  priceSubtitle: string;
  specs: { label: string; value: string }[];
  ctaText: string;
}

interface ProductCardProps {
  data: ProductCardData;
}

export const ProductCard = ({ data }: ProductCardProps) => {
  return (
    <Box as="section" p={10}>
      <Flex direction={{ base: "column", md: "row" }} gap={8}>
        <Box flex="1" p={6} borderWidth="1px" rounded="lg">
          <Image
            src={data.imageUrl}
            alt={data.title}
            w="full"
            h="auto"
            rounded="md"
          />
        </Box>

        <Box flex="1" p={6}>
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

          <Heading as="h2" size="2xl" mb={2}>
            {data.title}
          </Heading>

          <Text fontSize="lg" fontStyle="italic" mb={4}>
            {data.subtitle}
          </Text>

          <Text mb={6}>{data.description}</Text>

          <Box borderWidth="1px" rounded="md" p={5} mb={6}>
            {data.specs.map((spec) => (
              <Flex key={spec.label} justify="space-between" py={2}>
                <Text fontSize="sm" color="gray.400">
                  {spec.label}
                </Text>
                <Text fontWeight="semibold">{spec.value}</Text>
              </Flex>
            ))}
          </Box>

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
            {data.slug ? (
              <Button asChild size="lg">
                <ChakraLink as={Link} href={`/products/${data.slug}`}>
                  {data.ctaText}
                </ChakraLink>
              </Button>
            ) : (
              <Button size="lg">{data.ctaText}</Button>
            )}
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};
