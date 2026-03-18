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
import { MeetingsService } from './meetings.service';
import { CreateMeetingDto, UpdateMeetingDto } from './meeting.dto';
import { JwtAuthGuard } from '../../core/auth/jwt-auth.guard';
import { TenantGuard } from '../../core/auth/tenant.guard';
import { TenantId } from '../../core/tenant/tenant.decorator';
import { RolesGuard } from '../../core/auth/roles.guard';

@ApiTags('activity/meetings')
@ApiBearerAuth()
@ApiHeader({ name: 'x-organization-id', required: true })
@UseGuards(JwtAuthGuard, TenantGuard, RolesGuard)
@Controller('activity/meetings')
export class MeetingsController {
  constructor(private readonly meetingsService: MeetingsService) {}

  @Post()
  @ApiOperation({ summary: 'Schedule a new meeting' })
  create(
    @TenantId() organizationId: string,
    @Body() createMeetingDto: CreateMeetingDto,
  ) {
    return this.meetingsService.create(organizationId, createMeetingDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all meetings' })
  findAll(@TenantId() organizationId: string) {
    return this.meetingsService.findAll(organizationId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a meeting by ID' })
  findOne(@TenantId() organizationId: string, @Param('id') id: string) {
    return this.meetingsService.findOne(organizationId, id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update meeting details' })
  update(
    @TenantId() organizationId: string,
    @Param('id') id: string,
    @Body() updateMeetingDto: UpdateMeetingDto,
  ) {
    return this.meetingsService.update(organizationId, id, updateMeetingDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Cancel a meeting' })
  remove(@TenantId() organizationId: string, @Param('id') id: string) {
    return this.meetingsService.remove(organizationId, id);
  }
}
