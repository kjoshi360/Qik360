import { ConfigService } from '@nestjs/config';
export declare class WhatsappService {
    private readonly config;
    constructor(config: ConfigService);
    private encrypt;
    decrypt(tokenCipher: string): string;
    findAll(tenantId: string): {
        tenantId: string;
        module: string;
        items: never[];
    };
    create(tenantId: string, payload: {
        phoneNumberId: string;
        accessToken: string;
    }): Promise<{
        tenantId: string;
        module: string;
        config: {
            phoneNumberId: string;
            encryptedToken: string;
        };
    }>;
    sendMessage(phoneNumberId: string, accessToken: string, to: string, body: string): Promise<any>;
}
