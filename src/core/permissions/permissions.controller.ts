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
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto, UpdatePermissionDto } from './permission.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TenantGuard } from '../auth/tenant.guard';
import { TenantId } from '../tenant/tenant.decorator';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { PaginationDto } from '../../common/dto/pagination.dto';

@ApiTags('core/permissions')
@ApiBearerAuth()
@ApiHeader({ name: 'x-organization-id', required: false })
@UseGuards(JwtAuthGuard, TenantGuard, RolesGuard)
@Controller('core/permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Post()
  @Roles('ADMIN', 'SUPER_ADMIN')
  @ApiOperation({ summary: 'Create a new permission' })
  create(
    @TenantId() organizationId: string | null,
    @Body() createPermissionDto: CreatePermissionDto,
  ) {
    return this.permissionsService.create(organizationId, createPermissionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all permissions' })
  findAll(
    @TenantId() organizationId: string | null,
    @Query() paginationDto: PaginationDto,
  ) {
    return this.permissionsService.findAll(organizationId, paginationDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a permission by ID' })
  findOne(@TenantId() organizationId: string | null, @Param('id') id: string) {
    return this.permissionsService.findOne(organizationId, id);
  }

  @Patch(':id')
  @Roles('ADMIN', 'SUPER_ADMIN')
  @ApiOperation({ summary: 'Update a permission' })
  update(
    @TenantId() organizationId: string | null,
    @Param('id') id: string,
    @Body() updatePermissionDto: UpdatePermissionDto,
  ) {
    return this.permissionsService.update(
      organizationId,
      id,
      updatePermissionDto,
    );
  }

  @Delete(':id')
  @Roles('ADMIN', 'SUPER_ADMIN')
  @ApiOperation({ summary: 'Delete a permission' })
  remove(@TenantId() organizationId: string | null, @Param('id') id: string) {
    return this.permissionsService.remove(organizationId, id);
  }
}
