import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  findAll(tenantId: string) {
    return { tenantId, module: 'user', items: [] };
  }

  create(tenantId: string, payload: unknown) {
    return { tenantId, module: 'user', payload };
  }
}
