import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../core/prisma/prisma.service';
import { CreateSalesOrderDto, UpdateSalesOrderDto } from './sales-order.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';

@Injectable()
export class SalesOrdersService {
  constructor(private prisma: PrismaService) {}

  async create(organizationId: string, dto: CreateSalesOrderDto) {
    return this.prisma.salesOrder.create({
      data: { ...dto, organizationId },
    });
  }

  async findAll(organizationId: string, paginationDto: PaginationDto) {
    const { skip, take } = paginationDto;
    const [items, total] = await Promise.all([
      this.prisma.salesOrder.findMany({
        where: { organizationId },
        include: { customer: true, quote: true },
        skip,
        take,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.salesOrder.count({
        where: { organizationId },
      }),
    ]);
    return { items, total, skip, take };
  }

  async findOne(organizationId: string, id: string) {
    const order = await this.prisma.salesOrder.findFirst({
      where: { id, organizationId },
      include: { customer: true, quote: true },
    });
    if (!order)
      throw new NotFoundException(`SalesOrder with ID ${id} not found`);
    return order;
  }

  async update(organizationId: string, id: string, dto: UpdateSalesOrderDto) {
    await this.findOne(organizationId, id);
    return this.prisma.salesOrder.update({
      where: { id },
      data: dto,
    });
  }

  async remove(organizationId: string, id: string) {
    await this.findOne(organizationId, id);
    return this.prisma.salesOrder.delete({
      where: { id },
    });
  }
}
