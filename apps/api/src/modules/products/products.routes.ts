import { Router } from "express";
import { catalogQuerySchema } from "@flux/shared";
import { validateQuery } from "../../shared/middleware/validate.js";
import { getProductBySlug, getProducts } from "./products.controller.js";

export const productsRouter = Router();

productsRouter.get("/", validateQuery(catalogQuerySchema), getProducts);
productsRouter.get("/:slug", getProductBySlug);
