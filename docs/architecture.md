# System Architecture & Technical Design

## 1. High-Level Architecture Overview

The **Hostel Management & Fee Tracking System** is structured as a full-stack monorepo with a clear separation between the frontend application, the planned backend API, and shared code.

```text
┌────────────────────────────────────────────────────────────────────────┐
│                     Frontend Application (/frontend)                   │
│              React 18 + TypeScript + Vite + Tailwind CSS               │
│          React Router v6 + TanStack Query + shadcn/ui + Lucide         │
│               Currently running with mock data (Phase 2)               │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    │ HTTP / REST API (JSON) — Planned
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                    Backend API Server (/backend) — PLANNED             │
│                 Node.js + TypeScript + Fastify (or Express)            │
│               JWT Authentication, RBAC, Zod Request Validation         │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    │ Domain Services & Use Cases
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│               Business Logic & Service Layer — PLANNED                 │
│         Fee Calculations, Overdue Detection, Audit Trail, Reports      │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    │ Prisma ORM Client — PLANNED
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                          Prisma ORM — PLANNED                          │
│                  Schema Models, Migrations, Seed Data                  │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                  ┌─────────────────┴─────────────────┐
                  │                                   │
                  ▼                                   ▼
      ┌───────────────────────┐           ┌───────────────────────┐
      │  Local Development    │           │  Production Target    │
      │     SQLite DB         │           │   PostgreSQL DB       │
      └───────────────────────┘           └───────────────────────┘
```

> **Current Phase (Phase 2 — Frontend Complete):**
> The frontend is fully built with all pages, design system, components, routing, and mock data. The backend, ORM, and database will be implemented in the next phase.

---

## 2. Monorepo Directory Structure

```text
hostel-management-system/
│
├── frontend/                    # Frontend SPA (React + Vite + TypeScript)
│   ├── public/                  # Static assets served by Vite
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── ui/              # Base UI primitives (Button, Card, Input, Badge...)
│   │   │   ├── shared/          # Layout components (AppHeader, AppSidebar, PageHeader...)
│   │   │   ├── students/        # AddStudentDialog
│   │   │   ├── payments/        # RecordPaymentDialog
│   │   │   └── announcements/   # SendAnnouncementDialog
│   │   ├── constants/           # App-wide constant values
│   │   ├── hooks/               # Custom React hooks (useTheme)
│   │   ├── layouts/             # AppLayout (protected) and AuthLayout
│   │   ├── lib/                 # Utility helpers (cn)
│   │   ├── mocks/               # Comprehensive mock data for all pages
│   │   ├── pages/               # Route-level page components (11 pages)
│   │   ├── routes/              # React Router createBrowserRouter config
│   │   ├── schemas/             # Client-side Zod schemas
│   │   ├── services/api/        # Axios HTTP client abstraction (ready for backend)
│   │   ├── types/               # Frontend type declarations & re-exports
│   │   ├── App.tsx
│   │   ├── index.css            # Tailwind + CSS variable tokens (light + dark)
│   │   └── main.tsx
│   ├── .env.example
│   ├── index.html
│   ├── package.json             # @hostel/frontend
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   └── vite.config.ts
│
├── backend/                     # Backend API server — NOT YET IMPLEMENTED
│   └── .gitkeep
│
├── packages/
│   └── shared/                  # Shared types, schemas, constants
│       ├── src/
│       │   ├── types/index.ts   # All domain interfaces
│       │   ├── schemas/index.ts # Shared Zod schemas
│       │   ├── constants/index.ts
│       │   └── index.ts
│       ├── package.json         # @hostel/shared
│       └── tsconfig.json
│
├── docs/
│   └── architecture.md          # This file
│
├── .gitignore
├── .prettierrc
├── .prettierignore
├── eslint.config.js             # Root ESLint flat config (TypeScript rules)
├── package.json                 # Root monorepo scripts
├── pnpm-workspace.yaml          # Workspace: frontend, packages/*
└── tsconfig.json                # Root strict TypeScript base config
```

---

## 3. Frontend Architecture (`/frontend`)

### Core Libraries

| Library           | Purpose                                               |
| :---------------- | :---------------------------------------------------- |
| React 18          | UI framework (Strict Mode)                            |
| TypeScript 5      | Static typing (strict mode, noUncheckedIndexedAccess) |
| Vite 6            | Dev server + production bundler (ESBuild)             |
| React Router v6   | Client-side routing (Data router API)                 |
| TanStack Query v5 | Async state, caching, refetching                      |
| React Hook Form   | Performant form state management                      |
| Zod               | Schema validation + type inference                    |
| Axios             | HTTP client with interceptor abstraction              |
| Tailwind CSS 3    | Utility-first styling with CSS variable tokens        |
| Radix UI          | Accessible headless component primitives              |
| Lucide React      | Icon library                                          |

