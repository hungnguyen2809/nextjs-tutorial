import {
  LoginBodyType,
  LoginResType,
  RegisterBodyType,
  RegisterResType,
  SlideSessionResType,
} from '@/schemas/auth.schema';
import { http } from './http';

export const authApi = {
  auth: (token: string, expiresAt: string) => {
    return http.post('/api/auth', { token, expiresAt }, { baseUrl: window.location.origin });
  },
  logout: (force?: boolean) => {
    return http.post('/api/logout', { force }, { baseUrl: window.location.origin });
  },
  sildeSession: () => {
    return http.post<SlideSessionResType>('/api/slide-session', {}, { baseUrl: window.location.origin });
  },
  login: (body: LoginBodyType) => {
    return http.post<LoginResType>('/auth/login', body);
  },
  register: (body: RegisterBodyType) => {
    return http.post<RegisterResType>('/auth/register', body);
  },
  logoutServer: (token: string) => {
    return http.post(
      '/auth/logout',
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  },
  sildeSessionServer: (token: string) => {
    return http.post<SlideSessionResType>(
      '/auth/slide-session',
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  },
};
