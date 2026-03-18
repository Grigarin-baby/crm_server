import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../core/prisma/prisma.service';
import { CreateLeadDto, UpdateLeadDto } from './lead.dto';

@Injectable()
export class LeadsService {
  constructor(private prisma: PrismaService) {}

  async create(organizationId: string, dto: CreateLeadDto) {
    return this.prisma.lead.create({
      data: {
        ...dto,
        organizationId,
      },
    });
  }

  async findAll(organizationId: string) {
    return this.prisma.lead.findMany({
      where: { organizationId },
      include: { assignedUser: { select: { id: true, email: true, firstName: true, lastName: true } } },
    });
  }

  async findOne(organizationId: string, id: string) {
    const lead = await this.prisma.lead.findFirst({
      where: { id, organizationId },
      include: { assignedUser: { select: { id: true, email: true, firstName: true, lastName: true } } },
    });
    if (!lead) {
      throw new NotFoundException(`Lead with ID ${id} not found in this organization`);
    }
    return lead;
  }

  async update(organizationId: string, id: string, dto: UpdateLeadDto) {
    await this.findOne(organizationId, id);
    return this.prisma.lead.update({
      where: { id },
      data: dto,
    });
  }

  async remove(organizationId: string, id: string) {
    await this.findOne(organizationId, id);
    return this.prisma.lead.delete({
      where: { id },
    });
  }
}
