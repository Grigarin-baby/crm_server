import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../core/prisma/prisma.service';
import { CreateTicketDto, UpdateTicketDto } from './ticket.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';

@Injectable()
export class TicketsService {
  constructor(private prisma: PrismaService) {}

  async create(organizationId: string, dto: CreateTicketDto) {
    return this.prisma.ticket.create({
      data: { ...dto, organizationId },
    });
  }

  async findAll(organizationId: string, paginationDto: PaginationDto) {
    const { skip, take } = paginationDto;
    const [items, total] = await Promise.all([
      this.prisma.ticket.findMany({
        where: { organizationId },
        include: { customer: true, assignedAgent: true },
        skip,
        take,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.ticket.count({
        where: { organizationId },
      }),
    ]);
    return { items, total, skip, take };
  }

  async findOne(organizationId: string, id: string) {
    const ticket = await this.prisma.ticket.findFirst({
      where: { id, organizationId },
      include: { customer: true, assignedAgent: true },
    });
    if (!ticket) throw new NotFoundException(`Ticket with ID ${id} not found`);
    return ticket;
  }

  async update(organizationId: string, id: string, dto: UpdateTicketDto) {
    await this.findOne(organizationId, id);
    return this.prisma.ticket.update({
      where: { id },
      data: dto,
    });
  }

  async remove(organizationId: string, id: string) {
    await this.findOne(organizationId, id);
    return this.prisma.ticket.delete({
      where: { id },
    });
  }
}
