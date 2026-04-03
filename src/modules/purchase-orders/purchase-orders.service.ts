import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../core/prisma/prisma.service';
import {
  CreatePurchaseOrderDto,
  UpdatePurchaseOrderDto,
} from './purchase-order.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';

@Injectable()
export class PurchaseOrdersService {
  constructor(private prisma: PrismaService) {}

  async create(organizationId: string | null, dto: CreatePurchaseOrderDto) {
    return this.prisma.purchaseOrder.create({
      data: { ...dto, organizationId: organizationId as string },
    });
  }

  async findAll(organizationId: string | null, paginationDto: PaginationDto) {
    const { skip, take } = paginationDto;
    const where = organizationId ? { organizationId } : {};
    
    const [items, total] = await Promise.all([
      this.prisma.purchaseOrder.findMany({
        where,
        include: { vendor: true },
        skip,
        take,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.purchaseOrder.count({
        where,
      }),
    ]);
    return { items, total, skip, take };
  }

  async findOne(organizationId: string | null, id: string) {
    const where = organizationId ? { id, organizationId } : { id };
    const po = await this.prisma.purchaseOrder.findFirst({
      where,
      include: { vendor: true },
    });
    if (!po)
      throw new NotFoundException(`PurchaseOrder with ID ${id} not found`);
    return po;
  }

  async update(
    organizationId: string | null,
    id: string,
    dto: UpdatePurchaseOrderDto,
  ) {
    await this.findOne(organizationId, id);
    return this.prisma.purchaseOrder.update({
      where: { id },
      data: dto,
    });
  }

  async remove(organizationId: string | null, id: string) {
    await this.findOne(organizationId, id);
    return this.prisma.purchaseOrder.delete({
      where: { id },
    });
  }
}
