import type { RequestHandler } from "express";
import type { CatalogQuery } from "@flux/shared";
import { AppError } from "../../shared/errors/app-error.js";
import { ok } from "../../shared/http/api-response.js";
import { ProductsService } from "./products.service.js";

const productsService = new ProductsService();

export const getProducts: RequestHandler = (req, res) => {
  const result = productsService.getCatalog(req.query as unknown as CatalogQuery);
  res.json(ok(result.items, result.meta));
};

export const getProductBySlug: RequestHandler = (req, res, next) => {
  try {
    const { slug } = req.params;

    if (!slug || Array.isArray(slug)) {
      throw new AppError("PRODUCT_SLUG_REQUIRED", "Product slug is required", 400);
    }

    res.json(ok(productsService.getBySlug(slug)));
  } catch (error) {
    next(error);
  }
};
