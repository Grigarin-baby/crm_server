import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../core/prisma/prisma.service';
import { CreateTaskDto, UpdateTaskDto } from './task.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async create(organizationId: string | null, dto: CreateTaskDto) {
    return this.prisma.task.create({
      data: { ...dto, organizationId: organizationId as string },
    });
  }

  async findAll(organizationId: string | null, paginationDto: PaginationDto) {
    const { skip, take } = paginationDto;
    const where = organizationId ? { organizationId } : {};
    
    const [items, total] = await Promise.all([
      this.prisma.task.findMany({
        where,
        include: { assignedUser: true, deal: true, customer: true },
        skip,
        take,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.task.count({
        where,
      }),
    ]);

    return { items, total, skip, take };
  }

  async findOne(organizationId: string | null, id: string) {
    const where = organizationId ? { id, organizationId } : { id };
    const task = await this.prisma.task.findFirst({
      where,
      include: { assignedUser: true, deal: true, customer: true },
    });
    if (!task) throw new NotFoundException(`Task with ID ${id} not found`);
    return task;
  }

  async update(organizationId: string | null, id: string, dto: UpdateTaskDto) {
    await this.findOne(organizationId, id);
    return this.prisma.task.update({
      where: { id },
      data: dto,
    });
  }

  async remove(organizationId: string | null, id: string) {
    await this.findOne(organizationId, id);
    return this.prisma.task.delete({
      where: { id },
    });
  }
}
