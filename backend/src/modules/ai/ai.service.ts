import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class AiService {
  constructor(private readonly config: ConfigService) {}

  findAll(tenantId: string) {
    return { tenantId, module: 'ai', items: [] };
  }

  create(tenantId: string, payload: unknown) {
    return { tenantId, module: 'ai', payload };
  }

  async generateReply(prompt: string) {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
      },
      { headers: { Authorization: `Bearer ${this.config.get<string>('app.openAiApiKey')}` } },
    );
    return response.data;
  }
}
