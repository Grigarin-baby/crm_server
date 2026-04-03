import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePermissionDto, UpdatePermissionDto } from './permission.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';

@Injectable()
export class PermissionsService {
  constructor(private prisma: PrismaService) {}

  async create(organizationId: string, dto: CreatePermissionDto) {
    return this.prisma.permission.create({
      data: {
        ...dto,
        organizationId,
      },
    });
  }

  async findAll(organizationId: string, paginationDto: PaginationDto) {
    const { skip, take } = paginationDto;
    const [items, total] = await Promise.all([
      this.prisma.permission.findMany({
        where: { organizationId },
        skip,
        take,
      }),
      this.prisma.permission.count({
        where: { organizationId },
      }),
    ]);
    return { items, total, skip, take };
  }

  async findOne(organizationId: string, id: string) {
    const permission = await this.prisma.permission.findFirst({
      where: { id, organizationId },
    });
    if (!permission)
      throw new NotFoundException(`Permission with ID ${id} not found`);
    return permission;
  }

  async update(organizationId: string, id: string, dto: UpdatePermissionDto) {
    await this.findOne(organizationId, id);
    return this.prisma.permission.update({
      where: { id },
      data: dto,
    });
  }

  async remove(organizationId: string, id: string) {
    await this.findOne(organizationId, id);
    return this.prisma.permission.delete({
      where: { id },
    });
  }
}
