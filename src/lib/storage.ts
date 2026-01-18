import { AccountResType } from '@/schemas/account.schema';

export const KEY_ACCOUNT_INFO = 'accountInfo';
export const KEY_SESSION_TOKEN = 'sessionToken';
export const KEY_SESSION_TOKEN_EXPIRE_AT = 'sessionTokenExpireAt';

export const AppStorage = {
  setAccountInfo: (account?: AccountResType['data']) => {
    localStorage.setItem(KEY_ACCOUNT_INFO, JSON.stringify(account));
  },
  getAccountInfo: (): AccountResType['data'] | null => {
    const value = localStorage.getItem(KEY_ACCOUNT_INFO);
    return value ? JSON.parse(value) : null;
  },
  setSessionToken: (token: string) => {
    localStorage.setItem(KEY_SESSION_TOKEN, token);
  },
  getSessionToken: () => {
    return localStorage.getItem(KEY_SESSION_TOKEN);
  },
  setSessionTokenExpireAt: (expireAt: string) => {
    localStorage.setItem(KEY_SESSION_TOKEN_EXPIRE_AT, expireAt);
  },
  getSessionTokenExpireAt: () => {
    return localStorage.getItem(KEY_SESSION_TOKEN_EXPIRE_AT);
  },
  clearSession: () => {
    localStorage.removeItem(KEY_ACCOUNT_INFO);
    localStorage.removeItem(KEY_SESSION_TOKEN);
    localStorage.removeItem(KEY_SESSION_TOKEN_EXPIRE_AT);
  },
};
