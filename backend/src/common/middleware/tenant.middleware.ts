import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  use(req: Request & { tenant?: { id: string; plan: string } }, _: Response, next: NextFunction) {
    const tenantId = req.header('x-tenant-id') ?? 'public';
    const plan = req.header('x-tenant-plan') ?? 'FREE';
    req.tenant = { id: tenantId, plan };
    next();
  }
}
