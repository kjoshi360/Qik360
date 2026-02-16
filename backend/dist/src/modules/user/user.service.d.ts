export declare class UserService {
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
