import { ConfigService } from '@nestjs/config';
export declare class AiService {
    private readonly config;
    constructor(config: ConfigService);
    findAll(tenantId: string): {
        tenantId: string;
        module: string;
        items: never[];
    };
    create(tenantId: string, payload: unknown): {
        tenantId: string;
        module: string;
        payload: unknown;
    };
    generateReply(prompt: string): Promise<any>;
}
