"use client";
import {
  Box,
  Button,
  Container,
  Heading,
  Link as ChakraLink,
  Stack,
  Text,
} from "@chakra-ui/react";
import { brandData } from "@/data/brand";
import Link from "next/link";

interface HeroProps {
  backgroundImage?: string;
  title?: string;
  subtitle?: string;
  primaryCtaText?: string;
  primaryCtaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
}

export const Hero = ({
  backgroundImage = "/hero-bg.jpg",
  title = brandData.name,
  subtitle = brandData.slogan,
  primaryCtaText = "View products",
  primaryCtaHref = "/products",
  secondaryCtaText = "Read articles",
  secondaryCtaHref = "/articles",
}: HeroProps) => {
  return (
    <Box
      position="relative"
      height="600px"
      backgroundImage={`url(${backgroundImage})`}
      backgroundSize="cover"
      backgroundPosition="center"
      overflow="hidden"
    >
      {/* Overlay */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bg="blackAlpha.500"
      />

      {/* Content */}
      <Container
        maxW="container.xl"
        height="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
        position="relative"
        zIndex={1}
      >
        <Stack padding={6} textAlign="center" color="white" maxW="800px">
          <Heading as="h1" size="4xl" fontWeight="bold" letterSpacing="tight">
            {title}
          </Heading>

          <Text fontSize="xl" fontWeight="light" opacity={0.9}>
            {subtitle}
          </Text>

          <Stack direction="row" padding={4} justify="center">
            <Button
              asChild
              size="lg"
              bg="whiteAlpha.900"
              color="gray.900"
              _hover={{ bg: "white" }}
              fontWeight="bold"
            >
              <ChakraLink as={Link} href={primaryCtaHref}>
                {primaryCtaText}
              </ChakraLink>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              color="white"
              borderColor="white"
              _hover={{ bg: "whiteAlpha.200" }}
              fontWeight="bold"
            >
              <ChakraLink as={Link} href={secondaryCtaHref}>
                {secondaryCtaText}
              </ChakraLink>
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};
