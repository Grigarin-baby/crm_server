import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './core/prisma/prisma.module';
import { TenantModule } from './core/tenant/tenant.module';
import { TenantMiddleware } from './core/tenant/tenant.middleware';
import { OrganizationsModule } from './core/organizations/organizations.module';
import { BranchesModule } from './core/branches/branches.module';
import { UsersModule } from './core/users/users.module';
import { AuthModule } from './core/auth/auth.module';
import { LeadsModule } from './modules/leads/leads.module';
import { ContactsModule } from './modules/contacts/contacts.module';
import { CustomersModule } from './modules/customers/customers.module';
import { DealsModule } from './modules/deals/deals.module';
import { QuotesModule } from './modules/quotes/quotes.module';
import { SalesOrdersModule } from './modules/sales-orders/sales-orders.module';
import { PurchaseOrdersModule } from './modules/purchase-orders/purchase-orders.module';
import { InvoicesModule } from './modules/invoices/invoices.module';
import { MeetingsModule } from './activity/meetings/meetings.module';
import { CallsModule } from './activity/calls/calls.module';
import { TasksModule } from './activity/tasks/tasks.module';
import { TicketsModule } from './service/tickets/tickets.module';
import { RolesModule } from './core/roles/roles.module';
import { PermissionsModule } from './core/permissions/permissions.module';

import { VendorsModule } from './modules/vendors/vendors.module';
import { ProductsModule } from './modules/products/products.module';

import { QuoteItemsModule } from './modules/quotes/quote-items/quote-items.module';
import { SalesOrderItemsModule } from './modules/sales-orders/sales-order-items/sales-order-items.module';
import { InvoiceItemsModule } from './modules/invoices/invoice-items/invoice-items.module';
import { PurchaseOrderItemsModule } from './modules/purchase-orders/purchase-order-items/purchase-order-items.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    TenantModule,
    OrganizationsModule,
    BranchesModule,
    UsersModule,
    AuthModule,
    LeadsModule,
    ContactsModule,
    CustomersModule,
    VendorsModule,
    ProductsModule,
    QuoteItemsModule,
    SalesOrderItemsModule,
    InvoiceItemsModule,
    PurchaseOrderItemsModule,
    DealsModule,
    QuotesModule,
    SalesOrdersModule,
    PurchaseOrdersModule,
    InvoicesModule,
    MeetingsModule,
    CallsModule,
    TasksModule,
    TicketsModule,
    RolesModule,
    PermissionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TenantMiddleware).forRoutes('*');
  }
}
