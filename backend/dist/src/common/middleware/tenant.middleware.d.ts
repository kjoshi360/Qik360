import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
export declare class TenantMiddleware implements NestMiddleware {
    use(req: Request & {
        tenant?: {
            id: string;
            plan: string;
        };
    }, _: Response, next: NextFunction): void;
}
