"use client";

import { useEffect, useState } from "react";
import { PageShell } from "@/components/layout/page-shell";
import { EmptyState } from "@/components/ui/empty-state";
import { SectionHeader } from "@/components/ui/section-header";
import { ProductCard } from "@/features/products/components/product-card";
import { useCommerceStore } from "@/stores/commerce-store";

export default function WishlistPage() {
  const wishlist = useCommerceStore((state) => state.wishlist);
  const [mounted, setMounted] = useState(false);
  const products = mounted ? wishlist : [];

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <PageShell>
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Список"
          title="Избранное"
          description="Здесь собраны товары, которые вы отметили."
        />
        {products.length === 0 ? (
          <EmptyState title="Избранное пусто" description="Отметьте товары сердечком в каталоге." />
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
    </PageShell>
  );
}
