import { AiService } from './ai.service';
export declare class AiController {
    private readonly service;
    constructor(service: AiService);
    findAll(req: any): {
        tenantId: string;
        module: string;
        items: never[];
    };
    create(req: any, body: any): {
        tenantId: string;
        module: string;
        payload: unknown;
    };
}
