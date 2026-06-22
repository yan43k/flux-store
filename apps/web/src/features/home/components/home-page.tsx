import Link from "next/link";
import { Cpu, ShieldCheck, Sparkles, Truck } from "lucide-react";
import { PageShell } from "@/components/layout/page-shell";
import { Badge } from "@/components/ui/badge";
import { buttonVariantClasses } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/section-header";
import { cn } from "@/lib/utils";
import { categories, demoProducts } from "@/features/products/data/demo-products";
import { ProductCard } from "@/features/products/components/product-card";
import { AiRecommendations } from "@/features/recommendations/components/ai-recommendations";

const benefits = [
  {
    icon: Sparkles,
    title: "Подборки для вас",
    text: "Система предлагает товары по категории, отзывам и популярности.",
  },
  {
    icon: Truck,
    title: "Доставка",
    text: "Оформите заказ онлайн — курьер привезёт в удобное время.",
  },
  {
    icon: ShieldCheck,
    title: "Гарантия",
    text: "На технику действует гарантия производителя и поддержка магазина.",
  },
  {
    icon: Cpu,
    title: "Понятные характеристики",
    text: "Каждый товар с открытым описанием — без лишних технических загадок.",
  },
];

export function HomePage() {
  return (
    <PageShell>
      <main>
        <section className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl items-center gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
          <div>
            <Badge>Премиум-электроника</Badge>
            <h1 className="font-display mt-6 max-w-4xl bg-gradient-to-r from-white via-purple-100 to-fuchsia-300 bg-clip-text text-5xl font-semibold tracking-tight text-transparent md:text-7xl">
              Магазин Flux: техника, которой удобно пользоваться.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-flux-muted">
              Смартфоны, ноутбуки, игровые компьютеры, наушники и аксессуары — всё на одном сайте.
              Крупные фото, понятные цены, корзина и личный кабинет.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/catalog"
                className={cn(
                  "inline-flex h-11 items-center justify-center rounded-full px-5 text-sm font-medium transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-flux-purple",
                  buttonVariantClasses.primary,
                )}
              >
                Смотреть каталог
              </Link>
              <Link
                href="/catalog"
                className={cn(
                  "inline-flex h-11 items-center justify-center rounded-full px-5 text-sm font-medium transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-flux-purple",
                  buttonVariantClasses.secondary,
                )}
              >
                Акции и новинки
              </Link>
            </div>
          </div>

          <Card className="relative overflow-hidden p-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_0%,rgba(236,72,153,.45),transparent_35%)]" />
            <div className="relative p-8">
              <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-flux-purple via-flux-pink to-flux-violet p-1">
                <div className="rounded-[1.8rem] bg-black/40 p-8 backdrop-blur-xl">
                  <p className="font-accent text-sm uppercase tracking-[0.28em] text-purple-100">
                    Хит недели
                  </p>
                  <h2 className="font-display mt-24 text-4xl font-semibold text-white">Flux Nova X1</h2>
                  <p className="mt-3 text-purple-100/90">
                    Новый смартфон линейки Flux: яркий экран, долго держит батарея, удобная камера.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Разделы"
            title="Разложено по полочкам"
            description="Выберите раздел — откроется каталог с фильтрами."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <Card key={category.slug}>
                <p className="font-display text-2xl font-semibold text-white">{category.name}</p>
                <p className="mt-2 text-flux-muted">Примерно {category.count} позиций</p>
              </Card>
            ))}
          </div>
        </section>

        <AiRecommendations />

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Популярное"
            title="Что покупают чаще всего"
            description="Отзывы, рейтинг, цена и кнопка «В корзину» — как в крупном магазине."
          />
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {demoProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-4 md:grid-cols-4">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <Card key={benefit.title}>
                  <Icon className="h-8 w-8 text-flux-purple" />
                  <h3 className="font-display mt-5 text-xl font-semibold text-white">{benefit.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-flux-muted">{benefit.text}</p>
                </Card>
              );
            })}
          </div>
        </section>
      </main>
    </PageShell>
  );
}
