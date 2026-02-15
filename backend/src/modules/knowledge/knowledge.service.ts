import { Injectable } from '@nestjs/common';

@Injectable()
export class KnowledgeService {
  findAll(tenantId: string) {
    return { tenantId, module: 'knowledge', items: [] };
  }

  create(tenantId: string, payload: unknown) {
    return { tenantId, module: 'knowledge', payload };
  }
}
