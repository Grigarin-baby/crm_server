import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiHeader } from '@nestjs/swagger';
import { PurchaseOrdersService } from './purchase-orders.service';
import { CreatePurchaseOrderDto, UpdatePurchaseOrderDto } from './purchase-order.dto';
import { JwtAuthGuard } from '../../core/auth/jwt-auth.guard';
import { TenantGuard } from '../../core/auth/tenant.guard';
import { TenantId } from '../../core/tenant/tenant.decorator';
import { RolesGuard } from '../../core/auth/roles.guard';

@ApiTags('purchase-orders')
@ApiBearerAuth()
@ApiHeader({ name: 'x-organization-id', required: true })
@UseGuards(JwtAuthGuard, TenantGuard, RolesGuard)
@Controller('modules/purchase-orders')
export class PurchaseOrdersController {
  constructor(private readonly purchaseOrdersService: PurchaseOrdersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new purchase order' })
  create(@TenantId() organizationId: string, @Body() createPurchaseOrderDto: CreatePurchaseOrderDto) {
    return this.purchaseOrdersService.create(organizationId, createPurchaseOrderDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all purchase orders' })
  findAll(@TenantId() organizationId: string) {
    return this.purchaseOrdersService.findAll(organizationId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a purchase order by ID' })
  findOne(@TenantId() organizationId: string, @Param('id') id: string) {
    return this.purchaseOrdersService.findOne(organizationId, id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a purchase order' })
  update(@TenantId() organizationId: string, @Param('id') id: string, @Body() updatePurchaseOrderDto: UpdatePurchaseOrderDto) {
    return this.purchaseOrdersService.update(organizationId, id, updatePurchaseOrderDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a purchase order' })
  remove(@TenantId() organizationId: string, @Param('id') id: string) {
    return this.purchaseOrdersService.remove(organizationId, id);
  }
}
