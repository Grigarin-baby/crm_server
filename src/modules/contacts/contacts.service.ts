import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../core/prisma/prisma.service';
import { CreateContactDto, UpdateContactDto } from './contact.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';

@Injectable()
export class ContactsService {
  constructor(private prisma: PrismaService) {}

  async create(organizationId: string, dto: CreateContactDto) {
    return this.prisma.contact.create({
      data: {
        ...dto,
        organizationId,
      },
    });
  }

  async findAll(organizationId: string, paginationDto: PaginationDto) {
    const { skip, take } = paginationDto;
    const [items, total] = await Promise.all([
      this.prisma.contact.findMany({
        where: { organizationId },
        include: { customer: true },
        skip,
        take,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.contact.count({
        where: { organizationId },
      }),
    ]);
    return { items, total, skip, take };
  }

  async findOne(organizationId: string, id: string) {
    const contact = await this.prisma.contact.findFirst({
      where: { id, organizationId },
      include: { customer: true },
    });
    if (!contact) {
      throw new NotFoundException(`Contact with ID ${id} not found`);
    }
    return contact;
  }

  async update(organizationId: string, id: string, dto: UpdateContactDto) {
    await this.findOne(organizationId, id);
    return this.prisma.contact.update({
      where: { id },
      data: dto,
    });
  }

  async remove(organizationId: string, id: string) {
    await this.findOne(organizationId, id);
    return this.prisma.contact.delete({
      where: { id },
    });
  }
}
