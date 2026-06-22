# Flux Task System

This document is the operational task tracker for implementation. The Cursor plan file remains the source of the high-level accepted plan and must not be edited during implementation.

## Statuses

- `TODO` means planned and not started.
- `IN_PROGRESS` means actively being implemented.
- `VERIFYING` means implementation is complete and checks are running.
- `DONE` means implemented and verified.
- `BLOCKED` means external input or dependency is required.

## Stage Checklist

| Stage | Status | Verification |
| --- | --- | --- |
| Architecture & Planning | IN_PROGRESS | Docs created and reviewed |
| Project Initialization | TODO | Workspace scripts and TypeScript checks |
| Design System & Branding | TODO | Assets, tokens, brandbook |
| Web Layout Foundation | TODO | App shell and theme system |
| Storefront Pages | TODO | Main customer journeys render |
| Backend Foundation | TODO | API compiles and health route works |
| Database & Prisma MSSQL | TODO | Prisma schema validates |
| Authentication & User Cabinet | TODO | Protected routes and auth flows |
| Admin Dashboard | TODO | CRUD and dashboard screens |
| AI-like Recommendations | TODO | Recommendation endpoints and UI blocks |
| PWA, SEO & Optimization | TODO | Manifest, metadata, performance pass |
| Animations & Polish | TODO | Responsive and animation QA |
| Deployment Preparation | TODO | Env examples and deployment guide |

## Per-stage Report Template

Each completed stage should report:

- Goal.
- Files created.
- Files changed.
- Commands run.
- Errors found.
- Fixes applied.
- Remaining risks.

## Quality Gates

Run the strongest available checks for the current stage:

- `npm run lint`
- `npm run typecheck`
- `npm run build`
- `npm run prisma:validate`
- API smoke check.
- Frontend responsive smoke check.

When checks fail, fix the errors inside the current stage before moving forward.

## Implementation Rules

- Do not edit the accepted plan file.
- Do not remove unrelated user changes.
- Keep implementation scoped to the active stage.
- Preserve clean architecture boundaries.
- Add shared contracts before duplicating cross-app types.
- Keep UI premium, responsive, and accessible.
