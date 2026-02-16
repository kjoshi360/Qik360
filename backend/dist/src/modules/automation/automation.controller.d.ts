import { AutomationService } from './automation.service';
export declare class AutomationController {
    private readonly service;
    constructor(service: AutomationService);
    findAll(req: any): {
        tenantId: string;
        module: string;
        items: never[];
    };
    create(req: any, body: any): Promise<{
        tenantId: string;
        module: string;
        payload: unknown;
        status: string;
        workflowResponse?: undefined;
    } | {
        tenantId: string;
        module: string;
        workflowResponse: any;
        payload?: undefined;
        status?: undefined;
    }>;
}
