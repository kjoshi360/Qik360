import { UserService } from './user.service';
export declare class UserController {
    private readonly service;
    constructor(service: UserService);
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
