import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../core/prisma/prisma.service';
import { CreateInvoiceDto, UpdateInvoiceDto } from './invoice.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';

@Injectable()
export class InvoicesService {
  constructor(private prisma: PrismaService) {}

  async create(organizationId: string, dto: CreateInvoiceDto) {
    return this.prisma.invoice.create({
      data: { ...dto, organizationId },
    });
  }

  async findAll(organizationId: string, paginationDto: PaginationDto) {
    const { skip, take } = paginationDto;
    const [items, total] = await Promise.all([
      this.prisma.invoice.findMany({
        where: { organizationId },
        include: { customer: true, salesOrder: true },
        skip,
        take,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.invoice.count({
        where: { organizationId },
      }),
    ]);
    return { items, total, skip, take };
  }

  async findOne(organizationId: string, id: string) {
    const invoice = await this.prisma.invoice.findFirst({
      where: { id, organizationId },
      include: { customer: true, salesOrder: true },
    });
    if (!invoice)
      throw new NotFoundException(`Invoice with ID ${id} not found`);
    return invoice;
  }

  async update(organizationId: string, id: string, dto: UpdateInvoiceDto) {
    await this.findOne(organizationId, id);
    return this.prisma.invoice.update({
      where: { id },
      data: dto,
    });
  }

  async remove(organizationId: string, id: string) {
    await this.findOne(organizationId, id);
    return this.prisma.invoice.delete({
      where: { id },
    });
  }
}
