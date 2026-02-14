import { SetMetadata } from '@nestjs/common';

export const PLAN_KEY = 'plan';
export const RequirePlan = (...plans: string[]) => SetMetadata(PLAN_KEY, plans);
