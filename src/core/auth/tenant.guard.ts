import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { TenantRequest } from '../tenant/tenant.middleware';

@Injectable()
export class TenantGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<TenantRequest>();
    const user = request.user as { organizationId: string; role: string } | undefined;
    const tenantIdFromHeader = request.tenantId;

    if (!user) {
      return true; // Let JwtAuthGuard handle this
    }

    // SUPER_ADMIN can access everything. 
    // If they provide a header, we use it to filter.
    if (user.role === 'SUPER_ADMIN') {
      if (tenantIdFromHeader) {
        request.tenantId = tenantIdFromHeader;
      } else {
        request.tenantId = undefined; // Global view
      }
      return true;
    }

    // Regular users MUST have an organizationId
    if (!user.organizationId) {
      throw new ForbiddenException('User is not assigned to an organization');
    }

    // If header is provided, it MUST match the user's organization
    if (tenantIdFromHeader && user.organizationId !== tenantIdFromHeader) {
      throw new ForbiddenException(
        'You do not have access to this organization',
      );
    }

    // Force the tenantId to the user's organizationId for regular users
    request.tenantId = user.organizationId;

    return true;
  }
}
