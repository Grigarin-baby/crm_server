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
import { CallsService } from './calls.service';
import { CreateCallDto, UpdateCallDto } from './call.dto';
import { JwtAuthGuard } from '../../core/auth/jwt-auth.guard';
import { TenantGuard } from '../../core/auth/tenant.guard';
import { TenantId } from '../../core/tenant/tenant.decorator';
import { RolesGuard } from '../../core/auth/roles.guard';
import { PaginationDto } from '../../common/dto/pagination.dto';

@ApiTags('activity/calls')
@ApiBearerAuth()
@ApiHeader({ name: 'x-organization-id', required: false })
@UseGuards(JwtAuthGuard, TenantGuard, RolesGuard)
@Controller('activity/calls')
export class CallsController {
  constructor(private readonly callsService: CallsService) {}

  @Post()
  @ApiOperation({ summary: 'Log a new call' })
  create(
    @TenantId() organizationId: string | null,
    @Body() createCallDto: CreateCallDto,
  ) {
    return this.callsService.create(organizationId, createCallDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all call logs' })
  findAll(
    @TenantId() organizationId: string | null,
    @Query() paginationDto: PaginationDto,
  ) {
    return this.callsService.findAll(organizationId, paginationDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a call log by ID' })
  findOne(@TenantId() organizationId: string | null, @Param('id') id: string) {
    return this.callsService.findOne(organizationId, id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a call log' })
  update(
    @TenantId() organizationId: string | null,
    @Param('id') id: string,
    @Body() updateCallDto: UpdateCallDto,
  ) {
    return this.callsService.update(organizationId, id, updateCallDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a call log' })
  remove(@TenantId() organizationId: string | null, @Param('id') id: string) {
    return this.callsService.remove(organizationId, id);
  }
}
