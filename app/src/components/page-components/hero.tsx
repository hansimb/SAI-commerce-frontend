import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  Stack,
  Image,
} from "@chakra-ui/react";
import { brandData } from "@/data/brand";

interface HeroProps {
  backgroundImage?: string;
  title?: string;
  subtitle?: string;
  ctaText?: string;
  onCtaClick?: () => void;
}

export const Hero = ({
  backgroundImage = "/hero-bg.jpg",
  title = brandData.name,
  subtitle = brandData.slogan,
  ctaText = "Shop Now",
  onCtaClick,
}: HeroProps) => {
  return (
    <Box
      position="relative"
      height="500px"
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
          <Heading as="h1" size="2xl" fontWeight="bold" letterSpacing="tight">
            {title}
          </Heading>

          <Text fontSize="xl" fontWeight="light" opacity={0.9}>
            {subtitle}
          </Text>

          <Stack direction="row" padding={4} justify="center">
            <Button
              size="lg"
              bg="whiteAlpha.900"
              color="gray.900"
              _hover={{ bg: "white" }}
              fontWeight="bold"
              onClick={onCtaClick}
            >
              {ctaText}
            </Button>
            <Button
              size="lg"
              variant="outline"
              color="white"
              borderColor="white"
              _hover={{ bg: "whiteAlpha.200" }}
              fontWeight="bold"
            >
              Learn More
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};
