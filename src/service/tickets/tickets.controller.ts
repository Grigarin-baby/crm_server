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
import { TicketsService } from './tickets.service';
import { CreateTicketDto, UpdateTicketDto } from './ticket.dto';
import { JwtAuthGuard } from '../../core/auth/jwt-auth.guard';
import { TenantGuard } from '../../core/auth/tenant.guard';
import { TenantId } from '../../core/tenant/tenant.decorator';
import { RolesGuard } from '../../core/auth/roles.guard';

@ApiTags('service/tickets')
@ApiBearerAuth()
@ApiHeader({ name: 'x-organization-id', required: true })
@UseGuards(JwtAuthGuard, TenantGuard, RolesGuard)
@Controller('service/tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new support ticket' })
  create(
    @TenantId() organizationId: string,
    @Body() createTicketDto: CreateTicketDto,
  ) {
    return this.ticketsService.create(organizationId, createTicketDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all tickets' })
  findAll(@TenantId() organizationId: string) {
    return this.ticketsService.findAll(organizationId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a ticket by ID' })
  findOne(@TenantId() organizationId: string, @Param('id') id: string) {
    return this.ticketsService.findOne(organizationId, id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a ticket' })
  update(
    @TenantId() organizationId: string,
    @Param('id') id: string,
    @Body() updateTicketDto: UpdateTicketDto,
  ) {
    return this.ticketsService.update(organizationId, id, updateTicketDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a ticket' })
  remove(@TenantId() organizationId: string, @Param('id') id: string) {
    return this.ticketsService.remove(organizationId, id);
  }
}
