import { Injectable } from '@nestjs/common';

@Injectable()
export class PermissionsService {
  findAll(tenantId: string) {
    return { tenantId, module: 'permissions', items: [] };
  }

  create(tenantId: string, payload: unknown) {
    return { tenantId, module: 'permissions', payload };
  }
}
