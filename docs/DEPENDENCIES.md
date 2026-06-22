# Flux Dependency Plan

## Package Manager

Default package manager: npm workspaces.

Reasoning:

- Node.js and npm are available in the current environment.
- npm workspaces are sufficient for a three-part monorepo.
- The project remains easy to run for diploma review.

## Runtime Requirements

- Node.js 22 or newer.
- npm 11 or newer.
- Microsoft SQL Server for database-backed flows.

## Root Tooling

Planned root dependencies:

- `typescript`
- `prettier`
- `eslint`
- `concurrently`

Root scripts:

- `dev`
- `build`
- `lint`
- `typecheck`
- `format`
- `prisma:validate`
- `seed`

## Frontend Dependencies

Core:

- `next`
- `react`
- `react-dom`
- `typescript`

UI and styling:

- `tailwindcss`
- `@tailwindcss/postcss`
- `framer-motion`
- `lucide-react`
- `class-variance-authority`
- `clsx`
- `tailwind-merge`
- `next-themes`
- `sonner`

State and data:

- `zustand`
- `axios`
- `zod`
- `react-hook-form`
- `@hookform/resolvers`

## Backend Dependencies

Core:

- `express`
- `typescript`
- `tsx`
- `dotenv`

Security and middleware:

- `bcrypt`
- `jsonwebtoken`
- `cors`
- `helmet`
- `morgan`

Validation and database:

- `zod`
- `prisma`
- `@prisma/client`

## Shared Package Dependencies

Core:

- `zod`
- `typescript`

The shared package must remain browser-safe and server-safe.

## Version Strategy

- Prefer latest stable versions from the package manager.
- Avoid manually inventing versions.
- Use exact versions captured by the lockfile.
- Keep framework major versions aligned with generated project defaults where possible.

## Environment Variables

Frontend:

- `NEXT_PUBLIC_API_URL`

Backend:

- `PORT`
- `NODE_ENV`
- `DATABASE_URL`
- `JWT_ACCESS_SECRET`
- `JWT_REFRESH_SECRET`
- `JWT_ACCESS_TTL`
- `JWT_REFRESH_TTL`
- `CORS_ORIGIN`

## MSSQL Notes

Prisma datasource must use:

```prisma
datasource db {
  provider = "sqlserver"
  url      = env("DATABASE_URL")
}
```

Do not use PostgreSQL-specific fields, extensions, or migrations.
