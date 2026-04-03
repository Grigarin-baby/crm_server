import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../core/prisma/prisma.service';
import { CreateDealDto, UpdateDealDto } from './deal.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';

@Injectable()
export class DealsService {
  constructor(private prisma: PrismaService) {}

  async create(organizationId: string, dto: CreateDealDto) {
    return this.prisma.deal.create({
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
      this.prisma.deal.findMany({
        where,
        include: {
          customer: true,
          assignedUser: {
            select: { id: true, email: true, firstName: true, lastName: true },
          },
        },
        skip,
        take,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.deal.count({
        where,
      }),
    ]);
    return { items, total, skip, take };
  }

  async findOne(organizationId: string | null, id: string) {
    const where = organizationId ? { id, organizationId } : { id };
    const deal = await this.prisma.deal.findFirst({
      where,
      include: {
        customer: true,
        assignedUser: {
          select: { id: true, email: true, firstName: true, lastName: true },
        },
        quotes: true,
        meetings: true,
        calls: true,
        tasks: true,
      },
    });
    if (!deal) {
      throw new NotFoundException(`Deal with ID ${id} not found`);
    }
    return deal;
  }

  async update(organizationId: string | null, id: string, dto: UpdateDealDto) {
    await this.findOne(organizationId, id);
    return this.prisma.deal.update({
      where: { id },
      data: dto,
    });
  }

  async remove(organizationId: string | null, id: string) {
    await this.findOne(organizationId, id);
    return this.prisma.deal.delete({
      where: { id },
    });
  }
}
