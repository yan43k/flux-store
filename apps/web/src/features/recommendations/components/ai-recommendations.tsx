import { BrainCircuit } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ProductCard } from "@/features/products/components/product-card";
import { demoProducts } from "@/features/products/data/demo-products";

const reasons = [
  "часто покупают вместе",
  "похоже на ваши просмотры",
  "лучшее в категории",
];

export function AiRecommendations() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <Card className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <Badge>Умная подборка</Badge>
          <h2 className="font-display mt-3 text-3xl font-semibold text-white">Вам может подойти</h2>
          <p className="mt-2 text-flux-muted">
            Мы отбираем товары по отзывам, популярности и удачному сочетанию цены и качества, чтобы
            быстрее показать подходящие варианты.
          </p>
        </div>
        <BrainCircuit className="h-12 w-12 text-flux-purple" />
      </Card>
      <div className="grid gap-5 md:grid-cols-3">
        {demoProducts.slice(0, 3).map((product, index) => (
          <div key={product.id} className="relative">
            <Badge className="absolute right-4 top-4 z-10">{reasons[index]}</Badge>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}
