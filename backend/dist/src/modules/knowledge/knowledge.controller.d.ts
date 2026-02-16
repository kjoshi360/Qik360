import { KnowledgeService } from './knowledge.service';
export declare class KnowledgeController {
    private readonly service;
    constructor(service: KnowledgeService);
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
