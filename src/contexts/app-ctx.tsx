'use client';

import { isClient } from '@/apis/http';
import { AppStorage } from '@/lib/storage';
import { AccountResType } from '@/schemas/account.schema';
import React, { createContext, useContext, useEffect, useState } from 'react';

const AppContext = createContext<{
  accountInfo: AccountResType['data'] | null;
  setAccountInfo: (accountInfo: AccountResType['data'] | null) => void;
  isAuthenticaed: boolean;
}>({
  accountInfo: null,
  setAccountInfo: () => {},
  isAuthenticaed: false,
});

export const AppProvider = (props: { children: React.ReactNode }) => {
  const [accountInfo, setAccountInfo] = useState<AccountResType['data'] | null>(() => {
    // if (isClient()) return AppStorage.getAccountInfo();
    return null;
  });
  const isAuthenticaed = !!accountInfo;

  useState(() => {
    // if (typeof window !== 'undefined') {
    //   // clientSessionToken.value = props.token || '';
    // }
    // việc đổi từ useEffect sang useState: mục đích để component mount chắc chắn chạy đoạn này trước xong rồi mới đến logic trong useEffect
  });

  useEffect(() => {
    if (isClient()) {
      setAccountInfo(AppStorage.getAccountInfo());
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        accountInfo,
        setAccountInfo,
        isAuthenticaed,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export function useAppContext() {
  const ctx = useContext(AppContext);
  return ctx;
}
