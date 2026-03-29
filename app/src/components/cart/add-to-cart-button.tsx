"use client";

import { Button } from "@chakra-ui/react";
import { useCart } from "@/components/cart/cart-provider";

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
