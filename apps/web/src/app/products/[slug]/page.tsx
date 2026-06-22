import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/page-shell";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ProductActions } from "@/features/products/components/product-actions";
import { ProductCard } from "@/features/products/components/product-card";
import { demoProducts } from "@/features/products/data/demo-products";
import { formatPrice } from "@/lib/format";
import { fetchAllProducts, fetchProductBySlug } from "@/lib/products-api";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  let product = await fetchProductBySlug(slug);

  if (!product) {
    product = demoProducts.find((item) => item.slug === slug) ?? null;
  }

  if (!product) {
    notFound();
  }

  const catalog = await fetchAllProducts().catch(() => demoProducts);
  const related = catalog.filter((item) => item.id !== product.id).slice(0, 3);

  return (
    <PageShell>
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_420px]">
          <Card className="overflow-hidden p-4">
            <div
              className="flex min-h-[520px] items-end rounded-[2rem] border border-white/10 p-8"
              style={{ background: product.image }}
            >
              <div className="w-full rounded-[1.5rem] border border-white/15 bg-black/30 p-6 backdrop-blur-2xl">
                <Badge>{product.badge ?? product.brand}</Badge>
                <h1 className="font-display mt-4 text-5xl font-semibold text-white">{product.name}</h1>
                <p className="mt-3 max-w-2xl text-purple-100/80">{product.description}</p>
              </div>
            </div>
          </Card>

          <Card>
            <p className="text-flux-muted">{product.brand}</p>
            <h2 className="font-display mt-2 text-3xl font-semibold text-white">{product.name}</h2>
            <p className="mt-4 text-flux-muted">
              Рейтинг {product.rating} на основе {product.reviewCount} отзывов. В наличии:{" "}
              {product.stock}.
            </p>
            <div className="mt-6 flex items-end gap-3">
              <strong className="font-accent text-4xl text-white">{formatPrice(product.price)}</strong>
              {product.oldPrice ? (
                <span className="text-flux-muted line-through">{formatPrice(product.oldPrice)}</span>
              ) : null}
            </div>
            <ProductActions product={product} />
          </Card>
        </div>

        <section className="mt-10 grid gap-6 lg:grid-cols-[1fr_1fr]">
          <Card>
            <h2 className="font-display text-2xl font-semibold text-white">Характеристики</h2>
            <div className="mt-5 grid gap-3">
              {Object.entries(product.specs).map(([key, value]) => (
                <div key={key} className="flex justify-between border-b border-white/10 pb-3 text-sm">
                  <span className="text-flux-muted">{key}</span>
                  <span className="text-white">{value}</span>
                </div>
              ))}
            </div>
          </Card>
          <Card>
            <h2 className="font-display text-2xl font-semibold text-white">Отзывы</h2>
            <p className="mt-4 text-flux-muted">
              Покупатели отмечают качество сборки, скорость работы и удобство повседневного использования.
              Подробные отзывы помогают быстрее выбрать подходящую модель.
            </p>
          </Card>
        </section>

        <section className="mt-16">
          <h2 className="font-display mb-6 text-3xl font-semibold text-white">Похожие товары</h2>
          <div className="grid gap-5 md:grid-cols-3">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      </main>
    </PageShell>
  );
}