### Path Aliases

| Alias            | Resolves To                    |
| :--------------- | :----------------------------- |
| `@/*`            | `frontend/src/*`               |
| `@hostel/shared` | `packages/shared/src/index.ts` |

### Design System

- **Color tokens** defined as CSS custom properties in `index.css` (light + dark)
- **Dark mode** toggled via `.dark` class on `<html>` — persisted in `localStorage`
- **Typography** uses Inter font from Google Fonts
- **Component architecture** follows shadcn/ui pattern (Radix primitives + CVA variants)

### State Management Strategy

```text
Mock Data (mocks/)
    └─► Page Component
            └─► Local useState / useMemo
                    └─► TanStack Query (ready for backend — currently unused)
                            └─► Axios apiClient (services/api/client.ts)
```

When the backend is added, the only change needed is replacing the mock data source with TanStack Query hooks that call the Axios client.

---

## 4. Application Routes

| Path             | Layout       | Component            | Description                                               |
| :--------------- | :----------- | :------------------- | :-------------------------------------------------------- |
| `/login`         | `AuthLayout` | `LoginPage`          | Warden authentication (demo mode)                         |
| `/dashboard`     | `AppLayout`  | `DashboardPage`      | Metrics, recent payments, pending dues, new registrations |
| `/students`      | `AppLayout`  | `StudentsPage`       | Full student directory with search + filter + pagination  |
| `/students/:id`  | `AppLayout`  | `StudentDetailsPage` | Student profile, payment history, guardian info           |
| `/payments`      | `AppLayout`  | `PaymentsPage`       | Payment ledger + record payment dialog                    |
| `/pending-fees`  | `AppLayout`  | `PendingFeesPage`    | Overdue fee tracker with aging analysis                   |
| `/announcements` | `AppLayout`  | `AnnouncementsPage`  | Notice board + send announcement dialog                   |
| `/reports`       | `AppLayout`  | `ReportsPage`        | Financial + occupancy analytics                           |
| `/settings`      | `AppLayout`  | `SettingsPage`       | Hostel config, warden profile, payment QR setup           |
| `/audit-logs`    | `AppLayout`  | `AuditLogsPage`      | Immutable activity audit trail                            |
| `*`              | `AppLayout`  | `NotFoundPage`       | 404 catch-all                                             |

---

## 5. Shared Package (`/packages/shared`)

The `@hostel/shared` package ensures type safety across frontend and (eventually) backend:

```typescript
// Domain interfaces: Student, Payment, Announcement, AuditLog, User, etc.
export * from "./types/index.js";

// Zod schemas: loginSchema, addStudentSchema, recordPaymentSchema, etc.
export * from "./schemas/index.js";

// Constants: USER_ROLES, PAYMENT_STATUS, STUDENT_STATUS, etc.
export * from "./constants/index.js";
```

Both `frontend/vite.config.ts` and `frontend/tsconfig.json` resolve `@hostel/shared` to the TypeScript source directly (no build step required during development).

---

## 6. Backend Plan (Next Phase)

The `backend/` directory is currently a placeholder. The planned implementation:

```text
backend/
├── src/
│   ├── routes/           # Fastify route handlers
│   ├── services/         # Business logic (fee calc, overdue detection)
│   ├── middleware/       # Auth, validation, error handling
│   └── index.ts          # Server entry point
├── prisma/
│   ├── schema.prisma     # Database schema
│   └── seed.ts           # Seed data
├── .env.example          # Backend secrets (NEVER commit .env)
└── package.json          # @hostel/backend
```

### Backend Environment Variables (Backend Only — Never Frontend)

```bash
# backend/.env — NEVER use VITE_ prefix here
DATABASE_URL="file:./dev.db"
JWT_SECRET="..."
JWT_EXPIRES_IN="7d"
BCRYPT_SALT_ROUNDS=12
PORT=3000
NODE_ENV=development
```

---

## 7. Environment Variable Security Policy

| Variable Type              | Location        | Prefix | Safe in Browser? |
| :------------------------- | :-------------- | :----- | :--------------- |
| App name, version          | `frontend/.env` | VITE_  | ✅ Yes           |
| Backend API base URL       | `frontend/.env` | VITE_  | ✅ Yes           |
| Database connection string | `backend/.env`  | (none) | ❌ Never         |
| JWT secret                 | `backend/.env`  | (none) | ❌ Never         |
| Email API keys             | `backend/.env`  | (none) | ❌ Never         |
| Encryption keys            | `backend/.env`  | (none) | ❌ Never         |
