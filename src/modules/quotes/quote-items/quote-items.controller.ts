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
import { QuoteItemsService } from './quote-items.service';
import { CreateQuoteItemDto, UpdateQuoteItemDto } from './quote-item.dto';
import { JwtAuthGuard } from '../../../core/auth/jwt-auth.guard';
import { TenantGuard } from '../../../core/auth/tenant.guard';
import { TenantId } from '../../../core/tenant/tenant.decorator';
import { RolesGuard } from '../../../core/auth/roles.guard';
import { PaginationDto } from '../../../common/dto/pagination.dto';

@ApiTags('quote-items')
@ApiBearerAuth()
@ApiHeader({ name: 'x-organization-id', required: true })
@UseGuards(JwtAuthGuard, TenantGuard, RolesGuard)
@Controller('modules/quote-items')
export class QuoteItemsController {
  constructor(private readonly quoteItemsService: QuoteItemsService) {}

  @Post()
  @ApiOperation({ summary: 'Add a new item to a quote' })
  create(
    @TenantId() organizationId: string,
    @Body() createQuoteItemDto: CreateQuoteItemDto,
  ) {
    return this.quoteItemsService.create(organizationId, createQuoteItemDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all quote items' })
  @ApiQuery({ name: 'quoteId', required: false })
  findAll(
    @TenantId() organizationId: string,
    @Query() paginationDto: PaginationDto,
    @Query('quoteId') quoteId?: string,
  ) {
    return this.quoteItemsService.findAll(
      organizationId,
      paginationDto,
      quoteId,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a quote item by ID' })
  findOne(@TenantId() organizationId: string, @Param('id') id: string) {
    return this.quoteItemsService.findOne(organizationId, id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a quote item' })
  update(
    @TenantId() organizationId: string,
    @Param('id') id: string,
    @Body() updateQuoteItemDto: UpdateQuoteItemDto,
  ) {
    return this.quoteItemsService.update(
      organizationId,
      id,
      updateQuoteItemDto,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove an item from a quote' })
  remove(@TenantId() organizationId: string, @Param('id') id: string) {
    return this.quoteItemsService.remove(organizationId, id);
  }
}
