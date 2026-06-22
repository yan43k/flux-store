import { demoProducts } from "./products.seed.js";

export class ProductsRepository {
  findMany() {
    return demoProducts;
  }

  findBySlug(slug: string) {
    return demoProducts.find((product) => product.slug === slug) ?? null;
  }
}
