import { z } from "zod";

export const userRoleSchema = z.enum(["CUSTOMER", "ADMIN"]);

export type UserRole = z.infer<typeof userRoleSchema>;

export const apiErrorSchema = z.object({
  code: z.string(),
  message: z.string(),
  details: z.unknown().optional(),
});

export const paginationMetaSchema = z.object({
  page: z.number().int().positive().optional(),
  pageSize: z.number().int().positive().optional(),
  total: z.number().int().nonnegative().optional(),
});

export type ApiError = z.infer<typeof apiErrorSchema>;
export type PaginationMeta = z.infer<typeof paginationMetaSchema>;

export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: ApiError;
  meta?: PaginationMeta;
};

export const productCategorySchema = z.enum([
  "smartphones",
  "laptops",
  "gaming-pc",
  "components",
  "monitors",
  "headphones",
  "gadgets",
  "peripherals",
]);

export type ProductCategorySlug = z.infer<typeof productCategorySchema>;

export const productSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  brand: z.string(),
  categorySlug: productCategorySchema,
  price: z.number().nonnegative(),
  oldPrice: z.number().nonnegative().optional(),
  rating: z.number().min(0).max(5),
  reviewCount: z.number().int().nonnegative(),
  stock: z.number().int().nonnegative(),
  badge: z.string().optional(),
  image: z.string(),
  description: z.string(),
  specs: z.record(z.string(), z.string()),
});

export type ProductDto = z.infer<typeof productSchema>;

export const catalogQuerySchema = z.object({
  search: z.string().optional(),
  category: productCategorySchema.optional(),
  brand: z.string().optional(),
  minPrice: z.coerce.number().nonnegative().optional(),
  maxPrice: z.coerce.number().nonnegative().optional(),
  rating: z.coerce.number().min(0).max(5).optional(),
  inStock: z.coerce.boolean().optional(),
  sort: z.enum(["popular", "price-asc", "price-desc", "rating", "newest"]).default("popular"),
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().positive().max(48).default(12),
});

export type CatalogQuery = z.infer<typeof catalogQuerySchema>;

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const registerSchema = loginSchema.extend({
  name: z.string().min(2).max(80),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;

export const refreshSchema = z.object({
  refreshToken: z.string().min(1),
});

export type RefreshInput = z.infer<typeof refreshSchema>;

export const adminProductCreateSchema = z.object({
  name: z.string().min(2, "Минимум 2 символа.").max(120, "Максимум 120 символов."),
  brand: z.string().min(1, "Укажите бренд.").max(80, "Максимум 80 символов."),
  categorySlug: productCategorySchema,
  price: z.coerce.number().nonnegative("Цена не может быть отрицательной."),
  oldPrice: z.coerce.number().nonnegative("Старая цена не может быть отрицательной.").optional(),
  stock: z.coerce.number().int("Остаток должен быть целым числом.").nonnegative("Остаток не может быть отрицательным.").default(0),
  description: z
    .string()
    .min(10, "Описание должно быть не короче 10 символов.")
    .max(5000, "Описание слишком длинное."),
  image: z.string().min(1).optional(),
});

export const adminProductUpdateSchema = adminProductCreateSchema.partial();

export type AdminProductCreateInput = z.infer<typeof adminProductCreateSchema>;
export type AdminProductUpdateInput = z.infer<typeof adminProductUpdateSchema>;
