import {
  Box,
  Container,
  Text,
  Flex,
  Spacer,
  Separator,
  Stack,
} from "@chakra-ui/react";
import { brandData } from "@/data/brand";
import { footerLabels } from "@/data/footer";
import { getFooterData } from "@/data/loaders/footer";
import Link from "next/link";

export default function Footer() {
  const footerData = getFooterData();

  return (
    <Box bg="layoutBg">
      <Flex gap={5} align="center" padding={10}>
        <Container>
          <Stack direction={{ base: "column", md: "row" }} gap="10">
            {/* Branding box: */}
            <Box h="5">Branding mock box</Box>
            <Spacer />

            {/* Link boxes: */}
            {footerData.linkGroups.map((linkBox) => (
              <Stack key={linkBox.title} flex={"1"}>
                <Text fontWeight="bold">{linkBox.title}</Text>

                {linkBox.links.map((link) => (
                  <Link key={link.label} href={link.href}>
                    {link.label}
                  </Link>
                ))}
              </Stack>
            ))}

            {/* Contact box: */}
            <Stack flex={"1"}>
              <Text fontWeight="bold">{footerLabels.contact}</Text>

              {footerData.contactItems.map((item) => (
                <Text key={item.label}>{item.value}</Text>
              ))}
            </Stack>
          </Stack>

          <Separator mt={10} />
          <Text pt={8} textAlign="center">
            © {new Date().getFullYear()} {brandData.name} <br />
            All rights reserved.
          </Text>
        </Container>
      </Flex>
    </Box>
  );
}
