import type { RequestHandler } from "express";
import type { CatalogQuery } from "@flux/shared";
import { AppError } from "../../shared/errors/app-error.js";
import { ok } from "../../shared/http/api-response.js";
import { ProductsService } from "./products.service.js";

const productsService = new ProductsService();

export const getProducts: RequestHandler = async (req, res, next) => {
  try {
    const result = await productsService.getCatalog(req.query as unknown as CatalogQuery);
    res.json(ok(result.items, result.meta));
  } catch (error) {
    next(error);
  }
};

export const getProductBySlug: RequestHandler = async (req, res, next) => {
  try {
    const { slug } = req.params;

    if (!slug || Array.isArray(slug)) {
      throw new AppError("PRODUCT_SLUG_REQUIRED", "Не указан адрес товара.", 400);
    }

    res.json(ok(await productsService.getBySlug(slug)));
  } catch (error) {
    next(error);
  }
};
