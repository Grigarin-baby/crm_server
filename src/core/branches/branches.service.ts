import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBranchDto, UpdateBranchDto } from './branch.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';

@Injectable()
export class BranchesService {
  constructor(private prisma: PrismaService) {}

  async create(organizationId: string | null, dto: CreateBranchDto) {
    return this.prisma.branch.create({
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
      this.prisma.branch.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.branch.count({
        where,
      }),
    ]);
    return { items, total, skip, take };
  }

  async findOne(organizationId: string | null, id: string) {
    const where = organizationId ? { id, organizationId } : { id };
    const branch = await this.prisma.branch.findFirst({
      where,
    });
    if (!branch) {
      throw new NotFoundException(
        `Branch with ID ${id} not found`,
      );
    }
    return branch;
  }

  async update(organizationId: string | null, id: string, dto: UpdateBranchDto) {
    await this.findOne(organizationId, id); // Ensure it exists
    return this.prisma.branch.update({
      where: { id },
      data: dto,
    });
  }

  async remove(organizationId: string | null, id: string) {
    await this.findOne(organizationId, id); // Ensure it exists
    return this.prisma.branch.delete({
      where: { id },
    });
  }
}
