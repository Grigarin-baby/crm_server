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
import { LeadsService } from './leads.service';
import { CreateLeadDto, UpdateLeadDto } from './lead.dto';
import { JwtAuthGuard } from '../../core/auth/jwt-auth.guard';
import { TenantGuard } from '../../core/auth/tenant.guard';
import { TenantId } from '../../core/tenant/tenant.decorator';
import { Roles } from '../../core/auth/roles.decorator';
import { RolesGuard } from '../../core/auth/roles.guard';
import { PaginationDto } from '../../common/dto/pagination.dto';

@ApiTags('leads')
@ApiBearerAuth()
@ApiHeader({ name: 'x-organization-id', required: true })
@UseGuards(JwtAuthGuard, TenantGuard, RolesGuard)
@Controller('modules/leads')
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @Post()
  @Roles('ADMIN', 'SALES_MANAGER', 'SALES_REP')
  @ApiOperation({ summary: 'Create a new lead' })
  create(
    @TenantId() organizationId: string,
    @Body() createLeadDto: CreateLeadDto,
  ) {
    return this.leadsService.create(organizationId, createLeadDto);
  }

  @Get()
  @Roles('ADMIN', 'SALES_MANAGER', 'SALES_REP')
  @ApiOperation({ summary: 'Get all leads for organization' })
  findAll(
    @TenantId() organizationId: string,
    @Query() paginationDto: PaginationDto,
  ) {
    return this.leadsService.findAll(organizationId, paginationDto);
  }

  @Get(':id')
  @Roles('ADMIN', 'SALES_MANAGER', 'SALES_REP')
  @ApiOperation({ summary: 'Get a lead by ID' })
  findOne(@TenantId() organizationId: string, @Param('id') id: string) {
    return this.leadsService.findOne(organizationId, id);
  }

  @Patch(':id')
  @Roles('ADMIN', 'SALES_MANAGER', 'SALES_REP')
  @ApiOperation({ summary: 'Update a lead' })
  update(
    @TenantId() organizationId: string,
    @Param('id') id: string,
    @Body() updateLeadDto: UpdateLeadDto,
  ) {
    return this.leadsService.update(organizationId, id, updateLeadDto);
  }

  @Delete(':id')
  @Roles('ADMIN', 'SALES_MANAGER')
  @ApiOperation({ summary: 'Delete a lead' })
  remove(@TenantId() organizationId: string, @Param('id') id: string) {
    return this.leadsService.remove(organizationId, id);
  }
}
