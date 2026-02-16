import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class AutomationService {
  constructor(private readonly config: ConfigService) {}

  findAll(tenantId: string) {
    return { tenantId, module: 'automation', items: [] };
  }

  async create(tenantId: string, payload: unknown) {
    const endpoint = this.config.get<string>('app.n8nWebhookUrl');
    if (!endpoint) return { tenantId, module: 'automation', payload, status: 'queued' };
    const response = await axios.post(endpoint, { tenantId, ...((payload as object) ?? {}) });
    return { tenantId, module: 'automation', workflowResponse: response.data };
  }
}
