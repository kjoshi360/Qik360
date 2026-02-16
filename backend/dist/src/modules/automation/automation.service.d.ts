import { ConfigService } from '@nestjs/config';
export declare class AutomationService {
    private readonly config;
    constructor(config: ConfigService);
    findAll(tenantId: string): {
        tenantId: string;
        module: string;
        items: never[];
    };
    create(tenantId: string, payload: unknown): Promise<{
        tenantId: string;
        module: string;
        payload: unknown;
        status: string;
        workflowResponse?: undefined;
    } | {
        tenantId: string;
        module: string;
        workflowResponse: any;
        payload?: undefined;
        status?: undefined;
    }>;
}
