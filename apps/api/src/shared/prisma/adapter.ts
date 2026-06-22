import { PrismaMssql } from "@prisma/adapter-mssql";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import pg from "pg";

const defaultMssqlUrl =
  "sqlserver://localhost:1433;database=flux_store;user=flux_app;password=FluxStore2026!;encrypt=true;trustServerCertificate=true";

export const databaseUrl = process.env.DATABASE_URL ?? defaultMssqlUrl;

function isPostgresUrl(url: string) {
  return url.startsWith("postgres://") || url.startsWith("postgresql://");
}

type MssqlConfig = {
  server: string;
  port: number;
  database: string;
  user?: string;
  password?: string;
  authentication?: { type: "default" };
  options: {
    encrypt: boolean;
    trustServerCertificate: boolean;
  };
};

function createMssqlConfig(): string | MssqlConfig {
  const useIntegratedSecurity = process.env.DB_INTEGRATED_SECURITY === "true";

  const base: MssqlConfig = {
    server: process.env.DB_SERVER ?? "localhost",
    port: Number(process.env.DB_PORT ?? 1433),
    database: process.env.DB_NAME ?? "flux_store",
    options: {
      encrypt: true,
      trustServerCertificate: true,
    },
  };

  if (useIntegratedSecurity) {
    return {
      ...base,
      authentication: { type: "default" },
    };
  }

  const user = process.env.DB_USER;
  const password = process.env.DB_PASSWORD;

  if (user && password) {
    return {
      ...base,
      user,
      password,
    };
  }

  return databaseUrl;
}

function createPostgresClient() {
  const pool = new pg.Pool({
    connectionString: databaseUrl,
    ssl: process.env.DB_SSL === "false" ? false : { rejectUnauthorized: false },
  });

  return new PrismaClient({ adapter: new PrismaPg(pool) });
}

function createMssqlClient() {
  const adapterInput = createMssqlConfig();
  const adapter =
    typeof adapterInput === "string" ? new PrismaMssql(adapterInput) : new PrismaMssql(adapterInput);

  return new PrismaClient({ adapter });
}

export function createPrismaClient() {
  if (isPostgresUrl(databaseUrl)) {
    return createPostgresClient();
  }

  return createMssqlClient();
}
