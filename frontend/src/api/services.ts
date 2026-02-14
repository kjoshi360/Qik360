import { api } from './client';

export const AuthApi = {
  login: (data: { email: string; password: string }) => api.post('/auth/login', data),
  register: (data: { tenantName: string; email: string; password: string; role: string }) => api.post('/auth/register', data),
};

export const ModuleApi = {
  list: (module: string) => api.get(`/${module}`),
  create: (module: string, payload: Record<string, unknown>) => api.post(`/${module}`, payload),
};
