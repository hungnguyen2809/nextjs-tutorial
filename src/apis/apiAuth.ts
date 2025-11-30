import { LoginBodyType, LoginResType, RegisterBodyType, RegisterResType } from '@/schemas/auth.schema';
import { http } from './http';

export const authApi = {
  auth: (token: string) => {
    return http.post('/api/auth', { token }, { baseUrl: window.location.origin });
  },
  logout: () => {
    return http.post('/api/logout', null, { baseUrl: window.location.origin });
  },
  login: (body: LoginBodyType) => {
    return http.post<LoginResType>('/auth/login', body);
  },
  register: (body: RegisterBodyType) => {
    return http.post<RegisterResType>('/auth/register', body);
  },
};
