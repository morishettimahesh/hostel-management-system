# Hostel Management & Fee Tracking System

A production-ready hostel management system for wardens to manage students, monthly hostel fees, payments, pending dues, announcements, reports, and related administrative operations.

> **Current Status (Phase 2 — Frontend Complete):** The frontend application shell, design system, all pages, routing, shared components, and mock data are fully implemented. The repository has been reorganised into a clean `frontend/` / `backend/` structure. Backend services, database persistence, and real API integration will be added in subsequent phases.

---

## Repository Architecture

```text
hostel-management-system/
│
├── frontend/                  # React + TypeScript + Vite frontend application
│   ├── public/                # Static assets
│   ├── src/
│   │   ├── assets/            # Image and media assets
│   │   ├── components/
│   │   │   ├── ui/            # Reusable UI primitives (shadcn/ui architecture)
│   │   │   ├── shared/        # Composite layout components (Header, Sidebar)
│   │   │   ├── students/      # Student-specific dialog components
│   │   │   ├── payments/      # Payment-specific dialog components
│   │   │   └── announcements/ # Announcement dialog components
│   │   ├── constants/         # App-wide constants and configuration
│   │   ├── hooks/             # Custom React hooks (useTheme, etc.)
│   │   ├── layouts/           # AppLayout (Sidebar+Header) and AuthLayout
│   │   ├── lib/               # Utility helpers (cn)
│   │   ├── mocks/             # Mock data for frontend-first development
│   │   ├── pages/             # Route-level page components
│   │   ├── routes/            # React Router route registry
│   │   ├── schemas/           # Client-side Zod validation schemas
│   │   ├── services/api/      # Typed Axios HTTP client abstraction
│   │   ├── types/             # Frontend TypeScript type declarations
│   │   ├── App.tsx            # Root provider (QueryClient + Router)
│   │   ├── index.css          # Tailwind directives + CSS variable design tokens
│   │   └── main.tsx           # React DOM mount point
│   ├── index.html
│   ├── package.json           # @hostel/frontend
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   └── vite.config.ts
│
├── backend/                   # Node.js / TypeScript API server (PLANNED — not yet implemented)
│   └── .gitkeep               # Placeholder so Git tracks the directory
│
├── packages/
│   └── shared/                # Shared TypeScript types, Zod schemas, and constants
│       └── src/
│           ├── types/         # Domain model interfaces (Student, Payment, etc.)
│           ├── schemas/       # Shared Zod validation schemas
│           ├── constants/     # Shared status enums and constants
│           └── index.ts
│
├── docs/
│   └── architecture.md        # Full technical architecture documentation
│
├── .gitignore
├── .prettierrc
├── .prettierignore
├── eslint.config.js
├── package.json               # Monorepo root scripts
├── pnpm-workspace.yaml        # pnpm workspace configuration
└── tsconfig.json              # Strict TypeScript base configuration
```

---

## Technology Stack

### Frontend (`/frontend`)

| Concern              | Technology                                          |
| :------------------- | :-------------------------------------------------- |
| Framework            | React 18 (Strict Mode)                              |
| Language             | TypeScript 5 (strict mode)                          |
| Build Tool           | Vite 6                                              |
| Styling              | Tailwind CSS 3 + CSS custom properties              |
| UI Components        | Radix UI primitives (shadcn/ui arch) + Lucide Icons |
| Client Routing       | React Router v6                                     |
| Server State / Cache | TanStack Query v5                                   |
| Form Management      | React Hook Form + Zod resolvers                     |
| HTTP Client          | Axios (typed abstraction layer)                     |
| Dark Mode            | CSS class strategy via `useTheme` hook              |

### Shared Package (`/packages/shared`)

- TypeScript domain interfaces (Student, Payment, Announcement, etc.)
- Zod validation schemas shared between frontend and backend
- Shared status constants and enums

### Backend (`/backend`) — _Planned_

> Not yet implemented. Will be added in a later phase.

