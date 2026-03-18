import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiHeader } from '@nestjs/swagger';
import { QuotesService } from './quotes.service';
import { CreateQuoteDto, UpdateQuoteDto } from './quote.dto';
import { JwtAuthGuard } from '../../core/auth/jwt-auth.guard';
import { TenantGuard } from '../../core/auth/tenant.guard';
import { TenantId } from '../../core/tenant/tenant.decorator';
import { RolesGuard } from '../../core/auth/roles.guard';

@ApiTags('quotes')
@ApiBearerAuth()
@ApiHeader({ name: 'x-organization-id', required: true })
@UseGuards(JwtAuthGuard, TenantGuard, RolesGuard)
@Controller('modules/quotes')
export class QuotesController {
  constructor(private readonly quotesService: QuotesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new quote' })
  create(@TenantId() organizationId: string, @Body() createQuoteDto: CreateQuoteDto) {
    return this.quotesService.create(organizationId, createQuoteDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all quotes' })
  findAll(@TenantId() organizationId: string) {
    return this.quotesService.findAll(organizationId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a quote by ID' })
  findOne(@TenantId() organizationId: string, @Param('id') id: string) {
    return this.quotesService.findOne(organizationId, id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a quote' })
  update(@TenantId() organizationId: string, @Param('id') id: string, @Body() updateQuoteDto: UpdateQuoteDto) {
    return this.quotesService.update(organizationId, id, updateQuoteDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a quote' })
  remove(@TenantId() organizationId: string, @Param('id') id: string) {
    return this.quotesService.remove(organizationId, id);
  }
}
