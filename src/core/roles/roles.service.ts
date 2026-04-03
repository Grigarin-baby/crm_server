import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRoleDto, UpdateRoleDto } from './role.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';

@Injectable()
export class RolesService {
  constructor(private prisma: PrismaService) {}

  async create(organizationId: string | null, dto: CreateRoleDto) {
    const { permissionIds, ...rest } = dto;
    return this.prisma.role.create({
      data: {
        ...rest,
        organizationId: organizationId as string,
        permissions: permissionIds
          ? {
              connect: permissionIds.map((id) => ({ id })),
            }
          : undefined,
      },
    });
  }

  async findAll(organizationId: string | null, paginationDto: PaginationDto) {
    const { skip, take } = paginationDto;
    const where = organizationId ? { organizationId } : {};
    
    const [items, total] = await Promise.all([
      this.prisma.role.findMany({
        where,
        include: { permissions: true },
        skip,
        take,
      }),
      this.prisma.role.count({
        where,
      }),
    ]);

    return { items, total, skip, take };
  }

  async findOne(organizationId: string | null, id: string) {
    const where = organizationId ? { id, organizationId } : { id };
    const role = await this.prisma.role.findFirst({
      where,
      include: { permissions: true },
    });
    if (!role) throw new NotFoundException(`Role with ID ${id} not found`);
    return role;
  }

  async update(organizationId: string | null, id: string, dto: UpdateRoleDto) {
    const { permissionIds, ...rest } = dto;
    await this.findOne(organizationId, id);
    return this.prisma.role.update({
      where: { id },
      data: {
        ...rest,
        permissions: permissionIds
          ? {
              set: permissionIds.map((id) => ({ id })),
            }
          : undefined,
      },
    });
  }

  async remove(organizationId: string | null, id: string) {
    await this.findOne(organizationId, id);
    return this.prisma.role.delete({
      where: { id },
    });
  }
}
