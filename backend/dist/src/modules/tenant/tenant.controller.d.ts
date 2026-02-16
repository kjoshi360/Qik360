import { TenantService } from './tenant.service';
export declare class TenantController {
    private readonly service;
    constructor(service: TenantService);
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
