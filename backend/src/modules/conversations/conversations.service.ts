import { Injectable } from '@nestjs/common';

@Injectable()
export class ConversationsService {
  findAll(tenantId: string) {
    return { tenantId, module: 'conversations', items: [] };
  }

  create(tenantId: string, payload: unknown) {
    return { tenantId, module: 'conversations', payload };
  }
}
