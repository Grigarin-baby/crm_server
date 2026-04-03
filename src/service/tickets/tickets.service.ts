import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../core/prisma/prisma.service';
import { CreateTicketDto, UpdateTicketDto } from './ticket.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';

@Injectable()
export class TicketsService {
  constructor(private prisma: PrismaService) {}

  async create(organizationId: string | null, dto: CreateTicketDto) {
    return this.prisma.ticket.create({
      data: { ...dto, organizationId: organizationId as string },
    });
  }

  async findAll(organizationId: string | null, paginationDto: PaginationDto) {
    const { skip, take } = paginationDto;
    const where = organizationId ? { organizationId } : {};
    
    const [items, total] = await Promise.all([
      this.prisma.ticket.findMany({
        where,
        include: { customer: true, assignedAgent: true },
        skip,
        take,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.ticket.count({
        where,
      }),
    ]);
    return { items, total, skip, take };
  }

  async findOne(organizationId: string | null, id: string) {
    const where = organizationId ? { id, organizationId } : { id };
    const ticket = await this.prisma.ticket.findFirst({
      where,
      include: { customer: true, assignedAgent: true },
    });
    if (!ticket) throw new NotFoundException(`Ticket with ID ${id} not found`);
    return ticket;
  }

  async update(organizationId: string | null, id: string, dto: UpdateTicketDto) {
    await this.findOne(organizationId, id);
    return this.prisma.ticket.update({
      where: { id },
      data: dto,
    });
  }

  async remove(organizationId: string | null, id: string) {
    await this.findOne(organizationId, id);
    return this.prisma.ticket.delete({
      where: { id },
    });
  }
}
