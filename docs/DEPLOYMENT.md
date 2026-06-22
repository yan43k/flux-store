# Flux Deployment Guide

## Frontend: Vercel

Project root:

```text
apps/web
```

Build command:

```bash
npm run build -w @flux/web
```

Environment variables:

```bash
NEXT_PUBLIC_API_URL=https://your-render-api.onrender.com/api/v1
```

## Backend: Render

Project root:

```text
apps/api
```

Build command:

```bash
npm install && npm run build -w @flux/api
```

Start command:

```bash
npm run start -w @flux/api
```

Environment variables:

```bash
PORT=4000
NODE_ENV=production
CORS_ORIGIN=https://your-vercel-app.vercel.app
DATABASE_URL=sqlserver://...
JWT_ACCESS_SECRET=...
JWT_REFRESH_SECRET=...
JWT_ACCESS_TTL=15m
JWT_REFRESH_TTL=30d
```

## Database: Microsoft SQL Server

Use a cloud MSSQL provider. After setting `DATABASE_URL`, run:

```bash
npm run prisma:validate
npx prisma db push -w @flux/api
npm run seed
```

## Local QA Checklist

- `npm run typecheck`
- `npm run lint`
- `npm run prisma:validate`
- `npm run build`
- Open `http://localhost:3000`
- Open `http://localhost:4000/api/v1/health`
- Check mobile, tablet, and desktop layouts.
