import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../core/prisma/prisma.service';
import { CreateProductDto, UpdateProductDto } from './product.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(organizationId: string, dto: CreateProductDto) {
    return this.prisma.product.create({
      data: { ...dto, organizationId },
    });
  }

  async findAll(organizationId: string, paginationDto: PaginationDto) {
    const { skip, take } = paginationDto;
    const [items, total] = await Promise.all([
      this.prisma.product.findMany({
        where: { organizationId },
        skip,
        take,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.product.count({
        where: { organizationId },
      }),
    ]);
    return { items, total, skip, take };
  }

  async findOne(organizationId: string, id: string) {
    const product = await this.prisma.product.findFirst({
      where: { id, organizationId },
    });
    if (!product)
      throw new NotFoundException(`Product with ID ${id} not found`);
    return product;
  }

  async update(organizationId: string, id: string, dto: UpdateProductDto) {
    await this.findOne(organizationId, id);
    return this.prisma.product.update({
      where: { id },
      data: dto,
    });
  }

  async remove(organizationId: string, id: string) {
    await this.findOne(organizationId, id);
    return this.prisma.product.delete({
      where: { id },
    });
  }
}
