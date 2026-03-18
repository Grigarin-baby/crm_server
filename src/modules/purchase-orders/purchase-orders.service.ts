import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../core/prisma/prisma.service';
import {
  CreatePurchaseOrderDto,
  UpdatePurchaseOrderDto,
} from './purchase-order.dto';

@Injectable()
export class PurchaseOrdersService {
  constructor(private prisma: PrismaService) {}

  async create(organizationId: string, dto: CreatePurchaseOrderDto) {
    return this.prisma.purchaseOrder.create({
      data: { ...dto, organizationId },
    });
  }

  async findAll(organizationId: string) {
    return this.prisma.purchaseOrder.findMany({
      where: { organizationId },
      include: { vendor: true },
    });
  }

  async findOne(organizationId: string, id: string) {
    const po = await this.prisma.purchaseOrder.findFirst({
      where: { id, organizationId },
      include: { vendor: true },
    });
    if (!po)
      throw new NotFoundException(`PurchaseOrder with ID ${id} not found`);
    return po;
  }

  async update(
    organizationId: string,
    id: string,
    dto: UpdatePurchaseOrderDto,
  ) {
    await this.findOne(organizationId, id);
    return this.prisma.purchaseOrder.update({
      where: { id },
      data: dto,
    });
  }

  async remove(organizationId: string, id: string) {
    await this.findOne(organizationId, id);
    return this.prisma.purchaseOrder.delete({
      where: { id },
    });
  }
}
