import type { CatalogQuery } from "@flux/shared";
import { AppError } from "../../shared/errors/app-error.js";
import { ProductsRepository } from "./products.repository.js";

export class ProductsService {
  constructor(private readonly productsRepository = new ProductsRepository()) {}

  getCatalog(query: CatalogQuery) {
    const products = this.productsRepository.findMany().filter((product) => {
      const matchesSearch = query.search
        ? `${product.name} ${product.brand}`.toLowerCase().includes(query.search.toLowerCase())
        : true;
      const matchesCategory = query.category ? product.categorySlug === query.category : true;
      const matchesBrand = query.brand ? product.brand.toLowerCase() === query.brand.toLowerCase() : true;
      const matchesMinPrice = query.minPrice ? product.price >= query.minPrice : true;
      const matchesMaxPrice = query.maxPrice ? product.price <= query.maxPrice : true;
      const matchesRating = query.rating ? product.rating >= query.rating : true;
      const matchesStock = query.inStock ? product.stock > 0 : true;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesBrand &&
        matchesMinPrice &&
        matchesMaxPrice &&
        matchesRating &&
        matchesStock
      );
    });

    const sorted = [...products].sort((a, b) => {
      if (query.sort === "price-asc") return a.price - b.price;
      if (query.sort === "price-desc") return b.price - a.price;
      if (query.sort === "rating") return b.rating - a.rating;
      if (query.sort === "newest") return b.id.localeCompare(a.id);
      return b.reviewCount - a.reviewCount;
    });

    const start = (query.page - 1) * query.pageSize;

    return {
      items: sorted.slice(start, start + query.pageSize),
      meta: {
        page: query.page,
        pageSize: query.pageSize,
        total: sorted.length,
      },
    };
  }

  getBySlug(slug: string) {
    const product = this.productsRepository.findBySlug(slug);

    if (!product) {
      throw new AppError("PRODUCT_NOT_FOUND", "Product not found", 404);
    }

    return product;
  }
}
