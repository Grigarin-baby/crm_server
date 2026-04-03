import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../core/prisma/prisma.service';
import { CreateMeetingDto, UpdateMeetingDto } from './meeting.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';

@Injectable()
export class MeetingsService {
  constructor(private prisma: PrismaService) {}

  async create(organizationId: string | null, dto: CreateMeetingDto) {
    return this.prisma.meeting.create({
      data: { ...dto, organizationId: organizationId as string },
    });
  }

  async findAll(organizationId: string | null, paginationDto: PaginationDto) {
    const { skip, take } = paginationDto;
    const where = organizationId ? { organizationId } : {};
    
    const [items, total] = await Promise.all([
      this.prisma.meeting.findMany({
        where,
        include: { deal: true, contact: true },
        skip,
        take,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.meeting.count({
        where,
      }),
    ]);

    return { items, total, skip, take };
  }

  async findOne(organizationId: string | null, id: string) {
    const where = organizationId ? { id, organizationId } : { id };
    const meeting = await this.prisma.meeting.findFirst({
      where,
      include: { deal: true, contact: true },
    });
    if (!meeting)
      throw new NotFoundException(`Meeting with ID ${id} not found`);
    return meeting;
  }

  async update(organizationId: string | null, id: string, dto: UpdateMeetingDto) {
    await this.findOne(organizationId, id);
    return this.prisma.meeting.update({
      where: { id },
      data: dto,
    });
  }

  async remove(organizationId: string | null, id: string) {
    await this.findOne(organizationId, id);
    return this.prisma.meeting.delete({
      where: { id },
    });
  }
}
