import { Injectable, NestMiddleware, BadRequestException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

export interface TenantRequest extends Request {
  tenantId?: string;
}

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  use(req: TenantRequest, res: Response, next: NextFunction) {
    const tenantId = req.headers['x-organization-id'] as string;
    
    // In a real scenario, you might also resolve tenant via subdomain
    // const host = req.headers.host;
    // const subdomain = host.split('.')[0];
    
    if (!tenantId) {
      // For some routes, tenantId might be optional (e.g. public site), 
      // but for CRM routes it should be required.
      // We attach it to the request and guards/services will enforce it.
    }
    
    req.tenantId = tenantId;
    next();
  }
}
