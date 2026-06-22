"use client";

import Link from "next/link";
import { GitCompare, Heart, ShoppingBag, Star } from "lucide-react";
import type { ProductDto } from "@flux/shared";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatPrice } from "@/lib/format";
import { useCommerceStore } from "@/stores/commerce-store";
import { toast } from "sonner";

type ProductCardProps = {
  product: ProductDto;
};

export function ProductCard({ product }: ProductCardProps) {
  const addToCart = useCommerceStore((state) => state.addToCart);
  const toggleWishlist = useCommerceStore((state) => state.toggleWishlist);
  const toggleCompare = useCommerceStore((state) => state.toggleCompare);
  const isWishlisted = useCommerceStore((state) =>
    state.wishlist.some((item) => item.id === product.id),
  );
  const isCompared = useCommerceStore((state) =>
    state.compare.some((item) => item.id === product.id),
  );

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} добавлен в корзину`);
  };

  const handleToggleWishlist = () => {
    toggleWishlist(product);
    toast.success(isWishlisted ? "Удалено из избранного" : "Добавлено в избранное");
  };

  const handleToggleCompare = () => {
    toggleCompare(product);
    toast.success(isCompared ? "Удалено из сравнения" : "Добавлено к сравнению");
  };

  return (
    <Card className="group flex h-full flex-col overflow-hidden p-4">
      <Link href={`/products/${product.slug}`} className="block">
        <div
          className="relative mb-5 h-56 overflow-hidden rounded-[1.25rem] border border-white/10"
          style={{ background: product.image }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,.38),transparent_45%)]" />
          {product.badge ? <Badge className="absolute left-4 top-4">{product.badge}</Badge> : null}
          <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/15 bg-black/25 p-4 backdrop-blur-xl">
            <p className="text-sm text-white/70">{product.brand}</p>
            <h3 className="font-display mt-1 text-xl font-semibold text-white">{product.name}</h3>
          </div>
        </div>
      </Link>

      <div className="flex flex-1 flex-col">
        <div className="flex items-center gap-2 text-sm text-flux-muted">
          <Star className="h-4 w-4 fill-flux-purple text-flux-purple" />
          <span>{product.rating}</span>
          <span>({product.reviewCount})</span>
          <span className="ml-auto">{product.stock > 0 ? "В наличии" : "Нет в наличии"}</span>
        </div>

        <p className="mt-3 line-clamp-2 text-sm leading-6 text-flux-muted">{product.description}</p>

        <div className="mt-4 flex items-end gap-3">
          <strong className="font-accent text-2xl text-white">{formatPrice(product.price)}</strong>
          {product.oldPrice ? (
            <span className="text-sm text-flux-muted line-through">{formatPrice(product.oldPrice)}</span>
          ) : null}
        </div>

        <div className="mt-5 grid grid-cols-[1fr_auto_auto] gap-2">
          <Button type="button" onClick={handleAddToCart} className="gap-2">
            <ShoppingBag className="h-4 w-4" />
            В корзину
          </Button>
          <Button
            type="button"
            variant="secondary"
            className={isWishlisted ? "w-11 border-flux-pink/70 bg-flux-pink/20 px-0 text-white" : "w-11 px-0"}
            onClick={handleToggleWishlist}
            aria-label={isWishlisted ? "Удалить из избранного" : "Добавить в избранное"}
          >
            <Heart className={isWishlisted ? "h-4 w-4 fill-flux-pink text-flux-pink" : "h-4 w-4"} />
          </Button>
          <Button
            type="button"
            variant="secondary"
            className={isCompared ? "w-11 border-flux-purple/70 bg-flux-purple/20 px-0 text-white" : "w-11 px-0"}
            onClick={handleToggleCompare}
            aria-label={isCompared ? "Удалить из сравнения" : "Добавить к сравнению"}
          >
            <GitCompare className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
