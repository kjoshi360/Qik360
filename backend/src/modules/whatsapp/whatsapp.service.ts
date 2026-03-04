import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';
import { RecipientTemplateMessage } from './dto/send-bulk-template.dto';

@Injectable()
export class WhatsappService {
  constructor(private readonly config: ConfigService) {}

  private encrypt(token: string) {
    const key = Buffer.from(this.config.get<string>('app.encryptionKey')!, 'utf8').subarray(0, 32);
    const iv = randomBytes(16);
    const cipher = createCipheriv('aes-256-cbc', key, iv);
    const encrypted = Buffer.concat([cipher.update(token, 'utf8'), cipher.final()]);
    return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
  }

  decrypt(tokenCipher: string) {
    const [ivHex, dataHex] = tokenCipher.split(':');
    const key = Buffer.from(this.config.get<string>('app.encryptionKey')!, 'utf8').subarray(0, 32);
    const decipher = createDecipheriv('aes-256-cbc', key, Buffer.from(ivHex, 'hex'));
    const decrypted = Buffer.concat([decipher.update(Buffer.from(dataHex, 'hex')), decipher.final()]);
    return decrypted.toString('utf8');
  }

  findAll(tenantId: string) {
    return { tenantId, module: 'whatsapp', items: [] };
  }

  async create(tenantId: string, payload: { phoneNumberId: string; accessToken: string }) {
    return {
      tenantId,
      module: 'whatsapp',
      config: {
        phoneNumberId: payload.phoneNumberId,
        encryptedToken: this.encrypt(payload.accessToken),
      },
    };
  }

  async sendMessage(phoneNumberId: string, accessToken: string, to: string, body: string) {
    const url = `${this.config.get<string>('app.whatsappApiUrl')}/${phoneNumberId}/messages`;
    const response = await axios.post(
      url,
      { messaging_product: 'whatsapp', to, text: { body } },
      { headers: { Authorization: `Bearer ${accessToken}` } },
    );
    return response.data;
  }

  async sendBulkTemplate(
    phoneNumberId: string,
    accessToken: string,
    templateName: string,
    languageCode: string,
    recipients: RecipientTemplateMessage[],
    throttlePerSecond = 80,
  ) {
    const normalizedThrottle = Math.min(Math.max(throttlePerSecond, 1), 80);
    const results: Array<{ to: string; success: boolean; data?: unknown; error?: string }> = [];

    for (let index = 0; index < recipients.length; index += normalizedThrottle) {
      const batch = recipients.slice(index, index + normalizedThrottle);
      const batchResult = await Promise.all(
        batch.map(async (recipient) => {
          try {
            const data = await this.sendTemplateMessage(
              phoneNumberId,
              accessToken,
              recipient.to,
              templateName,
              languageCode,
              recipient.parameters,
            );
            return { to: recipient.to, success: true, data };
          } catch (error) {
            if (axios.isAxiosError(error)) {
              return {
                to: recipient.to,
                success: false,
                error: JSON.stringify(error.response?.data ?? { message: error.message }),
              };
            }
            return {
              to: recipient.to,
              success: false,
              error: error instanceof Error ? error.message : 'Unknown error',
            };
          }
        }),
      );

      results.push(...batchResult);

      if (index + normalizedThrottle < recipients.length) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }

    return {
      total: recipients.length,
      sent: results.filter((item) => item.success).length,
      failed: results.filter((item) => !item.success).length,
      throttlePerSecond: normalizedThrottle,
      results,
    };
  }

  private async sendTemplateMessage(
    phoneNumberId: string,
    accessToken: string,
    to: string,
    templateName: string,
    languageCode: string,
    parameters: Array<{ text: string }>,
  ) {
    const url = `${this.config.get<string>('app.whatsappApiUrl')}/${phoneNumberId}/messages`;
    const response = await axios.post(
      url,
      {
        messaging_product: 'whatsapp',
        to,
        type: 'template',
        template: {
          name: templateName,
          language: { code: languageCode },
          components: [
            {
              type: 'body',
              parameters: parameters.map((parameter) => ({ type: 'text', text: parameter.text })),
            },
          ],
        },
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data;
  }
}
