import { WhatsappService } from './whatsapp.service';
export declare class WhatsappController {
    private readonly service;
    constructor(service: WhatsappService);
    findAll(req: any): {
        tenantId: string;
        module: string;
        items: never[];
    };
    create(req: any, body: any): Promise<{
        tenantId: string;
        module: string;
        config: {
            phoneNumberId: string;
            encryptedToken: string;
        };
    }>;
}
