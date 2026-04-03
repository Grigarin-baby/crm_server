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
import { ProductsService } from './products.service';
import { CreateProductDto, UpdateProductDto } from './product.dto';
import { JwtAuthGuard } from '../../core/auth/jwt-auth.guard';
import { TenantGuard } from '../../core/auth/tenant.guard';
import { TenantId } from '../../core/tenant/tenant.decorator';
import { RolesGuard } from '../../core/auth/roles.guard';
import { PaginationDto } from '../../common/dto/pagination.dto';

@ApiTags('products')
@ApiBearerAuth()
@ApiHeader({ name: 'x-organization-id', required: true })
@UseGuards(JwtAuthGuard, TenantGuard, RolesGuard)
@Controller('modules/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  create(
    @TenantId() organizationId: string,
    @Body() createProductDto: CreateProductDto,
  ) {
    return this.productsService.create(organizationId, createProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all products' })
  findAll(
    @TenantId() organizationId: string,
    @Query() paginationDto: PaginationDto,
  ) {
    return this.productsService.findAll(organizationId, paginationDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a product by ID' })
  findOne(@TenantId() organizationId: string, @Param('id') id: string) {
    return this.productsService.findOne(organizationId, id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a product' })
  update(
    @TenantId() organizationId: string,
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(organizationId, id, updateProductDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product' })
  remove(@TenantId() organizationId: string, @Param('id') id: string) {
    return this.productsService.remove(organizationId, id);
  }
}
