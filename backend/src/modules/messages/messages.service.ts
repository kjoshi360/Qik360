import { Injectable } from '@nestjs/common';

@Injectable()
export class MessagesService {
  findAll(tenantId: string) {
    return { tenantId, module: 'messages', items: [] };
  }

  create(tenantId: string, payload: unknown) {
    return { tenantId, module: 'messages', payload };
  }
}
