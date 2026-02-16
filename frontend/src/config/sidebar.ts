import { Plan, Role } from '../types';

export const sidebarConfig: { label: string; path: string; roles: Role[]; plans: Plan[] }[] = [
  { label: 'Dashboard', path: '/', roles: ['OWNER', 'MANAGER', 'AGENT'], plans: ['FREE', 'PRO', 'ENTERPRISE'] },
  { label: 'Conversations', path: '/conversations', roles: ['OWNER', 'MANAGER', 'AGENT'], plans: ['FREE', 'PRO', 'ENTERPRISE'] },
  { label: 'WhatsApp Connect', path: '/whatsapp', roles: ['OWNER', 'MANAGER'], plans: ['FREE', 'PRO', 'ENTERPRISE'] },
  { label: 'AI Config', path: '/ai', roles: ['OWNER', 'MANAGER'], plans: ['PRO', 'ENTERPRISE'] },
  { label: 'Knowledge Base', path: '/knowledge', roles: ['OWNER', 'MANAGER', 'AGENT'], plans: ['PRO', 'ENTERPRISE'] },
  { label: 'Automation', path: '/automation', roles: ['OWNER', 'MANAGER'], plans: ['PRO', 'ENTERPRISE'] },
  { label: 'Billing', path: '/billing', roles: ['OWNER'], plans: ['FREE', 'PRO', 'ENTERPRISE'] },
  { label: 'Team', path: '/team', roles: ['OWNER', 'MANAGER'], plans: ['FREE', 'PRO', 'ENTERPRISE'] },
  { label: 'Settings', path: '/settings', roles: ['OWNER', 'MANAGER'], plans: ['FREE', 'PRO', 'ENTERPRISE'] }
];
