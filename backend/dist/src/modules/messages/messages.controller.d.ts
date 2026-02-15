import { MessagesService } from './messages.service';
export declare class MessagesController {
    private readonly service;
    constructor(service: MessagesService);
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
