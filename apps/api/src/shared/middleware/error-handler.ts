import type { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { AppError } from "../errors/app-error.js";
import { fail } from "../http/api-response.js";

export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  if (error instanceof AppError) {
    res.status(error.statusCode).json(fail(error.code, error.message, error.details));
    return;
  }

  if (error instanceof ZodError) {
    res
      .status(422)
      .json(fail("VALIDATION_ERROR", "Проверьте введённые данные.", error.flatten()));
    return;
  }

  res.status(500).json(fail("INTERNAL_ERROR", "Внутренняя ошибка сервера. Попробуйте позже."));
};
