import { ConversationsService } from './conversations.service';
export declare class ConversationsController {
    private readonly service;
    constructor(service: ConversationsService);
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
