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
import { InvoiceItemsService } from './invoice-items.service';
import { CreateInvoiceItemDto, UpdateInvoiceItemDto } from './invoice-item.dto';
import { JwtAuthGuard } from '../../../core/auth/jwt-auth.guard';
import { TenantGuard } from '../../../core/auth/tenant.guard';
import { TenantId } from '../../../core/tenant/tenant.decorator';
import { RolesGuard } from '../../../core/auth/roles.guard';
import { PaginationDto } from '../../../common/dto/pagination.dto';

@ApiTags('invoice-items')
@ApiBearerAuth()
@ApiHeader({ name: 'x-organization-id', required: true })
@UseGuards(JwtAuthGuard, TenantGuard, RolesGuard)
@Controller('modules/invoice-items')
export class InvoiceItemsController {
  constructor(private readonly invoiceItemsService: InvoiceItemsService) {}

  @Post()
  @ApiOperation({ summary: 'Add a new item to an invoice' })
  create(
    @TenantId() organizationId: string,
    @Body() createInvoiceItemDto: CreateInvoiceItemDto,
  ) {
    return this.invoiceItemsService.create(
      organizationId,
      createInvoiceItemDto,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Get all invoice items' })
  @ApiQuery({ name: 'invoiceId', required: false })
  findAll(
    @TenantId() organizationId: string,
    @Query() paginationDto: PaginationDto,
    @Query('invoiceId') invoiceId?: string,
  ) {
    return this.invoiceItemsService.findAll(
      organizationId,
      paginationDto,
      invoiceId,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an invoice item by ID' })
  findOne(@TenantId() organizationId: string, @Param('id') id: string) {
    return this.invoiceItemsService.findOne(organizationId, id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an invoice item' })
  update(
    @TenantId() organizationId: string,
    @Param('id') id: string,
    @Body() updateInvoiceItemDto: UpdateInvoiceItemDto,
  ) {
    return this.invoiceItemsService.update(
      organizationId,
      id,
      updateInvoiceItemDto,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove an item from an invoice' })
  remove(@TenantId() organizationId: string, @Param('id') id: string) {
    return this.invoiceItemsService.remove(organizationId, id);
  }
}
