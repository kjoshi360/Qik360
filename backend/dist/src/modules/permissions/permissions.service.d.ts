export declare class PermissionsService {
    findAll(tenantId: string): {
        tenantId: string;
        module: string;
        items: never[];
    };
    create(tenantId: string, payload: unknown): {
        tenantId: string;
        module: string;
        payload: unknown;
    };
}
