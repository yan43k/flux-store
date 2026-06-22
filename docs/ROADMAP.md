# Flux Store Roadmap

Flux is a premium electronics ecommerce platform built as a diploma-grade fullstack project. The project is implemented as a monorepo with a Next.js storefront, Express API, Prisma MSSQL database layer, shared contracts, and a futuristic neon-purple design system.

## Delivery Principles

- Work strictly by stages.
- Verify each stage before moving forward.
- Keep architecture clean and feature-based.
- Avoid unrelated rewrites.
- Keep frontend, backend, shared contracts, and database responsibilities separated.
- Prefer production-ready defaults over demo-only shortcuts.

## Stages

### 1. Architecture & Planning

Deliverables:

- Roadmap.
- Architecture plan.
- Task system.
- Dependency plan.
- Quality gates.

Verification:

- Documentation exists and matches the target stack.
- Architecture boundaries are explicit.
- The next stage has clear commands and outputs.

### 2. Project Initialization

Deliverables:

- Monorepo root.
- `apps/web`.
- `apps/api`.
- `packages/shared`.
- Workspace scripts.
- TypeScript base configuration.

Verification:

- Workspace installs dependencies.
- TypeScript config resolves package boundaries.
- Basic scripts exist for development, build, linting, and type checking.

### 3. Design System & Branding

Deliverables:

- Flux SVG logo.
- Favicon.
- Brandbook.
- UI kit documentation.
- Tailwind theme tokens.
- Typography stack.

Verification:

- Brand assets are stored in the web app public directory.
- Tailwind tokens expose the Flux color system.
- UI primitives share consistent visual language.

### 4. Web Layout Foundation

Deliverables:

- Root app layout.
- Header, footer, mobile navigation.
- Theme switcher.
- Toasts.
- Loading, empty, and error states.
- Page transition shell.

Verification:

- App renders on desktop and mobile.
- Theme toggle works.
- Navigation paths resolve.

### 5. Storefront Pages

Deliverables:

- Home page.
- Catalog page.
- Product detail page.
- Cart page.
- Wishlist page.
- Compare page.
- Checkout page.

Verification:

- Pages render with demo data.
- Filters, sorting, search, and pagination update UI state.
- Product cards support cart, wishlist, and compare actions.

### 6. Backend Foundation

Deliverables:

- Express API.
- Versioned routes.
- Controllers, services, repositories.
- Error and validation middleware.
- Auth and role guards.

Verification:

- API compiles.
- Health endpoint responds.
- Error response format is consistent.

### 7. Database & Prisma MSSQL

Deliverables:

- Prisma schema for Microsoft SQL Server.
- Relations, indexes, constraints, and enums.
- Seed data.
- SQL setup notes.

Verification:

- Prisma schema validates.
- Seed script is typed.
- Database model supports storefront, auth, cart, orders, reviews, notifications, and admin use cases.

### 8. Authentication & User Cabinet

Deliverables:

- Registration and login.
- JWT access tokens.
- Refresh token model.
- Role-based access.
- User profile and order history UI.

Verification:

- Protected API routes reject unauthenticated requests.
- Admin routes require admin role.
- Frontend auth state survives reload through token refresh strategy.

### 9. Admin Dashboard

Deliverables:

- Admin shell.
- Product CRUD.
- Category CRUD.
- Order and user management.
- Analytics and inventory views.

Verification:

- Admin UI is protected.
- Forms validate with Zod.
- Dashboard uses API-backed or seed-backed data.

### 10. AI-like Recommendations

Deliverables:

- Smart recommendation service.
- Frequently bought together logic.
- Category and view-history recommendation logic.
- Premium AI recommendation UI blocks.

Verification:

- Recommendations are deterministic and explainable.
- UI exposes recommendation reason labels.

### 11. PWA, SEO & Optimization

Deliverables:

- Metadata.
- Manifest.
- Service worker/offline strategy.
- Image optimization and lazy loading.
- Performance pass.

Verification:

- Web app can be installed.
- Main metadata is present.
- Build output is production-ready.

### 12. Animations & Polish

Deliverables:

- Framer Motion transitions.
- Scroll reveal.
- Hover glow.
- Magnetic buttons.
- Parallax accents.
- Responsive polish.

Verification:

- Animations do not block interaction.
- UI remains usable on mobile, tablet, and desktop.

### 13. Deployment Preparation

Deliverables:

- `.env.example` files.
- Vercel frontend notes.
- Render backend notes.
- MSSQL cloud hosting notes.
- Local run guide.

Verification:

- Project builds locally.
- Deployment variables are documented.
- Final README explains setup, running, and testing.
