import { SubscriptionService } from './subscription.service';
export declare class SubscriptionController {
    private readonly service;
    constructor(service: SubscriptionService);
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
