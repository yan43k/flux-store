"use client";

import type { ProductDto } from "@flux/shared";
import { BarChart3, Boxes, PackagePlus, ShoppingCart, Users } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AdminProductForm } from "@/features/admin/components/admin-product-form";
import { fetchAdminProducts } from "@/lib/products-api";
import { formatPrice } from "@/lib/format";
import { useAuthStore } from "@/stores/auth-store";

const stats = [
  { label: "Выручка (оценка)", value: "4,8 млн ₽", icon: BarChart3 },
  { label: "Заказы", value: "1 284", icon: ShoppingCart },
  { label: "Покупатели", value: "18 420", icon: Users },
  { label: "Товаров (SKU)", value: "642", icon: Boxes },
];

const orders = [
  { id: "FLX-2031", user: "Мария", status: "Оплачен", total: "159 990 ₽" },
  { id: "FLX-2032", user: "Алексей", status: "В обработке", total: "249 990 ₽" },
  { id: "FLX-2033", user: "Ирина", status: "Доставлен", total: "89 990 ₽" },
];

export function AdminDashboard() {
  const router = useRouter();
  const accessToken = useAuthStore((state) => state.accessToken);
  const [products, setProducts] = useState<ProductDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductDto | null>(null);

  const loadProducts = useCallback(async () => {
    if (!accessToken) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      setProducts(await fetchAdminProducts());
    } catch (loadError) {
      const message =
        loadError instanceof Error ? loadError.message : "Не удалось загрузить товары.";
      setError(message);

      if (message.includes("Сессия истекла") || message.includes("Нужно войти")) {
        router.replace("/login?next=/admin");
      }
    } finally {
      setLoading(false);
    }
  }, [accessToken, router]);

  useEffect(() => {
    void loadProducts();
  }, [loadProducts]);

  function openCreateForm() {
    setEditingProduct(null);
    setFormOpen(true);
  }

  function openEditForm(product: ProductDto) {
    setEditingProduct(product);
    setFormOpen(true);
  }

  function closeForm() {
    setFormOpen(false);
    setEditingProduct(null);
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="font-accent text-sm uppercase tracking-[0.28em] text-flux-purple">
            Админ-панель
          </p>
          <h1 className="font-display mt-2 text-5xl font-semibold text-white">Панель управления Flux</h1>
          <p className="mt-2 text-flux-muted">
            Отдельный раздел для сотрудников. Покупатели его не видят в меню.
          </p>
        </div>
        <Button className="gap-2" type="button" onClick={openCreateForm}>
          <PackagePlus className="h-4 w-4" />
          Добавить товар
        </Button>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label}>
              <Icon className="h-7 w-7 text-flux-purple" />
              <p className="mt-5 text-sm text-flux-muted">{stat.label}</p>
              <p className="font-display mt-1 text-3xl font-semibold text-white">{stat.value}</p>
            </Card>
          );
        })}
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <h2 className="font-display text-2xl font-semibold text-white">Товары</h2>
          <p className="mt-1 text-sm text-flux-muted">Добавление, изменение и снятие с витрины.</p>

          {error ? <p className="mt-4 text-sm text-red-400">{error}</p> : null}

          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="text-flux-muted">
                <tr>
                  <th className="p-3">Название</th>
                  <th className="p-3">Бренд</th>
                  <th className="p-3">На складе</th>
                  <th className="p-3">Цена</th>
                  <th className="p-3">Действие</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={5} className="p-6 text-center text-flux-muted">
                      Загружаем товары…
                    </td>
                  </tr>
                ) : products.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-6 text-center text-flux-muted">
                      Товаров пока нет. Нажмите «Добавить товар».
                    </td>
                  </tr>
                ) : (
                  products.map((product) => (
                    <tr key={product.id} className="border-t border-white/10 text-white">
                      <td className="p-3">{product.name}</td>
                      <td className="p-3 text-flux-muted">{product.brand}</td>
                      <td className="p-3">{product.stock}</td>
                      <td className="p-3">{formatPrice(product.price)}</td>
                      <td className="p-3">
                        <Button
                          variant="secondary"
                          className="h-9"
                          type="button"
                          onClick={() => openEditForm(product)}
                        >
                          Изменить
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>

        <Card>
          <h2 className="font-display text-2xl font-semibold text-white">Последние заказы</h2>
          <div className="mt-5 grid gap-3">
            {orders.map((order) => (
              <div key={order.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex justify-between text-white">
                  <span>{order.id}</span>
                  <span>{order.total}</span>
                </div>
                <div className="mt-2 flex justify-between text-sm text-flux-muted">
                  <span>{order.user}</span>
                  <span>{order.status}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card>
          <h2 className="font-display text-2xl font-semibold text-white">Продажи</h2>
          <p className="mt-2 text-sm text-flux-muted">Динамика заказов за последнюю неделю.</p>
          <div className="mt-6 flex h-44 items-end gap-3">
            {[44, 78, 52, 90, 68, 96, 74].map((height, index) => (
              <div
                key={index}
                className="flex-1 rounded-t-2xl bg-gradient-to-t from-flux-violet to-flux-pink"
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
        </Card>
        <Card>
          <h2 className="font-display text-2xl font-semibold text-white">Склад</h2>
          <p className="mt-4 text-flux-muted">
            Несколько позиций близки к нулю на остатке. Рекомендуется пополнение.
          </p>
        </Card>
        <Card>
          <h2 className="font-display text-2xl font-semibold text-white">Пользователи</h2>
          <p className="mt-4 text-flux-muted">
            Роли: «покупатель» и «администратор». Вход выполняется через страницу «Вход».
          </p>
          <Link href="/" className="mt-4 inline-block text-sm text-flux-purple hover:underline">
            На витрину магазина
          </Link>
        </Card>
      </div>

      {formOpen ? (
        <AdminProductForm
          product={editingProduct}
          onClose={closeForm}
          onSaved={() => void loadProducts()}
        />
      ) : null}
    </main>
  );
}
