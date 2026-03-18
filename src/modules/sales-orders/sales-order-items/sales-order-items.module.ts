import { Module } from '@nestjs/common';
import { SalesOrderItemsService } from './sales-order-items.service';
import { SalesOrderItemsController } from './sales-order-items.controller';

@Module({
  controllers: [SalesOrderItemsController],
  providers: [SalesOrderItemsService],
  exports: [SalesOrderItemsService],
})
export class SalesOrderItemsModule {}
