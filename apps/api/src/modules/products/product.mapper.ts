import type { ProductDto } from "@flux/shared";
import type { Prisma } from "@prisma/client";

const defaultImage = "linear-gradient(135deg, #7c3aed, #06b6d4)";

export type ProductWithRelations = Prisma.ProductGetPayload<{
  include: {
    category: true;
    images: true;
    specifications: true;
  };
}>;

export function mapProductToDto(product: ProductWithRelations): ProductDto {
  const image = product.images[0]?.url ?? defaultImage;

  return {
    id: product.id,
    slug: product.slug,
    name: product.name,
    brand: product.brand,
    categorySlug: product.category.slug as ProductDto["categorySlug"],
    price: Number(product.price),
    oldPrice: product.oldPrice ? Number(product.oldPrice) : undefined,
    rating: product.rating,
    reviewCount: product.reviewCount,
    stock: product.stock,
    badge: product.isFeatured ? "Хит" : undefined,
    image,
    description: product.description,
    specs: Object.fromEntries(product.specifications.map((spec) => [spec.name, spec.value])),
  };
}
