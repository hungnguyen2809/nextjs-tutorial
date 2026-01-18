'use client';
import { authApi } from '@/apis/apiAuth';
import { useAppContext } from '@/contexts/app-ctx';
import { AppStorage } from '@/lib/storage';
import { useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';

function Logout() {
  const searchParams = useSearchParams();
  const { setAccountInfo } = useAppContext();

  useEffect(() => {
    const sessionToken = searchParams.get('sessionToken');
    const sessionTokenClient = AppStorage.getSessionToken();

    if (sessionToken && sessionToken === sessionTokenClient) {
      const handle = async () => {
        await authApi.logout(true);
        AppStorage.clearSession();
        setAccountInfo(null);
        window.location.href = '/login';
      };
      handle();
    }
  }, [searchParams, setAccountInfo]);

  return <div>Logout...</div>;
}

export default function LogoutPage() {
  return (
    <React.Suspense>
      <Logout />
    </React.Suspense>
  );
}
