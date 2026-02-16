import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createHmac } from 'crypto';

@Injectable()
export class WebhookService {
  constructor(private readonly config: ConfigService) {}

  findAll(tenantId: string) {
    return { tenantId, module: 'webhook', items: [] };
  }

  create(tenantId: string, payload: unknown) {
    return { tenantId, module: 'webhook', payload };
  }

  validateSignature(signature: string, rawBody: string) {
    const expected = createHmac('sha256', this.config.get<string>('app.webhookSecret')!).update(rawBody).digest('hex');
    if (signature !== expected) throw new UnauthorizedException('Invalid webhook signature');
    return true;
  }
}
