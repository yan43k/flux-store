import { Router } from "express";
import { loginSchema, registerSchema } from "@flux/shared";
import { validateBody } from "../../shared/middleware/validate.js";
import { login, register } from "./auth.controller.js";

export const authRouter = Router();

authRouter.post("/register", validateBody(registerSchema), register);
authRouter.post("/login", validateBody(loginSchema), login);
