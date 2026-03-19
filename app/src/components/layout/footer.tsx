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
import { footerLinks } from "@/data/footer";
import Link from "next/link";
import { contactData } from "@/data/contact";

export default function Footer() {
  return (
    <Box bg="layoutBg">
      <Flex gap={5} align="center" padding={10}>
        <Container>
          <Stack direction={{ base: "column", md: "row" }} gap="10">
            {/* Branding box: */}
            <Box h="5">Branding mock box</Box>
            <Spacer />

            {/* Link boxes: */}
            {footerLinks.map((linkBox) => (
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
            {contactData.map((contactInfo) => (
              <Stack key={contactInfo.title} flex={"1"}>
                <Text fontWeight="bold">{contactInfo.title}</Text>

                {contactInfo.text.map((text) => (
                  <Text key={text.label}>{text.label}</Text>
                ))}
              </Stack>
            ))}
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
