import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { TenantRequest } from '../tenant/tenant.middleware';

@Injectable()
export class TenantGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<TenantRequest>();
    const user = (request as any).user;
    const tenantIdFromHeader = request.tenantId;

    if (!user) {
      return true; // Let JwtAuthGuard handle this if applied
    }

    if (tenantIdFromHeader && user.organizationId !== tenantIdFromHeader) {
      throw new ForbiddenException('You do not have access to this organization');
    }

    // Ensure tenantId is always set on request for services to use
    request.tenantId = user.organizationId;

    return true;
  }
}
