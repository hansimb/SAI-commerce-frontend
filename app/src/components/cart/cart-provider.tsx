"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export interface CartItem {
  slug: string;
  title: string;
  price: string;
  imageUrl: string;
  quantity: number;
}

interface AddCartItemInput {
  slug: string;
  title: string;
  price: string;
  imageUrl: string;
}

interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: AddCartItemInput) => void;
  removeItem: (slug: string) => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      itemCount: items.reduce((total, item) => total + item.quantity, 0),
      isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      addItem: (item) => {
        setItems((currentItems) => {
          const existingItem = currentItems.find(
            (currentItem) => currentItem.slug === item.slug,
          );

          if (!existingItem) {
            return [...currentItems, { ...item, quantity: 1 }];
          }

          return currentItems.map((currentItem) =>
            currentItem.slug === item.slug
              ? { ...currentItem, quantity: currentItem.quantity + 1 }
              : currentItem,
          );
        });

        setIsOpen(true);
      },
      removeItem: (slug) => {
        setItems((currentItems) =>
          currentItems.filter((item) => item.slug !== slug),
        );
      },
    }),
    [isOpen, items],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
}
