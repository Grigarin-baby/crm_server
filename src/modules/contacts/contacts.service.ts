import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../core/prisma/prisma.service';
import { CreateContactDto, UpdateContactDto } from './contact.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';

@Injectable()
export class ContactsService {
  constructor(private prisma: PrismaService) {}

  async create(organizationId: string | null, dto: CreateContactDto) {
    return this.prisma.contact.create({
      data: {
        ...dto,
        organizationId: organizationId as string, // Cast for prisma if needed, or handle null if schema allows
      },
    });
  }

  async findAll(organizationId: string | null, paginationDto: PaginationDto) {
    const { skip, take } = paginationDto;
    const where = organizationId ? { organizationId } : {};
    
    const [items, total] = await Promise.all([
      this.prisma.contact.findMany({
        where,
        include: { customer: true },
        skip,
        take,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.contact.count({
        where,
      }),
    ]);
    return { items, total, skip, take };
  }

  async findOne(organizationId: string | null, id: string) {
    const where = organizationId ? { id, organizationId } : { id };
    const contact = await this.prisma.contact.findFirst({
      where,
      include: { customer: true },
    });
    if (!contact) {
      throw new NotFoundException(`Contact with ID ${id} not found`);
    }
    return contact;
  }

  async update(organizationId: string | null, id: string, dto: UpdateContactDto) {
    await this.findOne(organizationId, id);
    return this.prisma.contact.update({
      where: { id },
      data: dto,
    });
  }

  async remove(organizationId: string | null, id: string) {
    await this.findOne(organizationId, id);
    return this.prisma.contact.delete({
      where: { id },
    });
  }
}
