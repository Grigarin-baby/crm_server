import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../core/prisma/prisma.service';
import { CreateCallDto, UpdateCallDto } from './call.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';

@Injectable()
export class CallsService {
  constructor(private prisma: PrismaService) {}

  async create(organizationId: string, dto: CreateCallDto) {
    return this.prisma.call.create({
      data: { ...dto, organizationId },
    });
  }

  async findAll(organizationId: string, paginationDto: PaginationDto) {
    const { skip, take } = paginationDto;
    const [items, total] = await Promise.all([
      this.prisma.call.findMany({
        where: { organizationId },
        include: { contact: true, deal: true },
        skip,
        take,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.call.count({
        where: { organizationId },
      }),
    ]);

    return { items, total, skip, take };
  }

  async findOne(organizationId: string, id: string) {
    const call = await this.prisma.call.findFirst({
      where: { id, organizationId },
      include: { contact: true, deal: true },
    });
    if (!call) throw new NotFoundException(`Call log with ID ${id} not found`);
    return call;
  }

  async update(organizationId: string, id: string, dto: UpdateCallDto) {
    await this.findOne(organizationId, id);
    return this.prisma.call.update({
      where: { id },
      data: dto,
    });
  }

  async remove(organizationId: string, id: string) {
    await this.findOne(organizationId, id);
    return this.prisma.call.delete({
      where: { id },
    });
  }
}
