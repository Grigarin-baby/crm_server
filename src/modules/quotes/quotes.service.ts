import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../core/prisma/prisma.service';
import { CreateQuoteDto, UpdateQuoteDto } from './quote.dto';

@Injectable()
export class QuotesService {
  constructor(private prisma: PrismaService) {}

  async create(organizationId: string, dto: CreateQuoteDto) {
    return this.prisma.quote.create({
      data: { ...dto, organizationId },
    });
  }

  async findAll(organizationId: string) {
    return this.prisma.quote.findMany({
      where: { organizationId },
      include: { customer: true, deal: true },
    });
  }

  async findOne(organizationId: string, id: string) {
    const quote = await this.prisma.quote.findFirst({
      where: { id, organizationId },
      include: { customer: true, deal: true },
    });
    if (!quote) throw new NotFoundException(`Quote with ID ${id} not found`);
    return quote;
  }

  async update(organizationId: string, id: string, dto: UpdateQuoteDto) {
    await this.findOne(organizationId, id);
    return this.prisma.quote.update({
      where: { id },
      data: dto,
    });
  }

  async remove(organizationId: string, id: string) {
    await this.findOne(organizationId, id);
    return this.prisma.quote.delete({
      where: { id },
    });
  }
}
