"use client";

import { useEffect, useState } from "react";
import { PageShell } from "@/components/layout/page-shell";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { SectionHeader } from "@/components/ui/section-header";
import { formatPrice } from "@/lib/format";
import { useCommerceStore } from "@/stores/commerce-store";

export default function ComparePage() {
  const compare = useCommerceStore((state) => state.compare);
  const [mounted, setMounted] = useState(false);
  const products = mounted ? compare : [];
  const specKeys = Array.from(new Set(products.flatMap((product) => Object.keys(product.specs))));

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <PageShell>
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Сравнение"
          title="Сравните товары рядом"
          description="Таблица показывает бренд, рейтинг, остаток и основные параметры — так проще выбрать."
        />
        {products.length === 0 ? (
          <EmptyState
            title="Сравнение пусто"
            description="Добавьте товары к сравнению кнопкой рядом с карточкой товара."
          />
        ) : (
          <Card className="overflow-x-auto">
            <table className="w-full min-w-[760px] border-collapse text-left">
              <thead>
                <tr>
                  <th className="p-4 text-flux-muted">Характеристика</th>
                  {products.map((product) => (
                    <th key={product.id} className="p-4 text-white">
                      {product.name}
                      <p className="mt-1 text-sm text-flux-purple">{formatPrice(product.price)}</p>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {["Бренд", "Рейтинг", "На складе", ...specKeys].map((key) => (
                  <tr key={key} className="border-t border-white/10">
                    <td className="p-4 text-flux-muted">{key}</td>
                    {products.map((product) => (
                      <td key={product.id} className="p-4 text-white">
                        {key === "Бренд"
                          ? product.brand
                          : key === "Рейтинг"
                            ? product.rating
                            : key === "На складе"
                              ? product.stock
                              : product.specs[key] ?? "—"}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        )}
      </main>
    </PageShell>
  );
}
