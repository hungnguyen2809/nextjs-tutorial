'use client';

import { clientSessionToken } from '@/apis/http';
import { AccountResType } from '@/schemas/account.schema';
import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext<{ accountInfo: AccountResType['data'] | null }>({
  accountInfo: null,
});

export const AppProvider = (props: {
  children: React.ReactNode;
  token?: string;
  accountInfo: AccountResType['data'] | null;
}) => {
  useState(() => {
    if (typeof window !== 'undefined') {
      clientSessionToken.value = props.token || '';
    }
    // việc đổi từ useEffect sang useState: mục đích để component mount chắc chắn chạy đoạn này trước xong rồi mới đến logic trong useEffect
  });

  return <AppContext.Provider value={{ accountInfo: props.accountInfo }}>{props.children}</AppContext.Provider>;
};

export function useAppContext() {
  const ctx = useContext(AppContext);
  return ctx;
}
