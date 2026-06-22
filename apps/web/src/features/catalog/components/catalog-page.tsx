"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { PageShell } from "@/components/layout/page-shell";
import { Card } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/section-header";
import { ProductCard } from "@/features/products/components/product-card";
import { categories, demoProducts } from "@/features/products/data/demo-products";

const categoryNameBySlug = Object.fromEntries(categories.map((c) => [c.slug, c.name]));

function productSearchHaystack(product: (typeof demoProducts)[number]) {
  const categoryName = categoryNameBySlug[product.categorySlug] ?? product.categorySlug;
  const specText = Object.entries(product.specs)
    .flat()
    .join(" ");
  return `${product.name} ${product.brand} ${product.slug} ${product.description} ${categoryName} ${specText}`.toLowerCase();
}

export function CatalogPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const qParam = searchParams.get("q") ?? "";

  const [query, setQuery] = useState(qParam);

  useEffect(() => {
    setQuery(qParam);
  }, [qParam]);

  useEffect(() => {
    const trimmed = query.trim();
    const trimmedParam = qParam.trim();
    if (trimmed === trimmedParam) {
      return;
    }

    const id = window.setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (trimmed) {
        params.set("q", trimmed);
      } else {
        params.delete("q");
      }
      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    }, 350);

    return () => window.clearTimeout(id);
  }, [query, qParam, pathname, router, searchParams]);

  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("popular");

  const products = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const filtered = demoProducts.filter((product) => {
      const matchesCategory = category === "all" || product.categorySlug === category;
      const matchesQuery =
        needle.length === 0 || productSearchHaystack(product).includes(needle);
      return matchesCategory && matchesQuery;
    });

    return filtered.sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "rating") return b.rating - a.rating;
      return b.reviewCount - a.reviewCount;
    });
  }, [category, query, sort]);

  return (
    <PageShell>
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Каталог"
          title="Вся техника в одном месте"
          description="Поиск по названию, бренду, описанию и характеристикам. Можно искать из строки в шапке сайта."
        />

        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          <Card className="h-fit">
            <h2 className="font-display text-xl font-semibold text-white">Фильтры</h2>
            <label className="mt-5 block text-sm text-flux-muted">
              Поиск
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Например: телефон, видеокарта, наушники…"
                className="mt-2 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none transition focus:border-flux-purple"
              />
            </label>
            <label className="mt-5 block text-sm text-flux-muted">
              Категория
              <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none transition focus:border-flux-purple"
              >
                <option value="all">Все категории</option>
                {categories.map((item) => (
                  <option key={item.slug} value={item.slug}>
                    {item.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="mt-5 block text-sm text-flux-muted">
              Сортировка
              <select
                value={sort}
                onChange={(event) => setSort(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none transition focus:border-flux-purple"
              >
                <option value="popular">Популярные</option>
                <option value="price-asc">Цена по возрастанию</option>
                <option value="price-desc">Цена по убыванию</option>
                <option value="rating">Рейтинг</option>
              </select>
            </label>
          </Card>

          <div>
            <div className="mb-5 flex items-center justify-between text-sm text-flux-muted">
              <span>Найдено товаров: {products.length}</span>
              <span>Страница 1 из 1</span>
            </div>
            {products.length === 0 ? (
              <Card className="py-16 text-center">
                <p className="text-lg text-white">Ничего не нашлось</p>
                <p className="mt-2 text-flux-muted">
                  Попробуйте другой запрос или сбросьте категорию «Все категории».
                </p>
              </Card>
            ) : (
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </PageShell>
  );
}
