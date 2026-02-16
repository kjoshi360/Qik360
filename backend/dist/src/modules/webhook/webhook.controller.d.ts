import { WebhookService } from './webhook.service';
export declare class WebhookController {
    private readonly service;
    constructor(service: WebhookService);
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
