# CRM Backend Project Summary

This document provides a high-level overview of the implemented multi-tenant SaaS CRM backend.

## 1. Core Architecture
- **Framework:** NestJS
- **ORM:** Prisma (PostgreSQL)
- **Multi-Tenancy:** Data isolation using `organization_id` on every table.
- **Security:** JWT-based Authentication, Tenant Guards, and Role-Based Access Control (RBAC).
- **API Docs:** Swagger UI available at `/api`.

## 2. Modules & Database Tables

All tables are linked to an **Organization** via `organizationId` (FK).

### Core Tables
| Table | Description | Main Relations |
|-------|-------------|----------------|
| **Organization** | Tenant companies | - |
| **Branch** | Office locations | belongs to Organization |
| **User** | Employees/Users | belongs to Organization & Branch; has a Role |
| **Role** | Permission groups | belongs to Organization; links to Permissions |
| **Permission**| Specific actions | belongs to Organization |

### CRM Business Tables
| Table | Description | Main Relations |
|-------|-------------|----------------|
| **Lead** | Potential customers | assigned to User |
| **Customer** | Company profiles | - |
| **Contact** | Individuals | linked to Customer |
| **Deal** | Sales opportunities | linked to Customer; assigned to User |
| **Quote** | Pricing documents | linked to Customer |
| **SalesOrder** | Confirmed sales | linked to Customer |
| **PurchaseOrder**| Vendor procurement | - |
| **Invoice** | Billing documents | linked to Customer |

### Activity & Service Tables
| Table | Description | Main Relations |
|-------|-------------|----------------|
| **Meeting** | Scheduled events | - |
| **Call** | Phone logs | linked to Contact |
| **Task** | To-do items | assigned to User |
| **Ticket** | Support requests | linked to Customer; assigned to Agent (User) |

## 3. API Endpoints Summary

Every module follows a standard RESTful pattern. All requests (except Auth and Org Creation) require an `x-organization-id` header and a `Bearer` token.

### Authentication (`/core/auth`)
- `POST /register`: Register a new user and organization.
- `POST /login`: Login to get a JWT token.

### Administrative (`/core/...`)
- `/organizations`: CRUD for tenants (Admin only).
- `/branches`: CRUD for office locations.
- `/users`: CRUD for employee management.
- `/roles` & `/permissions`: RBAC management.

### CRM Modules (`/modules/...`)
- `/leads`: Manage leads and tracking.
- `/contacts`: Manage individual contacts.
- `/customers`: Manage client company profiles.
- `/deals`: Manage sales pipeline and stages.
- `/quotes`, `/sales-orders`, `/purchase-orders`, `/invoices`: Transaction management.

### Activity & Service (`/activity/...` & `/service/...`)
- `/activity/meetings`: Schedule and track meetings.
- `/activity/calls`: Log phone interactions.
- `/activity/tasks`: Task management.
- `/service/tickets`: Support ticketing system.
