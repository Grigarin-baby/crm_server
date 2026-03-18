import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBranchDto, UpdateBranchDto } from './branch.dto';

@Injectable()
export class BranchesService {
  constructor(private prisma: PrismaService) {}

  async create(organizationId: string, dto: CreateBranchDto) {
    return this.prisma.branch.create({
      data: {
        ...dto,
        organizationId,
      },
    });
  }

  async findAll(organizationId: string) {
    return this.prisma.branch.findMany({
      where: { organizationId },
    });
  }

  async findOne(organizationId: string, id: string) {
    const branch = await this.prisma.branch.findFirst({
      where: { id, organizationId },
    });
    if (!branch) {
      throw new NotFoundException(
        `Branch with ID ${id} not found in this organization`,
      );
    }
    return branch;
  }

  async update(organizationId: string, id: string, dto: UpdateBranchDto) {
    await this.findOne(organizationId, id); // Ensure it exists within organization
    return this.prisma.branch.update({
      where: { id },
      data: dto,
    });
  }

  async remove(organizationId: string, id: string) {
    await this.findOne(organizationId, id); // Ensure it exists within organization
    return this.prisma.branch.delete({
      where: { id },
    });
  }
}
