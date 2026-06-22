"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { ProductDto } from "@flux/shared";

type CartItem = {
  product: ProductDto;
  quantity: number;
};

type CommerceState = {
  cart: CartItem[];
  wishlist: ProductDto[];
  compare: ProductDto[];
  addToCart: (product: ProductDto) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  toggleWishlist: (product: ProductDto) => void;
  toggleCompare: (product: ProductDto) => void;
};

export const useCommerceStore = create<CommerceState>()(
  persist(
    (set) => ({
      cart: [],
      wishlist: [],
      compare: [],
      addToCart: (product) =>
        set((state) => {
          const existing = state.cart.find((item) => item.product.id === product.id);

          if (existing) {
            return {
              cart: state.cart.map((item) =>
                item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
              ),
            };
          }

          return { cart: [...state.cart, { product, quantity: 1 }] };
        }),
      updateQuantity: (productId, quantity) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.product.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item,
          ),
        })),
      removeFromCart: (productId) =>
        set((state) => ({ cart: state.cart.filter((item) => item.product.id !== productId) })),
      clearCart: () => set({ cart: [] }),
      toggleWishlist: (product) =>
        set((state) => ({
          wishlist: state.wishlist.some((item) => item.id === product.id)
            ? state.wishlist.filter((item) => item.id !== product.id)
            : [...state.wishlist, product],
        })),
      toggleCompare: (product) =>
        set((state) => ({
          compare: state.compare.some((item) => item.id === product.id)
            ? state.compare.filter((item) => item.id !== product.id)
            : state.compare.length >= 4
              ? [...state.compare.slice(1), product]
              : [...state.compare, product],
        })),
    }),
    {
      name: "flux-commerce",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        cart: state.cart,
        wishlist: state.wishlist,
        compare: state.compare,
      }),
    },
  ),
);

