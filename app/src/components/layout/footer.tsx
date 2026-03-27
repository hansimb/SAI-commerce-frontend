import {
  Box,
  Container,
  Text,
  Flex,
  Spacer,
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
          <Stack direction={{ base: "column", md: "row" }} gap="10">
            <Stack flex="1" gap={4} maxW="320px">
              <Flex align="center" gap={4}>
                <Box>
                  {brand.logoHorizontal ? (
                    <Image
                      src={brand.logoHorizontal}
                      alt={brand.name}
                      h="40px"
                      w="auto"
                      objectFit="contain"
                      mb={3}
                    />
                  ) : null}
                  <Text fontWeight="bold">{brand.name}</Text>
                  <Text fontSize="sm" color="fgMuted">
                    {brand.slogan}
                  </Text>
                </Box>
              </Flex>
            </Stack>
            <Spacer />

            {footerData.linkGroups.map((linkBox) => (
              <Stack key={linkBox.title} flex="1">
                <Text fontWeight="bold">{linkBox.title}</Text>

                {linkBox.links.map((link) => (
                  <Link key={link.label} href={link.href}>
                    {link.label}
                  </Link>
                ))}
              </Stack>
            ))}

            <Stack flex="1">
              <Text fontWeight="bold">{footerLabels.contact}</Text>

              {footerData.contactItems.map((item) => (
                <Text key={item.label}>{item.value}</Text>
              ))}
            </Stack>
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
