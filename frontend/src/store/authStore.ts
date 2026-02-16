import { create } from 'zustand';
import { AuthUser, Plan } from '../types';

interface AuthState {
  token: string | null;
  user: AuthUser | null;
  plan: Plan;
  setAuth: (token: string, user: AuthUser) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem('token'),
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null,
  plan: (localStorage.getItem('plan') as Plan) ?? 'FREE',
  setAuth: (token, user) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    set({ token, user });
  },
  logout: () => {
    localStorage.clear();
    set({ token: null, user: null, plan: 'FREE' });
  },
}));
