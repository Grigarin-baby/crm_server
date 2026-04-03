import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../core/prisma/prisma.service';
import { CreateSalesOrderDto, UpdateSalesOrderDto } from './sales-order.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';

@Injectable()
export class SalesOrdersService {
  constructor(private prisma: PrismaService) {}

  async create(organizationId: string | null, dto: CreateSalesOrderDto) {
    return this.prisma.salesOrder.create({
      data: { ...dto, organizationId: organizationId as string },
    });
  }

  async findAll(organizationId: string | null, paginationDto: PaginationDto) {
    const { skip, take } = paginationDto;
    const where = organizationId ? { organizationId } : {};
    
    const [items, total] = await Promise.all([
      this.prisma.salesOrder.findMany({
        where,
        include: { customer: true, quote: true },
        skip,
        take,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.salesOrder.count({
        where,
      }),
    ]);
    return { items, total, skip, take };
  }

  async findOne(organizationId: string | null, id: string) {
    const where = organizationId ? { id, organizationId } : { id };
    const order = await this.prisma.salesOrder.findFirst({
      where,
      include: { customer: true, quote: true },
    });
    if (!order)
      throw new NotFoundException(`SalesOrder with ID ${id} not found`);
    return order;
  }

  async update(organizationId: string | null, id: string, dto: UpdateSalesOrderDto) {
    await this.findOne(organizationId, id);
    return this.prisma.salesOrder.update({
      where: { id },
      data: dto,
    });
  }

  async remove(organizationId: string | null, id: string) {
    await this.findOne(organizationId, id);
    return this.prisma.salesOrder.delete({
      where: { id },
    });
  }
}
