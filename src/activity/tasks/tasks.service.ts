import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../core/prisma/prisma.service';
import { CreateTaskDto, UpdateTaskDto } from './task.dto';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async create(organizationId: string, dto: CreateTaskDto) {
    return this.prisma.task.create({
      data: { ...dto, organizationId },
    });
  }

  async findAll(organizationId: string) {
    return this.prisma.task.findMany({
      where: { organizationId },
      include: { assignedUser: true, deal: true, customer: true },
    });
  }

  async findOne(organizationId: string, id: string) {
    const task = await this.prisma.task.findFirst({
      where: { id, organizationId },
      include: { assignedUser: true, deal: true, customer: true },
    });
    if (!task) throw new NotFoundException(`Task with ID ${id} not found`);
    return task;
  }

  async update(organizationId: string, id: string, dto: UpdateTaskDto) {
    await this.findOne(organizationId, id);
    return this.prisma.task.update({
      where: { id },
      data: dto,
    });
  }

  async remove(organizationId: string, id: string) {
    await this.findOne(organizationId, id);
    return this.prisma.task.delete({
      where: { id },
    });
  }
}
