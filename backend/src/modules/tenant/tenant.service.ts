import { Injectable } from '@nestjs/common';

@Injectable()
export class TenantService {
  findAll(tenantId: string) {
    return { tenantId, module: 'tenant', items: [] };
  }

  create(tenantId: string, payload: unknown) {
    return { tenantId, module: 'tenant', payload };
  }
}
