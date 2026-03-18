import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../core/prisma/prisma.service';
import { CreatePurchaseOrderItemDto, UpdatePurchaseOrderItemDto } from './purchase-order-item.dto';

@Injectable()
export class PurchaseOrderItemsService {
  constructor(private prisma: PrismaService) {}

  async create(organizationId: string, dto: CreatePurchaseOrderItemDto) {
    return this.prisma.purchaseOrderItem.create({
      data: { ...dto, organizationId },
    });
  }

  async findAll(organizationId: string, purchaseOrderId?: string) {
    return this.prisma.purchaseOrderItem.findMany({
      where: { organizationId, purchaseOrderId },
      include: { product: true },
    });
  }

  async findOne(organizationId: string, id: string) {
    const item = await this.prisma.purchaseOrderItem.findFirst({
      where: { id, organizationId },
      include: { product: true },
    });
    if (!item) throw new NotFoundException(`PurchaseOrderItem with ID ${id} not found`);
    return item;
  }

  async update(organizationId: string, id: string, dto: UpdatePurchaseOrderItemDto) {
    await this.findOne(organizationId, id);
    return this.prisma.purchaseOrderItem.update({
      where: { id },
      data: dto,
    });
  }

  async remove(organizationId: string, id: string) {
    await this.findOne(organizationId, id);
    return this.prisma.purchaseOrderItem.delete({
      where: { id },
    });
  }
}
