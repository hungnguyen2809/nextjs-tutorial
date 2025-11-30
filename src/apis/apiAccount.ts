import { AccountResType } from '@/schemas/account.schema';
import { http } from './http';

export const accountApi = {
  me: (token: string) => {
    return http.get<AccountResType>('/account/me', {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
  meClient: () => {
    return http.get<AccountResType>('/account/me');
  },
};
