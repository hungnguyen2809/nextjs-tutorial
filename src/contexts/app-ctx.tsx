'use client';

import React, { createContext, useContext, useState } from 'react';

type AppContextType = {
  sessionToken: string;
  setSesstionToken: (token: string) => void;
};

export const AppContext = createContext<AppContextType>({ sessionToken: '', setSesstionToken: () => {} });

export const AppProvider = (props: { children: React.ReactNode; token?: string }) => {
  const [token, setToken] = useState(props.token || '');

  return (
    <AppContext.Provider value={{ sessionToken: token, setSesstionToken: setToken }}>
      {props.children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const ctx = useContext(AppContext);
  if (ctx === null) {
    throw new Error('useAppContext must be uesd inside AppProvider');
  }

  return ctx;
};
