import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AdminStatsService {
  constructor(private prisma: PrismaService) {}

  async getGlobalStats() {
    const [
      orgCount,
      activeOrgCount,
      userCount,
      branchCount,
      recentOrgs,
    ] = await Promise.all([
      this.prisma.organization.count(),
      this.prisma.organization.count({ where: { status: 'ACTIVE' } }),
      this.prisma.user.count(),
      this.prisma.branch.count(),
      this.prisma.organization.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          name: true,
          subscriptionPlan: true,
          createdAt: true,
        },
      }),
    ]);

    // Mock revenue calculation for now
    const monthlyRevenue = orgCount * 250; 

    return {
      orgCount,
      activeOrgCount,
      userCount,
      branchCount,
      monthlyRevenue,
      recentOrgs,
    };
  }
}
