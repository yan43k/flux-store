import "dotenv/config";
import bcrypt from "bcrypt";
import { createPrismaClient } from "../src/shared/prisma/adapter.js";

const prisma = createPrismaClient();

/** Общий пароль для всех тестовых учётных записей (для проверки диплома). */
export const DEMO_PASSWORD = "FluxStore2026!";

const main = async () => {
  const passwordHash = await bcrypt.hash(DEMO_PASSWORD, 12);

  const admin = await prisma.user.upsert({
    where: { email: "admin@flux.store" },
    update: { passwordHash, name: "Администратор" },
    create: {
      name: "Администратор",
      email: "admin@flux.store",
      passwordHash,
      role: "ADMIN",
    },
  });

  await prisma.user.upsert({
    where: { email: "pokupatel@flux.store" },
    update: { passwordHash, name: "Иван Покупатель" },
    create: {
      name: "Иван Покупатель",
      email: "pokupatel@flux.store",
      passwordHash,
      role: "CUSTOMER",
    },
  });

  await prisma.user.upsert({
    where: { email: "test@flux.store" },
    update: { passwordHash, name: "Тестовый пользователь" },
    create: {
      name: "Тестовый пользователь",
      email: "test@flux.store",
      passwordHash,
      role: "CUSTOMER",
    },
  });

  const smartphones = await prisma.category.upsert({
    where: { slug: "smartphones" },
    update: {},
    create: { name: "Смартфоны", slug: "smartphones" },
  });

  const laptops = await prisma.category.upsert({
    where: { slug: "laptops" },
    update: {},
    create: { name: "Ноутбуки", slug: "laptops" },
  });

  const product = await prisma.product.upsert({
    where: { slug: "flux-nova-x1" },
    update: {},
    create: {
      name: "Flux Nova X1",
      slug: "flux-nova-x1",
      brand: "Flux",
      description:
        "Флагманский смартфон с мощной камерой, титановым корпусом и дисплеем OLED 144 Гц.",
      price: 89990,
      oldPrice: 99990,
      stock: 24,
      rating: 4.9,
      reviewCount: 428,
      isFeatured: true,
      categoryId: smartphones.id,
      images: {
        create: [{ url: "/products/flux-nova-x1.svg", alt: "Смартфон Flux Nova X1", sortOrder: 1 }],
      },
      specifications: {
        create: [
          { name: "Экран", value: "6,8″ OLED, 144 Гц", groupName: "Экран" },
          { name: "Память", value: "16 ГБ", groupName: "Производительность" },
        ],
      },
    },
  });

  await prisma.product.upsert({
    where: { slug: "asus-rog-eclipse-18" },
    update: {},
    create: {
      name: "ASUS ROG Eclipse 18",
      slug: "asus-rog-eclipse-18",
      brand: "ASUS",
      description: "Игровой ноутбук с видеокартой RTX и ярким Mini LED экраном.",
      price: 249990,
      oldPrice: 279990,
      stock: 9,
      rating: 4.8,
      reviewCount: 191,
      isFeatured: true,
      categoryId: laptops.id,
    },
  });

  await prisma.cart.upsert({
    where: { userId: admin.id },
    update: {},
    create: {
      userId: admin.id,
      items: {
        create: [{ productId: product.id, quantity: 1 }],
      },
    },
  });
};

main()
  .finally(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
