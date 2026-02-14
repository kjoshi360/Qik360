import { Injectable } from '@nestjs/common';

@Injectable()
export class SubscriptionService {
  findAll(tenantId: string) {
    return { tenantId, module: 'subscription', items: [] };
  }

  create(tenantId: string, payload: unknown) {
    return { tenantId, module: 'subscription', payload };
  }
}
