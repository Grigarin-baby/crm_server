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
} from '@nestjs/swagger';
import { SalesOrdersService } from './sales-orders.service';
import { CreateSalesOrderDto, UpdateSalesOrderDto } from './sales-order.dto';
import { JwtAuthGuard } from '../../core/auth/jwt-auth.guard';
import { TenantGuard } from '../../core/auth/tenant.guard';
import { TenantId } from '../../core/tenant/tenant.decorator';
import { RolesGuard } from '../../core/auth/roles.guard';
import { PaginationDto } from '../../common/dto/pagination.dto';

@ApiTags('sales-orders')
@ApiBearerAuth()
@ApiHeader({ name: 'x-organization-id', required: true })
@UseGuards(JwtAuthGuard, TenantGuard, RolesGuard)
@Controller('modules/sales-orders')
export class SalesOrdersController {
  constructor(private readonly salesOrdersService: SalesOrdersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new sales order' })
  create(
    @TenantId() organizationId: string,
    @Body() createSalesOrderDto: CreateSalesOrderDto,
  ) {
    return this.salesOrdersService.create(organizationId, createSalesOrderDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all sales orders' })
  findAll(
    @TenantId() organizationId: string,
    @Query() paginationDto: PaginationDto,
  ) {
    return this.salesOrdersService.findAll(organizationId, paginationDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a sales order by ID' })
  findOne(@TenantId() organizationId: string, @Param('id') id: string) {
    return this.salesOrdersService.findOne(organizationId, id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a sales order' })
  update(
    @TenantId() organizationId: string,
    @Param('id') id: string,
    @Body() updateSalesOrderDto: UpdateSalesOrderDto,
  ) {
    return this.salesOrdersService.update(
      organizationId,
      id,
      updateSalesOrderDto,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a sales order' })
  remove(@TenantId() organizationId: string, @Param('id') id: string) {
    return this.salesOrdersService.remove(organizationId, id);
  }
}
