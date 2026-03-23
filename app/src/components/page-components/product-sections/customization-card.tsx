import { Box, Heading, Image, Stack, Text } from "@chakra-ui/react";
import type { ProductCustomizationCardData } from "@/types/products";

interface CustomizationCardProps {
  section: ProductCustomizationCardData;
}

export function CustomizationCard({
  section,
}: CustomizationCardProps) {
  return (
    <Box borderWidth="1px" rounded="3xl" p={{ base: 6, md: 8 }} overflow="hidden">
      <Box position="relative" minH={{ base: "auto", xl: "600px" }}>
        <Stack
          gap={4}
          maxW={{ base: "full", xl: "sm" }}
          position={{ base: "static", xl: "absolute" }}
          top="8"
          left="8"
          zIndex="1"
          mb={{ base: 8, xl: 0 }}
        >
          <Heading as="h2" size="2xl">
            {section.title}
          </Heading>

          {section.optionGroups.map((group) => (
            <Box key={group.title} borderWidth="1px" rounded="2xl" p={5}>
              <Stack gap={4}>
                <Text fontWeight="semibold">{group.title}</Text>
                <Stack gap={3} align="start">
                  {group.options.map((option) => (
                    <Box
                      key={option.label}
                      borderWidth="1px"
                      rounded="full"
                      px={4}
                      py={2}
                      borderColor={option.active ? "accentBright" : undefined}
                    >
                      <Text fontSize="sm">{option.label}</Text>
                    </Box>
                  ))}
                </Stack>
              </Stack>
            </Box>
          ))}
        </Stack>

        <Box
          pl={{ base: 0, xl: "380px" }}
          minH={{ base: "320px", md: "520px" }}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Image
            src={section.image.src}
            alt={section.image.alt}
            w="full"
            h="full"
            maxH={{ base: "320px", md: "560px" }}
            objectFit="contain"
          />
        </Box>
      </Box>
    </Box>
  );
}
