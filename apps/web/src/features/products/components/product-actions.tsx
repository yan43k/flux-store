"use client";

import { GitCompare, Heart, ShoppingBag } from "lucide-react";
import type { ProductDto } from "@flux/shared";
import { Button } from "@/components/ui/button";
import { useCommerceStore } from "@/stores/commerce-store";
import { toast } from "sonner";

type ProductActionsProps = {
  product: ProductDto;
};

export function ProductActions({ product }: ProductActionsProps) {
  const addToCart = useCommerceStore((state) => state.addToCart);
  const toggleWishlist = useCommerceStore((state) => state.toggleWishlist);
  const toggleCompare = useCommerceStore((state) => state.toggleCompare);
  const isWishlisted = useCommerceStore((state) =>
    state.wishlist.some((item) => item.id === product.id),
  );
  const isCompared = useCommerceStore((state) =>
    state.compare.some((item) => item.id === product.id),
  );

  return (
    <div className="mt-8 grid gap-3">
      <Button
        type="button"
        className="gap-2"
        onClick={() => {
          addToCart(product);
          toast.success(`${product.name} добавлен в корзину`);
        }}
      >
        <ShoppingBag className="h-4 w-4" />
        Добавить в корзину
      </Button>
      <Button
        type="button"
        variant="secondary"
        className={isWishlisted ? "border-flux-pink/70 bg-flux-pink/20 text-white" : undefined}
        onClick={() => {
          toggleWishlist(product);
          toast.success(isWishlisted ? "Удалено из избранного" : "Добавлено в избранное");
        }}
      >
        <Heart className={isWishlisted ? "h-4 w-4 fill-flux-pink text-flux-pink" : "h-4 w-4"} />
        {isWishlisted ? "В избранном" : "Добавить в избранное"}
      </Button>
      <Button
        type="button"
        variant="secondary"
        className={isCompared ? "border-flux-purple/70 bg-flux-purple/20 text-white" : undefined}
        onClick={() => {
          toggleCompare(product);
          toast.success(isCompared ? "Удалено из сравнения" : "Добавлено к сравнению");
        }}
      >
        <GitCompare className="h-4 w-4" />
        {isCompared ? "В сравнении" : "Добавить к сравнению"}
      </Button>
    </div>
  );
}
