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

export default function Footer() {
  return (
    <Box>
      <Flex gap={5} align={"center"} padding={10}>
        <Container>
          <Stack>
            <Stack direction={{ base: "column", md: "row" }} gap="10">
              <Box h="5">Branding box</Box>
              <Spacer />
              <Box h="5">Footer navigation 1</Box>
              <Spacer />
              <Box h="5">Footer navigation 2</Box>
              <Spacer />
              <Box h="5">Contact info</Box>
            </Stack>

            <Separator mt={5} />
            <Text pt={8} textAlign="center">
              © {new Date().getFullYear()} {brandData.name} <br />
              All rights reserved.
            </Text>
          </Stack>
        </Container>
      </Flex>
    </Box>
  );
}
