import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../core/prisma/prisma.service';
import { CreateVendorDto, UpdateVendorDto } from './vendor.dto';

@Injectable()
export class VendorsService {
  constructor(private prisma: PrismaService) {}

  async create(organizationId: string, dto: CreateVendorDto) {
    return this.prisma.vendor.create({
      data: { ...dto, organizationId },
    });
  }

  async findAll(organizationId: string) {
    return this.prisma.vendor.findMany({
      where: { organizationId },
    });
  }

  async findOne(organizationId: string, id: string) {
    const vendor = await this.prisma.vendor.findFirst({
      where: { id, organizationId },
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
