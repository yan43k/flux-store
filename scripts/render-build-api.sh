#!/usr/bin/env bash
# Render build: API + PostgreSQL (локально по-прежнему SQL Server).
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
API="$ROOT/apps/api"

echo "==> Flux API: переключаем Prisma-схему на PostgreSQL"
cp "$API/prisma/schema.postgresql.prisma" "$API/prisma/schema.prisma"
rm -rf "$API/prisma/migrations"
cp -R "$API/prisma/migrations-postgres" "$API/prisma/migrations"

echo "==> npm install (monorepo, with devDependencies for build)"
cd "$ROOT"
export NPM_CONFIG_PRODUCTION=false
npm install --include=dev

echo "==> build @flux/shared"
npm run build -w @flux/shared

echo "==> Prisma generate + migrate + seed"
cd "$API"
npx prisma generate
npx prisma migrate deploy
npx tsx prisma/seed.ts

echo "==> build @flux/api"
cd "$ROOT"
npm run build -w @flux/api

echo "==> API build OK"
