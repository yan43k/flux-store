#!/usr/bin/env bash
# Render build: Next.js frontend
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

if [ -z "${NEXT_PUBLIC_API_URL:-}" ]; then
  echo "WARNING: NEXT_PUBLIC_API_URL не задан — в сборку попадёт localhost."
  echo "Задайте переменную в Render (Environment) перед деплоем, например:"
  echo "  https://flux-store-api.onrender.com/api/v1"
fi

echo "==> npm install"
npm install

echo "==> build @flux/shared + @flux/web"
npm run build -w @flux/shared
npm run build -w @flux/web

echo "==> Web build OK"
