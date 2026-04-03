import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../core/prisma/prisma.service';
import { CreateInvoiceItemDto, UpdateInvoiceItemDto } from './invoice-item.dto';
import { PaginationDto } from '../../../common/dto/pagination.dto';

@Injectable()
export class InvoiceItemsService {
  constructor(private prisma: PrismaService) {}

  async create(organizationId: string, dto: CreateInvoiceItemDto) {
    return this.prisma.invoiceItem.create({
      data: { ...dto, organizationId },
    });
  }

  async findAll(
    organizationId: string,
    paginationDto: PaginationDto,
    invoiceId?: string,
  ) {
    const { skip, take } = paginationDto;
    const where = { organizationId, invoiceId };
    const [items, total] = await Promise.all([
      this.prisma.invoiceItem.findMany({
        where,
        include: { product: true },
        skip,
        take,
      }),
      this.prisma.invoiceItem.count({
        where,
      }),
    ]);
    return { items, total, skip, take };
  }

  async findOne(organizationId: string, id: string) {
    const item = await this.prisma.invoiceItem.findFirst({
      where: { id, organizationId },
      include: { product: true },
    });
    if (!item)
      throw new NotFoundException(`InvoiceItem with ID ${id} not found`);
    return item;
  }

  async update(organizationId: string, id: string, dto: UpdateInvoiceItemDto) {
    await this.findOne(organizationId, id);
    return this.prisma.invoiceItem.update({
      where: { id },
      data: dto,
    });
  }

  async remove(organizationId: string, id: string) {
    await this.findOne(organizationId, id);
    return this.prisma.invoiceItem.delete({
      where: { id },
    });
  }
}
