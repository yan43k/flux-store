# Flux Database

## Provider

Flux uses Microsoft SQL Server through Prisma:

```prisma
datasource db {
  provider = "sqlserver"
}
```

The connection URL is configured in `apps/api/prisma.config.ts` for Prisma 7 compatibility.

PostgreSQL is intentionally not used.

## Core Tables

- `User`
- `RefreshToken`
- `Category`
- `Product`
- `ProductImage`
- `ProductSpecification`
- `Review`
- `Favorite`
- `Cart`
- `CartItem`
- `Order`
- `OrderItem`
- `Notification`

## Local Setup

Create `apps/api/.env` from `apps/api/.env.example` and set:

```bash
DATABASE_URL="sqlserver://localhost:1433;database=flux_store;user=sa;password=Your_password123;encrypt=true;trustServerCertificate=true"
```

Validate schema:

```bash
npm run prisma:validate
```

Push schema to a local development database:

```bash
npx prisma db push -w @flux/api
```

Seed demo data:

```bash
npm run seed
```

## Index Strategy

- Product filters: category, brand, price, rating, stock, active/featured.
- Order dashboard: user, status, created date.
- Auth/session: refresh token hash, user, expiry.
- Wishlist/cart: unique user-product and cart-product pairs.

## Seed users (after `npm run seed`)

Single demo password for all seeded accounts: `FluxStore2026!`

| Role (stored as string) | Email |
| --- | --- |
| ADMIN | admin@flux.store |
| CUSTOMER | pokupatel@flux.store |
| CUSTOMER | test@flux.store |

## Constraints

- Unique user emails.
- Unique product and category slugs.
- Unique review per user/product.
- Unique favorite per user/product.
- Unique cart item per cart/product.
