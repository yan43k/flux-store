import { ProductsRepository } from "../products/products.repository.js";

export class RecommendationsService {
  constructor(private readonly productsRepository = new ProductsRepository()) {}

  async getSmartPicks(productSlug?: string) {
    const products = await this.productsRepository.findMany();
    const anchor = productSlug ? await this.productsRepository.findBySlug(productSlug) : null;

    return products
      .filter((product) => product.slug !== productSlug)
      .map((product) => ({
        product,
        reason:
          anchor && anchor.categorySlug === product.categorySlug
            ? "Same category affinity"
            : product.rating >= 4.8
              ? "High satisfaction score"
              : "Popular with Flux customers",
        score: Math.round((product.rating * 20 + product.reviewCount / 25) * 10) / 10,
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 6);
  }
}
