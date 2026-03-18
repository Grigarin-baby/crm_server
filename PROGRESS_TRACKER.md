# CRM Backend Progress Tracker

## Phase 1: Infrastructure & Database Setup
- [x] Install and configure `@nestjs/config` for environment variables.
- [x] Install and initialize Prisma ORM (`npx prisma init`).
- [x] Set up base directory structure (`src/core`, `src/modules`, `src/activity`, `src/service`).
- [x] Install validation (`class-validator`, `class-transformer`) and swagger (`@nestjs/swagger`) packages.

## Phase 2: Core SaaS & Multi-Tenancy Architecture
- [x] Define the base schema with `organization_id` in `schema.prisma`.
- [x] Create `TenantInterceptor` or `TenantMiddleware` to extract organization ID from request.
- [x] Configure Prisma client extension or middleware for global scoping by `organization_id`.

## Phase 3: Core Modules (Administrative)
- [x] Create `Organizations` module, controller, service, and Prisma schema.
- [x] Create `Branches` module, controller, service, and Prisma schema.
- [x] Create `Users` module, controller, service, and Prisma schema.
- [x] Create `Roles` and `Permissions` schema and initial logic.

## Phase 4: Authentication & Authorization
- [x] Install `@nestjs/jwt` and `@nestjs/passport` along with `passport-jwt`.
- [x] Create `Auth` module, service, and controller for login/registration.
- [x] Implement `JwtAuthGuard`.
- [x] Implement `TenantGuard`.
- [x] Implement `RolesGuard`.

## Phase 5: CRM Business Modules
- [x] Create `Leads` module (Schema, Service, Controller).
- [x] Create `Contacts` module.
- [x] Create `Customers` module.
- [x] Create `Deals` module.
- [x] Create `Quotes` module.
- [x] Create `SalesOrders` module.
- [x] Create `PurchaseOrders` module.
- [x] Create `Invoices` module.

## Phase 6: Activity & Service Modules
- [x] Create `Activity` module (Meetings, Calls, Tasks schemas and logic).
- [x] Create `Service` module (Tickets schema and logic).

## Phase 7: API Documentation & Validation
- [x] Configure Swagger in `main.ts`.
- [x] Set up global ValidationPipe in `main.ts`.
- [x] Add Swagger decorators to all controllers and DTOs.

## Phase 8: Testing
- [ ] Write unit tests for core services (Auth, Leads conversion).
- [ ] Write E2E tests for multi-tenancy endpoints.
