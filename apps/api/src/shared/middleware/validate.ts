import type { RequestHandler } from "express";
import type { ZodSchema } from "zod";

export const validateQuery =
  (schema: ZodSchema): RequestHandler =>
  (req, _res, next) => {
    try {
      Object.defineProperty(req, "query", {
        value: schema.parse(req.query),
        configurable: true,
      });
      next();
    } catch (error) {
      next(error);
    }
  };

export const validateBody =
  (schema: ZodSchema): RequestHandler =>
  (req, _res, next) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      next(error);
    }
  };
