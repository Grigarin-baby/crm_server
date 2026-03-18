import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiHeader, ApiQuery } from '@nestjs/swagger';
import { PurchaseOrderItemsService } from './purchase-order-items.service';
import { CreatePurchaseOrderItemDto, UpdatePurchaseOrderItemDto } from './purchase-order-item.dto';
import { JwtAuthGuard } from '../../core/auth/jwt-auth.guard';
import { TenantGuard } from '../../core/auth/tenant.guard';
import { TenantId } from '../../core/tenant/tenant.decorator';
import { RolesGuard } from '../../core/auth/roles.guard';

@ApiTags('purchase-order-items')
@ApiBearerAuth()
@ApiHeader({ name: 'x-organization-id', required: true })
@UseGuards(JwtAuthGuard, TenantGuard, RolesGuard)
@Controller('modules/purchase-order-items')
export class PurchaseOrderItemsController {
  constructor(private readonly purchaseOrderItemsService: PurchaseOrderItemsService) {}

  @Post()
  @ApiOperation({ summary: 'Add a new item to a purchase order' })
  create(@TenantId() organizationId: string, @Body() createPurchaseOrderItemDto: CreatePurchaseOrderItemDto) {
    return this.purchaseOrderItemsService.create(organizationId, createPurchaseOrderItemDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all purchase order items' })
  @ApiQuery({ name: 'purchaseOrderId', required: false })
  findAll(@TenantId() organizationId: string, @Query('purchaseOrderId') purchaseOrderId?: string) {
    return this.purchaseOrderItemsService.findAll(organizationId, purchaseOrderId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a purchase order item by ID' })
  findOne(@TenantId() organizationId: string, @Param('id') id: string) {
    return this.purchaseOrderItemsService.findOne(organizationId, id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a purchase order item' })
  update(@TenantId() organizationId: string, @Param('id') id: string, @Body() updatePurchaseOrderItemDto: UpdatePurchaseOrderItemDto) {
    return this.purchaseOrderItemsService.update(organizationId, id, updatePurchaseOrderItemDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove an item from a purchase order' })
  remove(@TenantId() organizationId: string, @Param('id') id: string) {
    return this.purchaseOrderItemsService.remove(organizationId, id);
  }
}
