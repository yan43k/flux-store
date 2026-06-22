"use client";

import { PageShell } from "@/components/layout/page-shell";
import { Card } from "@/components/ui/card";
import { useAuthStore } from "@/stores/auth-store";

const demoOrders = [
  { id: "FLX-1024", status: "Доставлен", total: "89 990 ₽" },
  { id: "FLX-1025", status: "Собираем заказ", total: "24 990 ₽" },
];

export function AccountView() {
  const user = useAuthStore((state) => state.user);

  return (
    <PageShell>
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <h1 className="font-display text-5xl font-semibold text-white">Личный кабинет</h1>
        <p className="mt-3 text-flux-muted">
          Здесь отображаются ваши данные, сохранённые товары и история заказов.
        </p>
        <div className="mt-8 grid gap-6 lg:grid-cols-[320px_1fr]">
          <Card>
            <h2 className="font-display text-2xl font-semibold text-white">Мой профиль</h2>
            <p className="mt-3 text-lg text-white">{user?.name ?? "Гость"}</p>
            <p className="mt-1 text-sm text-flux-muted">{user?.email ?? "Войдите, чтобы увидеть почту"}</p>
            <p className="mt-4 text-sm text-flux-muted">
              Роль:{" "}
              {user?.role === "ADMIN"
                ? "администратор"
                : user
                  ? "покупатель"
                  : "не авторизован"}
            </p>
            <div className="mt-6 grid gap-2 text-sm text-flux-muted">
              <span>Имя и телефон можно обновить через поддержку</span>
              <span>Сохранённые товары — в разделе «Избранное»</span>
            </div>
          </Card>
          <Card>
            <h2 className="font-display text-2xl font-semibold text-white">Мои заказы</h2>
            <p className="mt-2 text-sm text-flux-muted">
              Последние покупки и текущие статусы доставки.
            </p>
            <div className="mt-5 grid gap-3">
              {demoOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex justify-between rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                  <span className="text-white">{order.id}</span>
                  <span className="text-flux-muted">{order.status}</span>
                  <span className="text-flux-purple">{order.total}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </main>
    </PageShell>
  );
}
