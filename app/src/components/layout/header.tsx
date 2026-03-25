"use client";

import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  useDisclosure,
  Stack,
  Container,
  Heading,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import { CartIconButton } from "@/components/cart/cart-icon-button";
import { hasArticlesContent } from "@/data/loaders/articles";
import { getNavigationLinks } from "@/data/navigation-links";
import { brandData } from "@/data/brand";

const NavLink = ({
  label,
  href,
  onClick,
}: {
  label: string;
  href: string;
  onClick?: () => void;
}) => (
  <Link
    as={NextLink}
    px={3}
    py={2}
    rounded="md"
    _hover={{ textDecoration: "none", bg: "gray.500" }}
    href={href}
    onClick={onClick}
  >
    {label}
  </Link>
);

export default function Header() {
  const { open, onOpen, onClose } = useDisclosure();
  const navigationLinks = getNavigationLinks(hasArticlesContent());

  return (
    <Box bg="layoutBg">
      <Container py={4}>
        <Flex h={16} alignItems="center" justifyContent="space-between">
          <Link href="/">
            <Heading fontWeight="bold" fontSize="2xl">
              {brandData.name}
            </Heading>
          </Link>

          <HStack padding={0} alignItems="center">
            <HStack as="nav" padding={2} display={{ base: "none", md: "flex" }}>
              {navigationLinks.map((link) => (
                <NavLink key={link.href} {...link} />
              ))}
            </HStack>

            <CartIconButton />
            <IconButton
              margin={3}
              size="md"
              aria-label="Open Menu"
              display={{ md: "none" }}
              onClick={open ? onClose : onOpen}
            >
              <GiHamburgerMenu />
            </IconButton>
          </HStack>
        </Flex>

        {open ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as="nav" padding={2}>
              {navigationLinks.map((link) => (
                <NavLink key={link.href} {...link} onClick={onClose} />
              ))}
            </Stack>
          </Box>
        ) : null}
      </Container>
    </Box>
  );
}
