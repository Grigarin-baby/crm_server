import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../core/prisma/prisma.service';
import { CreateCallDto, UpdateCallDto } from './call.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';

@Injectable()
export class CallsService {
  constructor(private prisma: PrismaService) {}

  async create(organizationId: string | null, dto: CreateCallDto) {
    return this.prisma.call.create({
      data: { ...dto, organizationId: organizationId as string },
    });
  }

  async findAll(organizationId: string | null, paginationDto: PaginationDto) {
    const { skip, take } = paginationDto;
    const where = organizationId ? { organizationId } : {};
    
    const [items, total] = await Promise.all([
      this.prisma.call.findMany({
        where,
        include: { contact: true, deal: true },
        skip,
        take,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.call.count({
        where,
      }),
    ]);

    return { items, total, skip, take };
  }

  async findOne(organizationId: string | null, id: string) {
    const where = organizationId ? { id, organizationId } : { id };
    const call = await this.prisma.call.findFirst({
      where,
      include: { contact: true, deal: true },
    });
    if (!call) throw new NotFoundException(`Call log with ID ${id} not found`);
    return call;
  }

  async update(organizationId: string | null, id: string, dto: UpdateCallDto) {
    await this.findOne(organizationId, id);
    return this.prisma.call.update({
      where: { id },
      data: dto,
    });
  }

  async remove(organizationId: string | null, id: string) {
    await this.findOne(organizationId, id);
    return this.prisma.call.delete({
      where: { id },
    });
  }
}
