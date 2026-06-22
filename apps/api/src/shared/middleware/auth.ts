import type { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../errors/app-error.js";

type JwtPayload = {
  sub: string;
  role: string;
  email: string;
};

export const requireAuth: RequestHandler = (req, res, next) => {
  const token = req.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    next(new AppError("UNAUTHORIZED", "Нужно войти в аккаунт.", 401));
    return;
  }

  try {
    res.locals.auth = jwt.verify(token, process.env.JWT_ACCESS_SECRET ?? "dev-access-secret") as JwtPayload;
    next();
  } catch {
    next(new AppError("UNAUTHORIZED", "Сессия истекла. Войдите снова.", 401));
  }
};

export const requireRole =
  (role: string): RequestHandler =>
  (_req, res, next) => {
    if (res.locals.auth?.role !== role) {
      next(new AppError("FORBIDDEN", "Недостаточно прав для этого раздела.", 403));
      return;
    }

    next();
  };
