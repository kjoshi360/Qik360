import { PermissionsService } from './permissions.service';
export declare class PermissionsController {
    private readonly service;
    constructor(service: PermissionsService);
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
