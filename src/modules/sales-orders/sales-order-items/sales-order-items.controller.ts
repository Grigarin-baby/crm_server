import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiHeader,
  ApiQuery,
} from '@nestjs/swagger';
import { SalesOrderItemsService } from './sales-order-items.service';
import {
  CreateSalesOrderItemDto,
  UpdateSalesOrderItemDto,
} from './sales-order-item.dto';
import { JwtAuthGuard } from '../../../core/auth/jwt-auth.guard';
import { TenantGuard } from '../../../core/auth/tenant.guard';
import { TenantId } from '../../../core/tenant/tenant.decorator';
import { RolesGuard } from '../../../core/auth/roles.guard';

@ApiTags('sales-order-items')
@ApiBearerAuth()
@ApiHeader({ name: 'x-organization-id', required: true })
@UseGuards(JwtAuthGuard, TenantGuard, RolesGuard)
@Controller('modules/sales-order-items')
export class SalesOrderItemsController {
  constructor(
    private readonly salesOrderItemsService: SalesOrderItemsService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Add a new item to a sales order' })
  create(
    @TenantId() organizationId: string,
    @Body() createSalesOrderItemDto: CreateSalesOrderItemDto,
  ) {
    return this.salesOrderItemsService.create(
      organizationId,
      createSalesOrderItemDto,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Get all sales order items' })
  @ApiQuery({ name: 'salesOrderId', required: false })
  findAll(
    @TenantId() organizationId: string,
    @Query('salesOrderId') salesOrderId?: string,
  ) {
    return this.salesOrderItemsService.findAll(organizationId, salesOrderId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a sales order item by ID' })
  findOne(@TenantId() organizationId: string, @Param('id') id: string) {
    return this.salesOrderItemsService.findOne(organizationId, id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a sales order item' })
  update(
    @TenantId() organizationId: string,
    @Param('id') id: string,
    @Body() updateSalesOrderItemDto: UpdateSalesOrderItemDto,
  ) {
    return this.salesOrderItemsService.update(
      organizationId,
      id,
      updateSalesOrderItemDto,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove an item from a sales order' })
  remove(@TenantId() organizationId: string, @Param('id') id: string) {
    return this.salesOrderItemsService.remove(organizationId, id);
  }
}
