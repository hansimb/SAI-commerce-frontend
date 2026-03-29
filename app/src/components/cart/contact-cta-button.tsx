"use client";

import { Button, Link as ChakraLink } from "@chakra-ui/react";
import Link from "next/link";

interface ContactCtaButtonProps {
  label?: string;
}

export function ContactCtaButton({
  label = "Contact us",
}: ContactCtaButtonProps) {
  return (
    <Button asChild>
      <ChakraLink as={Link} href="/contact">
        {label}
      </ChakraLink>
    </Button>
  );
}
