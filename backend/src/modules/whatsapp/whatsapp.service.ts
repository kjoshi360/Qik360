import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';

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
}
