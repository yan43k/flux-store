"use client";

import { PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useCommerceStore } from "@/stores/commerce-store";
import { toast } from "sonner";

export default function CheckoutPage() {
  const clearCart = useCommerceStore((state) => state.clearCart);

  const submitOrder = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    clearCart();
    toast.success("Заказ оформлен. Мы свяжемся с вами для подтверждения.");
    event.currentTarget.reset();
  };

  return (
    <PageShell>
      <main className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
        <h1 className="font-display text-5xl font-semibold text-white">Оформление заказа</h1>
        <form onSubmit={submitOrder} className="mt-8 grid gap-6 lg:grid-cols-[1fr_340px]">
          <Card>
            <h2 className="font-display text-2xl font-semibold text-white">Данные покупателя</h2>
            <div className="mt-6 grid gap-4">
              {[
                { label: "Фамилия и имя", key: "name", type: "text" },
                { label: "Электронная почта", key: "email", type: "email" },
                { label: "Телефон", key: "phone", type: "tel" },
                { label: "Адрес доставки", key: "address", type: "text" },
              ].map((field) => (
                <label key={field.key} className="text-sm text-flux-muted">
                  {field.label}
                  <input
                    name={field.key}
                    type={field.type}
                    required
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none focus:border-flux-purple"
                  />
                </label>
              ))}
            </div>
          </Card>
          <Card className="h-fit">
            <h2 className="font-display text-2xl font-semibold text-white">Оплата</h2>
            <p className="mt-3 text-flux-muted">
              После подтверждения заказа менеджер свяжется с вами, уточнит детали доставки и предложит
              удобный способ оплаты.
            </p>
            <Button type="submit" className="mt-6 w-full">
              Подтвердить заказ
            </Button>
          </Card>
        </form>
      </main>
    </PageShell>
  );
}
