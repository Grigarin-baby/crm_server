import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../core/prisma/prisma.service';
import { CreateLeadDto, UpdateLeadDto } from './lead.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';

@Injectable()
export class LeadsService {
  constructor(private prisma: PrismaService) {}

  async create(organizationId: string, dto: CreateLeadDto) {
    return this.prisma.lead.create({
      data: {
        ...dto,
        organizationId,
      },
    });
  }

  async findAll(organizationId: string | null, paginationDto: PaginationDto) {
    const { skip, take } = paginationDto;
    const where = organizationId ? { organizationId } : {};
    
    const [items, total] = await Promise.all([
      this.prisma.lead.findMany({
        where,
        skip,
        take,
        include: {
          assignedUser: {
            select: { id: true, email: true, firstName: true, lastName: true },
          },
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.lead.count({
        where,
      }),
    ]);

    return {
      items,
      total,
      skip,
      take,
    };
  }

  async findOne(organizationId: string | null, id: string) {
    const where = organizationId ? { id, organizationId } : { id };
    const lead = await this.prisma.lead.findFirst({
      where,
      include: {
        assignedUser: {
          select: { id: true, email: true, firstName: true, lastName: true },
        },
      },
    });
    if (!lead) {
      throw new NotFoundException(
        `Lead with ID ${id} not found`,
      );
    }
    return lead;
  }

  async update(organizationId: string | null, id: string, dto: UpdateLeadDto) {
    await this.findOne(organizationId, id);
    return this.prisma.lead.update({
      where: { id },
      data: dto,
    });
  }

  async remove(organizationId: string | null, id: string) {
    await this.findOne(organizationId, id);
    return this.prisma.lead.delete({
      where: { id },
    });
  }
}
