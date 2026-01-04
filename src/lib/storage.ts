export const KEY_SESSION_TOKEN = 'sessionToken';
export const KEY_SESSION_TOKEN_EXPIRE_AT = 'sessionTokenExpireAt';

export const AppStorage = {
  setSessionToken: (token: string) => localStorage.setItem(KEY_SESSION_TOKEN, token),
  setSessionTokenExpireAt: (expireAt: string) => localStorage.setItem(KEY_SESSION_TOKEN_EXPIRE_AT, expireAt),
  getSessionToken: () => localStorage.getItem(KEY_SESSION_TOKEN),
  getSessionTokenExpireAt: () => localStorage.getItem(KEY_SESSION_TOKEN_EXPIRE_AT),
  clearSession: () => {
    localStorage.removeItem(KEY_SESSION_TOKEN);
    localStorage.removeItem(KEY_SESSION_TOKEN_EXPIRE_AT);
  },
};
