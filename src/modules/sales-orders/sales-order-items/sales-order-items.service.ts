import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../core/prisma/prisma.service';
import { CreateSalesOrderItemDto, UpdateSalesOrderItemDto } from './sales-order-item.dto';

@Injectable()
export class SalesOrderItemsService {
  constructor(private prisma: PrismaService) {}

  async create(organizationId: string, dto: CreateSalesOrderItemDto) {
    return this.prisma.salesOrderItem.create({
      data: { ...dto, organizationId },
    });
  }

  async findAll(organizationId: string, salesOrderId?: string) {
    return this.prisma.salesOrderItem.findMany({
      where: { organizationId, salesOrderId },
      include: { product: true },
    });
  }

  async findOne(organizationId: string, id: string) {
    const item = await this.prisma.salesOrderItem.findFirst({
      where: { id, organizationId },
      include: { product: true },
    });
    if (!item) throw new NotFoundException(`SalesOrderItem with ID ${id} not found`);
    return item;
  }

  async update(organizationId: string, id: string, dto: UpdateSalesOrderItemDto) {
    await this.findOne(organizationId, id);
    return this.prisma.salesOrderItem.update({
      where: { id },
      data: dto,
    });
  }

  async remove(organizationId: string, id: string) {
    await this.findOne(organizationId, id);
    return this.prisma.salesOrderItem.delete({
      where: { id },
    });
  }
}
