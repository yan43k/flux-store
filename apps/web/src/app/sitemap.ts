import type { MetadataRoute } from "next";
import { demoProducts } from "@/features/products/data/demo-products";

const baseUrl = "https://flux-store.local";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/catalog", "/cart", "/wishlist", "/compare", "/checkout"].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
  }));

  const productRoutes = demoProducts.map((product) => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...productRoutes];
}
