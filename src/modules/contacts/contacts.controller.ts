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
import { ContactsService } from './contacts.service';
import { CreateContactDto, UpdateContactDto } from './contact.dto';
import { JwtAuthGuard } from '../../core/auth/jwt-auth.guard';
import { TenantGuard } from '../../core/auth/tenant.guard';
import { TenantId } from '../../core/tenant/tenant.decorator';
import { RolesGuard } from '../../core/auth/roles.guard';
import { PaginationDto } from '../../common/dto/pagination.dto';

@ApiTags('contacts')
@ApiBearerAuth()
@ApiHeader({ name: 'x-organization-id', required: false })
@UseGuards(JwtAuthGuard, TenantGuard, RolesGuard)
@Controller('modules/contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new contact' })
  create(
    @TenantId() organizationId: string | null,
    @Body() createContactDto: CreateContactDto,
  ) {
    return this.contactsService.create(organizationId, createContactDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all contacts' })
  findAll(
    @TenantId() organizationId: string | null,
    @Query() paginationDto: PaginationDto,
  ) {
    return this.contactsService.findAll(organizationId, paginationDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a contact by ID' })
  findOne(@TenantId() organizationId: string | null, @Param('id') id: string) {
    return this.contactsService.findOne(organizationId, id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a contact' })
  update(
    @TenantId() organizationId: string | null,
    @Param('id') id: string,
    @Body() updateContactDto: UpdateContactDto,
  ) {
    return this.contactsService.update(organizationId, id, updateContactDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a contact' })
  remove(@TenantId() organizationId: string | null, @Param('id') id: string) {
    return this.contactsService.remove(organizationId, id);
  }
}
