export type Role = 'OWNER' | 'MANAGER' | 'AGENT';
export type Plan = 'FREE' | 'PRO' | 'ENTERPRISE';

export interface AuthUser {
  id: string;
  tenantId: string;
  role: Role;
}
