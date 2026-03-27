"use client";

import { Button } from "@chakra-ui/react";
import { useCart } from "@/components/cart/cart-provider";
import { shouldShowCart } from "@/data/source";

interface AddToCartButtonProps {
  slug: string;
  title: string;
  price: string;
  imageUrl: string;
  label: string;
}

export function AddToCartButton({
  slug,
  title,
  price,
  imageUrl,
  label,
}: AddToCartButtonProps) {
  const { addItem } = useCart();

  if (!shouldShowCart()) {
    return null;
  }

  return (
    <Button
      onClick={() =>
        addItem({
          slug,
          title,
          price,
          imageUrl,
        })
      }
    >
      {label}
    </Button>
  );
}
