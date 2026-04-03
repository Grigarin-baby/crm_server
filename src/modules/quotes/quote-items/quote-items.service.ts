import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../core/prisma/prisma.service';
import { CreateQuoteItemDto, UpdateQuoteItemDto } from './quote-item.dto';
import { PaginationDto } from '../../../common/dto/pagination.dto';

@Injectable()
export class QuoteItemsService {
  constructor(private prisma: PrismaService) {}

  async create(organizationId: string, dto: CreateQuoteItemDto) {
    return this.prisma.quoteItem.create({
      data: { ...dto, organizationId },
    });
  }

  async findAll(
    organizationId: string,
    paginationDto: PaginationDto,
    quoteId?: string,
  ) {
    const { skip, take } = paginationDto;
    const [items, total] = await Promise.all([
      this.prisma.quoteItem.findMany({
        where: { organizationId, quoteId },
        include: { product: true },
        skip,
        take,
      }),
      this.prisma.quoteItem.count({
        where: { organizationId, quoteId },
      }),
    ]);
    return { items, total, skip, take };
  }

  async findOne(organizationId: string, id: string) {
    const item = await this.prisma.quoteItem.findFirst({
      where: { id, organizationId },
      include: { product: true },
    });
    if (!item) throw new NotFoundException(`QuoteItem with ID ${id} not found`);
    return item;
  }

  async update(organizationId: string, id: string, dto: UpdateQuoteItemDto) {
    await this.findOne(organizationId, id);
    return this.prisma.quoteItem.update({
      where: { id },
      data: dto,
    });
  }

  async remove(organizationId: string, id: string) {
    await this.findOne(organizationId, id);
    return this.prisma.quoteItem.delete({
      where: { id },
    });
  }
}
