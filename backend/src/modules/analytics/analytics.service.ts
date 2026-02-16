import { Injectable } from '@nestjs/common';

@Injectable()
export class AnalyticsService {
  findAll(tenantId: string) {
    return { tenantId, module: 'analytics', items: [] };
  }

  create(tenantId: string, payload: unknown) {
    return { tenantId, module: 'analytics', payload };
  }
}
