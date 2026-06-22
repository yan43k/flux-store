import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url:
      process.env.DATABASE_URL ??
      "sqlserver://localhost:1433;database=flux_store;user=flux_app;password=FluxStore2026!;encrypt=true;trustServerCertificate=true",
  },
});
