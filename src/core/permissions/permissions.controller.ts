import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiHeader } from '@nestjs/swagger';
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto, UpdatePermissionDto } from './permission.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TenantGuard } from '../auth/tenant.guard';
import { TenantId } from '../tenant/tenant.decorator';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';

@ApiTags('core/permissions')
@ApiBearerAuth()
@ApiHeader({ name: 'x-organization-id', required: true })
@UseGuards(JwtAuthGuard, TenantGuard, RolesGuard)
@Controller('core/permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Post()
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Create a new permission' })
  create(@TenantId() organizationId: string, @Body() createPermissionDto: CreatePermissionDto) {
    return this.permissionsService.create(organizationId, createPermissionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all permissions' })
  findAll(@TenantId() organizationId: string) {
    return this.permissionsService.findAll(organizationId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a permission by ID' })
  findOne(@TenantId() organizationId: string, @Param('id') id: string) {
    return this.permissionsService.findOne(organizationId, id);
  }

  @Patch(':id')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Update a permission' })
  update(@TenantId() organizationId: string, @Param('id') id: string, @Body() updatePermissionDto: UpdatePermissionDto) {
    return this.permissionsService.update(organizationId, id, updatePermissionDto);
  }

  @Delete(':id')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Delete a permission' })
  remove(@TenantId() organizationId: string, @Param('id') id: string) {
    return this.permissionsService.remove(organizationId, id);
  }
}
