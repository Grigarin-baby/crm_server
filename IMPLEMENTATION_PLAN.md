# CRM Backend Implementation Plan

This document outlines the phased approach to building the NestJS-based Multi-Tenant SaaS CRM system according to the provided technical documentation.

## Phase 1: Infrastructure & Database Setup
*   **Database Selection & ORM Setup:** Choose and configure an ORM (e.g., TypeORM or Prisma) to interact with a relational database (e.g., PostgreSQL or MySQL).
*   **Environment Configuration:** Set up `@nestjs/config` for managing environment variables (database credentials, JWT secrets, etc.).
*   **Base Architecture:** Ensure the project follows the recommended folder structure:
    *   `src/core/` (Multi-tenancy, Auth, Users, Organizations)
    *   `src/modules/` (Leads, Contacts, Deals, etc.)
    *   `src/activity/` (Meetings, Calls, Tasks)
    *   `src/service/` (Tickets)

## Phase 2: Core SaaS & Multi-Tenancy Architecture
*   **Data Isolation Strategy:** Implement a base entity/schema that includes `organization_id` to ensure all tenant data is strictly segregated.
*   **Tenant Resolution Middleware/Interceptor:** Create a mechanism to resolve the current tenant from incoming requests (via Subdomain, `X-Organization-ID` header, or JWT payload).
*   **Global Scoping:** Configure the ORM to automatically append `organization_id = current_tenant_id` to all database queries to prevent cross-tenant data leakage.

## Phase 3: Core Modules (Administrative)
*   **Organizations Module:** Endpoints to create and manage tenant organizations.
*   **Branches Module:** Endpoints for managing multiple branches under an organization.
*   **Users Module:** Endpoints for user management (employees of an organization).
*   **Roles & Permissions Module:** Define and manage access control matrices (Admin, Sales Manager, Sales Rep, Support Agent).

## Phase 4: Authentication & Authorization
*   **Authentication Module:** Implement login functionality using JWT/OAuth. This must support organization-based login.
*   **Guards:** Create NestJS Guards for:
    *   `JwtAuthGuard`: Verifying the JWT token.
    *   `TenantGuard`: Ensuring the user belongs to the requested organization.
    *   `RolesGuard` / `PermissionsGuard`: Enforcing Role-Based Access Control (RBAC) based on the user's role.

## Phase 5: CRM Business Modules
*   **Leads:** CRUD operations, lead source tracking, and conversion logic (Lead -> Contact/Customer/Deal).
*   **Contacts & Customers:** Managing personal profiles and organization profiles.
*   **Deals (Pipeline):** Tracking revenue opportunities through custom stages (New -> Qualification -> Won/Lost).
*   **Quotes:** Product listing, price, and discount calculations.
*   **Sales Orders & Purchase Orders:** Managing confirmed orders and vendor procurement.
*   **Invoices:** Generation and payment tracking.

## Phase 6: Activity & Service Modules
*   **Activity Module:** Implement sub-modules for Meetings, Calls, and Tasks to track user interactions.
*   **Service (Tickets) Module:** Implement the ticketing system for customer care, including issue categorization and status lifecycles.

## Phase 7: API Documentation & Validation
*   **OpenAPI (Swagger):** Integrate `@nestjs/swagger` to auto-generate API documentation for the frontend team.
*   **Validation:** Implement global validation pipes using `class-validator` and `class-transformer` for all incoming DTOs to ensure data integrity.

## Phase 8: Testing
*   **Unit Testing:** Write tests for critical business logic, especially around lead conversion and price calculations.
*   **E2E Testing:** Create end-to-end tests ensuring the multi-tenancy isolation works correctly across the API.
