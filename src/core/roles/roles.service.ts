import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRoleDto, UpdateRoleDto } from './role.dto';

@Injectable()
export class RolesService {
  constructor(private prisma: PrismaService) {}

  async create(organizationId: string, dto: CreateRoleDto) {
    const { permissionIds, ...rest } = dto;
    return this.prisma.role.create({
      data: {
        ...rest,
        organizationId,
        permissions: permissionIds
          ? {
              connect: permissionIds.map((id) => ({ id })),
            }
          : undefined,
      },
    });
  }

  async findAll(organizationId: string) {
    return this.prisma.role.findMany({
      where: { organizationId },
      include: { permissions: true },
    });
  }

  async findOne(organizationId: string, id: string) {
    const role = await this.prisma.role.findFirst({
      where: { id, organizationId },
      include: { permissions: true },
    });
    if (!role) throw new NotFoundException(`Role with ID ${id} not found`);
    return role;
  }

  async update(organizationId: string, id: string, dto: UpdateRoleDto) {
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

  async remove(organizationId: string, id: string) {
    await this.findOne(organizationId, id);
    return this.prisma.role.delete({
      where: { id },
    });
  }
}
