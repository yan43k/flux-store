import { Router } from "express";
import { requireAuth, requireRole } from "../../shared/middleware/auth.js";
import {
  adminProductCreateValidator,
  adminProductUpdateValidator,
  createAdminProduct,
  deleteAdminProduct,
  listAdminProducts,
  updateAdminProduct,
} from "./admin.controller.js";

export const adminRouter = Router();

adminRouter.use(requireAuth, requireRole("ADMIN"));

adminRouter.get("/products", listAdminProducts);
adminRouter.post("/products", adminProductCreateValidator, createAdminProduct);
adminRouter.put("/products/:id", adminProductUpdateValidator, updateAdminProduct);
adminRouter.delete("/products/:id", deleteAdminProduct);
