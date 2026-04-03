import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePermissionDto, UpdatePermissionDto } from './permission.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';

@Injectable()
export class PermissionsService {
  constructor(private prisma: PrismaService) {}

  async create(organizationId: string | null, dto: CreatePermissionDto) {
    return this.prisma.permission.create({
      data: {
        ...dto,
        organizationId: organizationId as string,
      },
    });
  }

  async findAll(organizationId: string | null, paginationDto: PaginationDto) {
    const { skip, take } = paginationDto;
    const where = organizationId ? { organizationId } : {};
    
    const [items, total] = await Promise.all([
      this.prisma.permission.findMany({
        where,
        skip,
        take,
      }),
      this.prisma.permission.count({
        where,
      }),
    ]);
    return { items, total, skip, take };
  }

  async findOne(organizationId: string | null, id: string) {
    const where = organizationId ? { id, organizationId } : { id };
    const permission = await this.prisma.permission.findFirst({
      where,
    });
    if (!permission)
      throw new NotFoundException(`Permission with ID ${id} not found`);
    return permission;
  }

  async update(organizationId: string | null, id: string, dto: UpdatePermissionDto) {
    await this.findOne(organizationId, id);
    return this.prisma.permission.update({
      where: { id },
      data: dto,
    });
  }

  async remove(organizationId: string | null, id: string) {
    await this.findOne(organizationId, id);
    return this.prisma.permission.delete({
      where: { id },
    });
  }
}
