import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { authRouter } from "./modules/auth/auth.routes.js";
import { productsRouter } from "./modules/products/products.routes.js";
import { recommendationsRouter } from "./modules/recommendations/recommendations.routes.js";
import { errorHandler } from "./shared/middleware/error-handler.js";

export const createApp = () => {
  const app = express();

  app.use(helmet());
  app.use(cors({ origin: process.env.CORS_ORIGIN?.split(",") ?? "*" }));
  app.use(express.json());
  app.use(morgan("dev"));

  app.get("/api/v1/health", (_req, res) => {
    res.json({
      success: true,
      data: {
        service: "flux-api",
        status: "ok",
        timestamp: new Date().toISOString(),
      },
    });
  });

  app.use("/api/v1/products", productsRouter);
  app.use("/api/v1/recommendations", recommendationsRouter);
  app.use("/api/v1/auth", authRouter);
  app.use(errorHandler);

  return app;
};
