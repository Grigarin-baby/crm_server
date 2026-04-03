import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../core/prisma/prisma.service';
import { CreateQuoteDto, UpdateQuoteDto } from './quote.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';

@Injectable()
export class QuotesService {
  constructor(private prisma: PrismaService) {}

  async create(organizationId: string | null, dto: CreateQuoteDto) {
    return this.prisma.quote.create({
      data: { ...dto, organizationId: organizationId as string },
    });
  }

  async findAll(organizationId: string | null, paginationDto: PaginationDto) {
    const { skip, take } = paginationDto;
    const where = organizationId ? { organizationId } : {};
    
    const [items, total] = await Promise.all([
      this.prisma.quote.findMany({
        where,
        include: { customer: true, deal: true },
        skip,
        take,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.quote.count({
        where,
      }),
    ]);
    return { items, total, skip, take };
  }

  async findOne(organizationId: string | null, id: string) {
    const where = organizationId ? { id, organizationId } : { id };
    const quote = await this.prisma.quote.findFirst({
      where,
      include: { customer: true, deal: true },
    });
    if (!quote) throw new NotFoundException(`Quote with ID ${id} not found`);
    return quote;
  }

  async update(organizationId: string | null, id: string, dto: UpdateQuoteDto) {
    await this.findOne(organizationId, id);
    return this.prisma.quote.update({
      where: { id },
      data: dto,
    });
  }

  async remove(organizationId: string | null, id: string) {
    await this.findOne(organizationId, id);
    return this.prisma.quote.delete({
      where: { id },
    });
  }
}
