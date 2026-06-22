import { Router } from "express";
import { loginSchema, refreshSchema, registerSchema } from "@flux/shared";
import { validateBody } from "../../shared/middleware/validate.js";
import { login, refresh, register } from "./auth.controller.js";

export const authRouter = Router();

authRouter.post("/register", validateBody(registerSchema), register);
authRouter.post("/login", validateBody(loginSchema), login);
authRouter.post("/refresh", validateBody(refreshSchema), refresh);