| Concern      | Planned Technology                     |
| :----------- | :------------------------------------- |
| Runtime      | Node.js + TypeScript                   |
| Framework    | Fastify or Express                     |
| ORM          | Prisma                                 |
| Dev Database | SQLite (zero-config local development) |
| Prod DB      | PostgreSQL                             |

### Monorepo Tooling

- **Package Manager:** `pnpm` v12 with workspaces
- **Linting:** ESLint 9 (Flat Config) + TypeScript ESLint
- **Formatting:** Prettier

---

## Development Status: Frontend-First

The project is currently in **frontend-first** mode:

- ✅ All pages and routes are fully implemented with mock data
- ✅ Design system, dark mode, and UI components are complete
- ✅ TypeScript types and Zod schemas are established in `@hostel/shared`
- ✅ Axios API client is scaffolded and ready for backend connection
- 🔲 Backend REST API (Fastify + Prisma + SQLite) — _next phase_
- 🔲 Real authentication (JWT sessions) — _next phase_
- 🔲 Database persistence — _next phase_
- 🔲 Frontend API integration (replace mocks) — _next phase_

---

## Local Development Setup

### Prerequisites

- **Node.js** v18.0.0 or later (v20+ recommended)
- **pnpm** v9.0.0 or later

### 1. Clone the Repository

```bash
git clone https://github.com/morishettimahesh/hostel-management-system.git
cd hostel-management-system
```

### 2. Configure Environment Variables

```bash
# Frontend environment (VITE_ prefix = safe for browser)
cp frontend/.env.example frontend/.env
```

> **Security Note:** Variables prefixed with `VITE_` are publicly visible in the browser bundle. Never put database credentials, JWT secrets, private keys, or passwords into frontend `.env` files.

### 3. Install Dependencies

```bash
pnpm install
```

### 4. Start the Development Server

```bash
pnpm dev
```

The frontend will be available at: **http://localhost:5173**

---

## Available Commands

Run all commands from the **repository root**:

| Command             | Description                                                |
| :------------------ | :--------------------------------------------------------- |
| `pnpm dev`          | Start the frontend Vite development server (HMR enabled)   |
| `pnpm build`        | Build the production frontend bundle                       |
| `pnpm typecheck`    | Run strict TypeScript checks across all workspace packages |
| `pnpm lint`         | Run ESLint across all TypeScript and React source files    |
| `pnpm format`       | Auto-format all source files using Prettier                |
| `pnpm format:check` | Check code formatting compliance (CI-safe)                 |

---

## Application Routes

| Path             | Layout       | Description                                              |
| :--------------- | :----------- | :------------------------------------------------------- |
| `/login`         | `AuthLayout` | Warden authentication screen                             |
| `/dashboard`     | `AppLayout`  | High-level metrics: occupancy, fees collected, overdue   |
| `/students`      | `AppLayout`  | Student directory with search, filter, and Add Student   |
| `/students/:id`  | `AppLayout`  | Student profile, payment history, guardian contacts      |
| `/payments`      | `AppLayout`  | Record payments (UPI / Cash / Transfer), payment ledger  |
| `/pending-fees`  | `AppLayout`  | Overdue fee tracker with reminder triggers               |
| `/announcements` | `AppLayout`  | Notice board, send broadcast announcements by priority   |
| `/reports`       | `AppLayout`  | Financial statements, occupancy analytics                |
| `/settings`      | `AppLayout`  | Hostel details, warden profile, payment QR configuration |
| `/audit-logs`    | `AppLayout`  | Immutable activity audit trail                           |

---

## Environment Variables Reference

All frontend environment variables use the `VITE_` prefix and are **safe for browser exposure**:

```bash
# frontend/.env
VITE_APP_NAME="Hostel Management & Fee Tracking System"
VITE_APP_VERSION="0.1.0"
VITE_API_BASE_URL="http://localhost:3000/api"
VITE_API_TIMEOUT="15000"
```

> Backend environment variables (database URL, JWT secret, email keys) will live exclusively in `backend/.env` and will **never** be committed to version control.
