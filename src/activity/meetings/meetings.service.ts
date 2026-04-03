import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../core/prisma/prisma.service';
import { CreateMeetingDto, UpdateMeetingDto } from './meeting.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';

@Injectable()
export class MeetingsService {
  constructor(private prisma: PrismaService) {}

  async create(organizationId: string, dto: CreateMeetingDto) {
    return this.prisma.meeting.create({
      data: { ...dto, organizationId },
    });
  }

  async findAll(organizationId: string, paginationDto: PaginationDto) {
    const { skip, take } = paginationDto;
    const [items, total] = await Promise.all([
      this.prisma.meeting.findMany({
        where: { organizationId },
        include: { deal: true, contact: true },
        skip,
        take,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.meeting.count({
        where: { organizationId },
      }),
    ]);

    return { items, total, skip, take };
  }

  async findOne(organizationId: string, id: string) {
    const meeting = await this.prisma.meeting.findFirst({
      where: { id, organizationId },
      include: { deal: true, contact: true },
    });
    if (!meeting)
      throw new NotFoundException(`Meeting with ID ${id} not found`);
    return meeting;
  }

  async update(organizationId: string, id: string, dto: UpdateMeetingDto) {
    await this.findOne(organizationId, id);
    return this.prisma.meeting.update({
      where: { id },
      data: dto,
    });
  }

  async remove(organizationId: string, id: string) {
    await this.findOne(organizationId, id);
    return this.prisma.meeting.delete({
      where: { id },
    });
  }
}
