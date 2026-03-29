"use client";

import { Circle, Icon, IconButton, Text } from "@chakra-ui/react";
import { LuShoppingCart } from "react-icons/lu";
import { useCart } from "@/components/cart/cart-provider";

export function CartIconButton() {
  const { itemCount, openCart } = useCart();

  if (itemCount === 0) {
    return null;
  }

  return (
    <IconButton
      aria-label="Open cart"
      variant="outline"
      position="relative"
      onClick={openCart}
    >
      <Icon as={LuShoppingCart} boxSize="5" />
      {itemCount > 0 ? (
        <Circle
          size="5"
          bg="accent"
          color="black"
          position="absolute"
          top="-2"
          right="-2"
        >
          <Text fontSize="xs" fontWeight="bold">
            {itemCount}
          </Text>
        </Circle>
      ) : null}
    </IconButton>
  );
}
