import type { AdminProductCreateInput, AdminProductUpdateInput, ProductDto } from "@flux/shared";
import { prisma } from "../../shared/prisma/client.js";
import { AppError } from "../../shared/errors/app-error.js";
import { demoProducts } from "./products.seed.js";
import { mapProductToDto } from "./product.mapper.js";

const productInclude = {
  category: true,
  images: { orderBy: { sortOrder: "asc" as const } },
  specifications: true,
};

const categoryTitles: Record<string, string> = {
  smartphones: "Смартфоны",
  laptops: "Ноутбуки",
  "gaming-pc": "Игровые ПК",
  components: "Комплектующие",
  monitors: "Мониторы",
  headphones: "Наушники",
  gadgets: "Гаджеты",
  peripherals: "Периферия",
};

function slugify(value: string) {
  const slug = value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9а-яё]+/gi, "-")
    .replace(/^-+|-+$/g, "");

  return slug || `product-${Date.now()}`;
}

async function ensureUniqueSlug(base: string, excludeId?: string) {
  let slug = slugify(base);
  let attempt = 0;

  while (attempt < 20) {
    const existing = await prisma.product.findFirst({
      where: {
        slug,
        ...(excludeId ? { NOT: { id: excludeId } } : {}),
      },
    });

    if (!existing) {
      return slug;
    }

    attempt += 1;
    slug = `${slugify(base)}-${attempt}`;
  }

  return `${slugify(base)}-${Date.now()}`;
}

async function resolveCategoryId(categorySlug: string) {
  const category = await prisma.category.upsert({
    where: { slug: categorySlug },
    update: {},
    create: {
      slug: categorySlug,
      name: categoryTitles[categorySlug] ?? categorySlug,
    },
  });

  return category.id;
}

export class ProductsRepository {
  private async loadAll(includeInactive = false): Promise<ProductDto[]> {
    try {
      const rows = await prisma.product.findMany({
        where: includeInactive ? undefined : { isActive: true },
        include: productInclude,
        orderBy: { createdAt: "desc" },
      });

      if (rows.length === 0) {
        return demoProducts;
      }

      return rows.map(mapProductToDto);
    } catch {
      return demoProducts;
    }
  }

  async findMany() {
    return this.loadAll(false);
  }

  async findAllAdmin() {
    try {
      const rows = await prisma.product.findMany({
        include: productInclude,
        orderBy: { createdAt: "desc" },
      });

      return rows.map(mapProductToDto);
    } catch {
      return demoProducts;
    }
  }

  async findBySlug(slug: string) {
    try {
      const product = await prisma.product.findFirst({
        where: { slug, isActive: true },
        include: productInclude,
      });

      if (product) {
        return mapProductToDto(product);
      }
    } catch {
      // fallback below
    }

    return demoProducts.find((item) => item.slug === slug) ?? null;
  }

  async findById(id: string) {
    const product = await prisma.product.findUnique({
      where: { id },
      include: productInclude,
    });

    return product ? mapProductToDto(product) : null;
  }

  async create(input: AdminProductCreateInput) {
    const categoryId = await resolveCategoryId(input.categorySlug);
    const slug = await ensureUniqueSlug(input.name);
    const image = input.image ?? "linear-gradient(135deg, #7c3aed, #06b6d4)";

    const product = await prisma.product.create({
      data: {
        name: input.name,
        slug,
        brand: input.brand,
        description: input.description,
        price: input.price,
        oldPrice: input.oldPrice,
        stock: input.stock,
        categoryId,
        isActive: true,
        images: {
          create: [{ url: image, alt: input.name, sortOrder: 0 }],
        },
      },
      include: productInclude,
    });

    return mapProductToDto(product);
  }

  async update(id: string, input: AdminProductUpdateInput) {
    const existing = await prisma.product.findUnique({ where: { id } });

    if (!existing) {
      throw new AppError("PRODUCT_NOT_FOUND", "Товар не найден.", 404);
    }

    const categoryId = input.categorySlug
      ? await resolveCategoryId(input.categorySlug)
      : undefined;

    const product = await prisma.product.update({
      where: { id },
      data: {
        name: input.name,
        brand: input.brand,
        description: input.description,
        price: input.price,
        oldPrice: input.oldPrice,
        stock: input.stock,
        categoryId,
      },
      include: productInclude,
    });

    if (input.image) {
      const firstImage = await prisma.productImage.findFirst({
        where: { productId: id },
        orderBy: { sortOrder: "asc" },
      });

      if (firstImage) {
        await prisma.productImage.update({
          where: { id: firstImage.id },
          data: { url: input.image, alt: product.name },
        });
      } else {
        await prisma.productImage.create({
          data: { productId: id, url: input.image, alt: product.name, sortOrder: 0 },
        });
      }
    }

    const refreshed = await prisma.product.findUniqueOrThrow({
      where: { id },
      include: productInclude,
    });

    return mapProductToDto(refreshed);
  }

  async remove(id: string) {
    const existing = await prisma.product.findUnique({ where: { id } });

    if (!existing) {
      throw new AppError("PRODUCT_NOT_FOUND", "Товар не найден.", 404);
    }

    await prisma.product.update({
      where: { id },
      data: { isActive: false, stock: 0 },
    });
  }
}
