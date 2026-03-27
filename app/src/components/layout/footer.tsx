import {
  Box,
  Container,
  Text,
  Flex,
  Separator,
  Stack,
  Image,
} from "@chakra-ui/react";
import type { BrandData } from "@/data/brand";
import { footerLabels } from "@/data/footer";
import { getFooterData } from "@/data/loaders/footer";
import Link from "next/link";

interface FooterProps {
  brand: BrandData;
}

export default async function Footer({ brand }: FooterProps) {
  const footerData = await getFooterData();

  return (
    <Box bg="layoutBg">
      <Flex gap={5} align="center" padding={10}>
        <Container>
          <Stack direction={{ base: "column", md: "row" }} gap={12}>
            <Stack gap={4} align={{ base: "center", md: "stretch" }}>
              <Flex justify="center">
                <Box textAlign="center">
                  {brand.logoHorizontal ? (
                    <Image
                      src={brand.logoHorizontal}
                      alt={brand.name}
                      h="80px"
                      w="auto"
                      mx="auto"
                      objectFit="contain"
                      mb={2}
                    />
                  ) : null}
                  <Text fontWeight="bold">{brand.name}</Text>
                  <Text fontSize="sm" color="fgMuted">
                    {brand.slogan}
                  </Text>
                </Box>
              </Flex>
            </Stack>
            <Box width="48px" />

            <Flex
              direction={{ base: "column", md: "row" }}
              gap={8}
              flex="1"
              justify="space-between"
            >
              {footerData.linkGroups.map((linkBox) => (
                <Stack key={linkBox.title} gap={3}>
                  <Text fontWeight="bold">{linkBox.title}</Text>

                  {linkBox.links.map((link) => (
                    <Link key={link.label} href={link.href}>
                      {link.label}
                    </Link>
                  ))}
                </Stack>
              ))}

              <Stack gap={3}>
                <Text fontWeight="bold">{footerLabels.contact}</Text>

                {footerData.contactItems.map((item) => (
                  <Text key={item.label}>{item.value}</Text>
                ))}
              </Stack>
            </Flex>
          </Stack>

          <Separator mt={10} />
          <Text pt={8} textAlign="center">
            © Copyright {new Date().getFullYear()} {brand.name}
          </Text>
        </Container>
      </Flex>
    </Box>
  );
}
