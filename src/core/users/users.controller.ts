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
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { TenantId } from '../tenant/tenant.decorator';
import { PaginationDto } from '../../common/dto/pagination.dto';

@ApiTags('users')
@ApiHeader({ name: 'x-organization-id', required: false })
@Controller('core/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  create(
    @TenantId() organizationId: string | null,
    @Body() createUserDto: CreateUserDto,
  ) {
    return this.usersService.create(organizationId, createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users for organization' })
  findAll(
    @TenantId() organizationId: string | null,
    @Query() paginationDto: PaginationDto,
  ) {
    return this.usersService.findAll(organizationId, paginationDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a user by ID' })
  findOne(@TenantId() organizationId: string | null, @Param('id') id: string) {
    return this.usersService.findOne(organizationId, id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a user' })
  update(
    @TenantId() organizationId: string | null,
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(organizationId, id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user' })
  remove(@TenantId() organizationId: string | null, @Param('id') id: string) {
    return this.usersService.remove(organizationId, id);
  }
}
