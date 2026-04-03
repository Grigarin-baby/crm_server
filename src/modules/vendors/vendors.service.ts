import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../core/prisma/prisma.service';
import { CreateVendorDto, UpdateVendorDto } from './vendor.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';

@Injectable()
export class VendorsService {
  constructor(private prisma: PrismaService) {}

  async create(organizationId: string, dto: CreateVendorDto) {
    return this.prisma.vendor.create({
      data: { ...dto, organizationId },
    });
  }

  async findAll(organizationId: string, paginationDto: PaginationDto) {
    const { skip, take } = paginationDto;
    const [items, total] = await Promise.all([
      this.prisma.vendor.findMany({
        where: { organizationId },
        skip,
        take,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.vendor.count({
        where: { organizationId },
      }),
    ]);
    return { items, total, skip, take };
  }

  async findOne(organizationId: string, id: string) {
    const vendor = await this.prisma.vendor.findFirst({
      where: { id, organizationId },
      include: { purchaseOrders: true },
    });
    if (!vendor) throw new NotFoundException(`Vendor with ID ${id} not found`);
    return vendor;
  }

  async update(organizationId: string, id: string, dto: UpdateVendorDto) {
    await this.findOne(organizationId, id);
    return this.prisma.vendor.update({
      where: { id },
      data: dto,
    });
  }

  async remove(organizationId: string, id: string) {
    await this.findOne(organizationId, id);
    return this.prisma.vendor.delete({
      where: { id },
    });
  }
}
