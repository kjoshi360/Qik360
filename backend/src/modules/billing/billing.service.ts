import { Injectable } from '@nestjs/common';

@Injectable()
export class BillingService {
  findAll(tenantId: string) {
    return { tenantId, module: 'billing', items: [] };
  }

  create(tenantId: string, payload: unknown) {
    return { tenantId, module: 'billing', payload };
  }
}
