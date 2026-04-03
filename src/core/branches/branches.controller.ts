import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiHeader } from '@nestjs/swagger';
import { BranchesService } from './branches.service';
import { CreateBranchDto, UpdateBranchDto } from './branch.dto';
import { TenantId } from '../tenant/tenant.decorator';
import { PaginationDto } from '../../common/dto/pagination.dto';

@ApiTags('branches')
@ApiHeader({ name: 'x-organization-id', required: false })
@Controller('core/branches')
export class BranchesController {
  constructor(private readonly branchesService: BranchesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new branch' })
  create(
    @TenantId() organizationId: string | null,
    @Body() createBranchDto: CreateBranchDto,
  ) {
    return this.branchesService.create(organizationId, createBranchDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all branches' })
  findAll(
    @TenantId() organizationId: string | null,
    @Query() paginationDto: PaginationDto,
  ) {
    return this.branchesService.findAll(organizationId, paginationDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a branch by ID' })
  findOne(@TenantId() organizationId: string | null, @Param('id') id: string) {
    return this.branchesService.findOne(organizationId, id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a branch' })
  update(
    @TenantId() organizationId: string | null,
    @Param('id') id: string,
    @Body() updateBranchDto: UpdateBranchDto,
  ) {
    return this.branchesService.update(organizationId, id, updateBranchDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a branch' })
  remove(@TenantId() organizationId: string | null, @Param('id') id: string) {
    return this.branchesService.remove(organizationId, id);
  }
}
