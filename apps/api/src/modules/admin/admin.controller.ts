import type { RequestHandler } from "express";
import { adminProductCreateSchema, adminProductUpdateSchema } from "@flux/shared";
import { AppError } from "../../shared/errors/app-error.js";
import { ok } from "../../shared/http/api-response.js";
import { validateBody } from "../../shared/middleware/validate.js";
import { ProductsService } from "../products/products.service.js";

const productsService = new ProductsService();

export const listAdminProducts: RequestHandler = async (_req, res, next) => {
  try {
    res.json(ok(await productsService.listAdmin()));
  } catch (error) {
    next(error);
  }
};

export const createAdminProduct: RequestHandler = async (req, res, next) => {
  try {
    res.status(201).json(ok(await productsService.createAdmin(req.body)));
  } catch (error) {
    next(error);
  }
};

export const updateAdminProduct: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id || Array.isArray(id)) {
      throw new AppError("PRODUCT_ID_REQUIRED", "Не указан идентификатор товара.", 400);
    }

    res.json(ok(await productsService.updateAdmin(id, req.body)));
  } catch (error) {
    next(error);
  }
};

export const deleteAdminProduct: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id || Array.isArray(id)) {
      throw new AppError("PRODUCT_ID_REQUIRED", "Не указан идентификатор товара.", 400);
    }

    await productsService.removeAdmin(id);
    res.json(ok({ id }));
  } catch (error) {
    next(error);
  }
};

export const adminProductCreateValidator = validateBody(adminProductCreateSchema);
export const adminProductUpdateValidator = validateBody(adminProductUpdateSchema);
