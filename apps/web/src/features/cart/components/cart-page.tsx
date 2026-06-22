"use client";

import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { formatPrice } from "@/lib/format";
import { useCommerceStore } from "@/stores/commerce-store";

export function CartPage() {
  const cart = useCommerceStore((state) => state.cart);
  const addToCart = useCommerceStore((state) => state.addToCart);
  const updateQuantity = useCommerceStore((state) => state.updateQuantity);
  const removeFromCart = useCommerceStore((state) => state.removeFromCart);
  const [mounted, setMounted] = useState(false);
  const items = mounted ? cart : [];
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discount = Math.round(subtotal * 0.07);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <PageShell>
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <h1 className="font-display text-5xl font-semibold text-white">Корзина</h1>
        {items.length === 0 ? (
          <EmptyState title="Корзина пуста" description="Добавьте товары из каталога." />
        ) : (
          <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px]">
            <div className="grid gap-4">
              {items.map(({ product, quantity }) => (
                <Card key={product.id} className="grid gap-4 md:grid-cols-[160px_1fr_auto]">
                  <div className="h-36 rounded-3xl" style={{ background: product.image }} />
                  <div>
                    <p className="text-sm text-flux-muted">{product.brand}</p>
                    <h2 className="font-display mt-1 text-2xl font-semibold text-white">{product.name}</h2>
                    <p className="mt-2 text-flux-muted">{formatPrice(product.price)}</p>
                    <div className="mt-4 flex items-center gap-2">
                      <Button variant="secondary" className="h-9 w-9 px-0" onClick={() => updateQuantity(product.id, quantity - 1)}>
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-10 text-center text-white">{quantity}</span>
                      <Button variant="secondary" className="h-9 w-9 px-0" onClick={() => addToCart(product)}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <Button variant="ghost" className="h-10 w-10 px-0" onClick={() => removeFromCart(product.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </Card>
              ))}
            </div>
            <Card className="h-fit">
              <h2 className="font-display text-2xl font-semibold text-white">Итого</h2>
              <div className="mt-5 grid gap-3 text-sm">
                <div className="flex justify-between text-flux-muted">
                  <span>Товары</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-flux-muted">
                  <span>Скидка по промокоду «FLUX7»</span>
                  <span>-{formatPrice(discount)}</span>
                </div>
                <div className="flex justify-between border-t border-white/10 pt-4 text-xl font-semibold text-white">
                  <span>К оплате</span>
                  <span>{formatPrice(subtotal - discount)}</span>
                </div>
              </div>
              <Link
                href="/checkout"
                className="mt-6 block w-full rounded-full bg-gradient-to-r from-flux-purple via-flux-pink to-flux-violet px-5 py-3 text-center text-sm font-medium text-white shadow-flux-glow transition hover:scale-[1.02]"
              >
                Перейти к оформлению
              </Link>
            </Card>
          </div>
        )}
      </main>
    </PageShell>
  );
}
