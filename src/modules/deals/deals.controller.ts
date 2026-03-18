import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiHeader,
} from '@nestjs/swagger';
import { DealsService } from './deals.service';
import { CreateDealDto, UpdateDealDto } from './deal.dto';
import { JwtAuthGuard } from '../../core/auth/jwt-auth.guard';
import { TenantGuard } from '../../core/auth/tenant.guard';
import { TenantId } from '../../core/tenant/tenant.decorator';
import { RolesGuard } from '../../core/auth/roles.guard';

@ApiTags('deals')
@ApiBearerAuth()
@ApiHeader({ name: 'x-organization-id', required: true })
@UseGuards(JwtAuthGuard, TenantGuard, RolesGuard)
@Controller('modules/deals')
export class DealsController {
  constructor(private readonly dealsService: DealsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new deal' })
  create(
    @TenantId() organizationId: string,
    @Body() createDealDto: CreateDealDto,
  ) {
    return this.dealsService.create(organizationId, createDealDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all deals' })
  findAll(@TenantId() organizationId: string) {
    return this.dealsService.findAll(organizationId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a deal by ID' })
  findOne(@TenantId() organizationId: string, @Param('id') id: string) {
    return this.dealsService.findOne(organizationId, id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a deal' })
  update(
    @TenantId() organizationId: string,
    @Param('id') id: string,
    @Body() updateDealDto: UpdateDealDto,
  ) {
    return this.dealsService.update(organizationId, id, updateDealDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a deal' })
  remove(@TenantId() organizationId: string, @Param('id') id: string) {
    return this.dealsService.remove(organizationId, id);
  }
}
