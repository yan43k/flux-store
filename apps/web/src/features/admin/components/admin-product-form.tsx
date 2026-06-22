"use client";

import { adminProductCreateSchema, type ProductCategorySlug, type ProductDto } from "@flux/shared";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { categories } from "@/features/products/data/demo-products";
import { createAdminProduct, updateAdminProduct } from "@/lib/products-api";
import { formatValidationDetails } from "@/lib/validation-errors";

type AdminProductFormProps = {
  product?: ProductDto | null;
  onClose: () => void;
  onSaved: () => void;
};

type FormState = {
  name: string;
  brand: string;
  categorySlug: ProductCategorySlug;
  price: string;
  oldPrice: string;
  stock: string;
  description: string;
  image: string;
};

function toFormState(product?: ProductDto | null): FormState {
  if (!product) {
    return {
      name: "",
      brand: "",
      categorySlug: "smartphones",
      price: "",
      oldPrice: "",
      stock: "0",
      description: "",
      image: "",
    };
  }

  return {
    name: product.name,
    brand: product.brand,
    categorySlug: product.categorySlug,
    price: String(product.price),
    oldPrice: product.oldPrice ? String(product.oldPrice) : "",
    stock: String(product.stock),
    description: product.description,
    image: product.image,
  };
}

export function AdminProductForm({ product, onClose, onSaved }: AdminProductFormProps) {
  const [form, setForm] = useState<FormState>(() => toFormState(product));
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const isEdit = Boolean(product);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSaving(true);
    setError(null);

    const payload = {
      name: form.name.trim(),
      brand: form.brand.trim(),
      categorySlug: form.categorySlug,
      price: Number(form.price),
      oldPrice: form.oldPrice ? Number(form.oldPrice) : undefined,
      stock: Number(form.stock),
      description: form.description.trim(),
      image: form.image.trim() || undefined,
    };

    const validation = adminProductCreateSchema.safeParse(payload);

    if (!validation.success) {
      setError(formatValidationDetails(validation.error.flatten()) ?? "Проверьте введённые данные.");
      setSaving(false);
      return;
    }

    try {
      if (isEdit && product) {
        await updateAdminProduct(product.id, validation.data);
      } else {
        await createAdminProduct(validation.data);
      }

      onSaved();
      onClose();
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Не удалось сохранить товар.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[2rem] border border-white/10 bg-[#120826] p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-accent text-sm uppercase tracking-[0.28em] text-flux-purple">
              {isEdit ? "Редактирование" : "Новый товар"}
            </p>
            <h2 className="font-display mt-2 text-3xl font-semibold text-white">
              {isEdit ? product?.name : "Добавить товар"}
            </h2>
          </div>
          <Button variant="secondary" type="button" onClick={onClose}>
            Закрыть
          </Button>
        </div>

        <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
          <label className="block text-sm text-flux-muted">
            Название
            <input
              required
              value={form.name}
              onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none focus:border-flux-purple"
            />
          </label>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="block text-sm text-flux-muted">
              Бренд
              <input
                required
                value={form.brand}
                onChange={(event) => setForm((prev) => ({ ...prev, brand: event.target.value }))}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none focus:border-flux-purple"
              />
            </label>

            <label className="block text-sm text-flux-muted">
              Категория
              <select
                required
                value={form.categorySlug}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    categorySlug: event.target.value as ProductCategorySlug,
                  }))
                }
                className="mt-2 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none focus:border-flux-purple"
              >
                {categories.map((category) => (
                  <option key={category.slug} value={category.slug}>
                    {category.name}
                  </option>
                ))}
                <option value="gadgets">Гаджеты</option>
                <option value="peripherals">Периферия</option>
              </select>
            </label>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <label className="block text-sm text-flux-muted">
              Цена, ₽
              <input
                required
                type="number"
                min="0"
                value={form.price}
                onChange={(event) => setForm((prev) => ({ ...prev, price: event.target.value }))}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none focus:border-flux-purple"
              />
            </label>

            <label className="block text-sm text-flux-muted">
              Старая цена
              <input
                type="number"
                min="0"
                value={form.oldPrice}
                onChange={(event) => setForm((prev) => ({ ...prev, oldPrice: event.target.value }))}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none focus:border-flux-purple"
              />
            </label>

            <label className="block text-sm text-flux-muted">
              На складе
              <input
                required
                type="number"
                min="0"
                value={form.stock}
                onChange={(event) => setForm((prev) => ({ ...prev, stock: event.target.value }))}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none focus:border-flux-purple"
              />
            </label>
          </div>

          <label className="block text-sm text-flux-muted">
            Описание
            <span className="ml-2 text-xs text-flux-muted/80">минимум 10 символов</span>
            <textarea
              required
              minLength={10}
              rows={4}
              value={form.description}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, description: event.target.value }))
              }
              className="mt-2 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none focus:border-flux-purple"
            />
          </label>

          <label className="block text-sm text-flux-muted">
            Изображение (URL или CSS-градиент)
            <input
              value={form.image}
              onChange={(event) => setForm((prev) => ({ ...prev, image: event.target.value }))}
              placeholder="linear-gradient(135deg, #7c3aed, #06b6d4)"
              className="mt-2 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none focus:border-flux-purple"
            />
          </label>

          {error ? <p className="text-sm text-red-400">{error}</p> : null}

          <div className="flex justify-end gap-3 pt-2">
            <Button variant="secondary" type="button" onClick={onClose}>
              Отмена
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? "Сохраняем…" : isEdit ? "Сохранить" : "Добавить"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
