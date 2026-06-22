import { Router } from "express";
import { ok } from "../../shared/http/api-response.js";
import { RecommendationsService } from "./recommendations.service.js";

export const recommendationsRouter = Router();
const recommendationsService = new RecommendationsService();

recommendationsRouter.get("/", (req, res) => {
  const productSlug = typeof req.query.productSlug === "string" ? req.query.productSlug : undefined;
  res.json(ok(recommendationsService.getSmartPicks(productSlug)));
});
