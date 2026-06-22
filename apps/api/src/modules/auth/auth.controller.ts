import type { RequestHandler } from "express";
import { ok } from "../../shared/http/api-response.js";
import { AuthService } from "./auth.service.js";

const authService = new AuthService();

export const register: RequestHandler = async (req, res, next) => {
  try {
    res.status(201).json(ok(await authService.register(req.body)));
  } catch (error) {
    next(error);
  }
};

export const login: RequestHandler = async (req, res, next) => {
  try {
    res.json(ok(await authService.login(req.body)));
  } catch (error) {
    next(error);
  }
};

export const refresh: RequestHandler = async (req, res, next) => {
  try {
    res.json(ok(await authService.refresh(req.body.refreshToken)));
  } catch (error) {
    next(error);
  }
};
