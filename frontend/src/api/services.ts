import { api } from './client';

export const AuthApi = {
  login: (data: { email: string; password: string }) => api.post('/auth/login', data),
  register: (data: { tenantName: string; email: string; password: string; role: string }) => api.post('/auth/register', data),
};

export const TenantApi = {
  list: () => api.get('/tenant'),
  create: (payload: Record<string, unknown>) => api.post('/tenant', payload),
};

export const UserApi = {
  list: () => api.get('/user'),
  create: (payload: Record<string, unknown>) => api.post('/user', payload),
};

export const ConversationsApi = {
  list: () => api.get('/conversations'),
  create: (payload: Record<string, unknown>) => api.post('/conversations', payload),
};

export const WhatsappApi = {
  list: () => api.get('/whatsapp'),
  create: (payload: Record<string, unknown>) => api.post('/whatsapp', payload),
};

export const AiApi = {
  list: () => api.get('/ai'),
  create: (payload: Record<string, unknown>) => api.post('/ai', payload),
};

export const KnowledgeApi = {
  list: () => api.get('/knowledge'),
  create: (payload: Record<string, unknown>) => api.post('/knowledge', payload),
};

export const AutomationApi = {
  list: () => api.get('/automation'),
  create: (payload: Record<string, unknown>) => api.post('/automation', payload),
};

export const BillingApi = {
  list: () => api.get('/billing'),
  create: (payload: Record<string, unknown>) => api.post('/billing', payload),
};

export const AnalyticsApi = {
  list: () => api.get('/analytics'),
  create: (payload: Record<string, unknown>) => api.post('/analytics', payload),
};

export const ModuleApi = {
  list: (module: string) => api.get(`/${module}`),
  create: (module: string, payload: Record<string, unknown>) => api.post(`/${module}`, payload),
};
