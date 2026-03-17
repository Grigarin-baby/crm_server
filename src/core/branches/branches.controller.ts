import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiHeader } from '@nestjs/swagger';
import { BranchesService } from './branches.service';
import { CreateBranchDto, UpdateBranchDto } from './branch.dto';
import { TenantId } from '../tenant/tenant.decorator';

@ApiTags('branches')
@ApiHeader({ name: 'x-organization-id', required: true })
@Controller('core/branches')
export class BranchesController {
  constructor(private readonly branchesService: BranchesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new branch' })
  create(@TenantId() organizationId: string, @Body() createBranchDto: CreateBranchDto) {
    return this.branchesService.create(organizationId, createBranchDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all branches for organization' })
  findAll(@TenantId() organizationId: string) {
    return this.branchesService.findAll(organizationId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a branch by ID' })
  findOne(@TenantId() organizationId: string, @Param('id') id: string) {
    return this.branchesService.findOne(organizationId, id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a branch' })
  update(
    @TenantId() organizationId: string,
    @Param('id') id: string,
    @Body() updateBranchDto: UpdateBranchDto,
  ) {
    return this.branchesService.update(organizationId, id, updateBranchDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a branch' })
  remove(@TenantId() organizationId: string, @Param('id') id: string) {
    return this.branchesService.remove(organizationId, id);
  }
}
