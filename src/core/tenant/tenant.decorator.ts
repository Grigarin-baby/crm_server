import { createParamDecorator, ExecutionContext, BadRequestException } from '@nestjs/common';
import { TenantRequest } from './tenant.middleware';

export const TenantId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<TenantRequest>();
    if (!request.tenantId) {
      throw new BadRequestException('Organization ID is missing in request context.');
    }
    return request.tenantId;
  },
);
