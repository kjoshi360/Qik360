import { BillingService } from './billing.service';
export declare class BillingController {
    private readonly service;
    constructor(service: BillingService);
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
