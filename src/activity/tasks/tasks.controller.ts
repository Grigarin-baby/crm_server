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
import { TasksService } from './tasks.service';
import { CreateTaskDto, UpdateTaskDto } from './task.dto';
import { JwtAuthGuard } from '../../core/auth/jwt-auth.guard';
import { TenantGuard } from '../../core/auth/tenant.guard';
import { TenantId } from '../../core/tenant/tenant.decorator';
import { RolesGuard } from '../../core/auth/roles.guard';

@ApiTags('activity/tasks')
@ApiBearerAuth()
@ApiHeader({ name: 'x-organization-id', required: true })
@UseGuards(JwtAuthGuard, TenantGuard, RolesGuard)
@Controller('activity/tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new task' })
  create(
    @TenantId() organizationId: string,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    return this.tasksService.create(organizationId, createTaskDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all tasks' })
  findAll(@TenantId() organizationId: string) {
    return this.tasksService.findAll(organizationId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a task by ID' })
  findOne(@TenantId() organizationId: string, @Param('id') id: string) {
    return this.tasksService.findOne(organizationId, id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a task' })
  update(
    @TenantId() organizationId: string,
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.tasksService.update(organizationId, id, updateTaskDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a task' })
  remove(@TenantId() organizationId: string, @Param('id') id: string) {
    return this.tasksService.remove(organizationId, id);
  }
}
