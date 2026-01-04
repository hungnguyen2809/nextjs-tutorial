'use client';
import { authApi } from '@/apis/apiAuth';
import { AppStorage } from '@/lib/storage';
import { useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';

function Logout() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const sessionToken = searchParams.get('sessionToken');
    const sessionTokenClient = AppStorage.getSessionToken();

    if (sessionToken && sessionToken === sessionTokenClient) {
      const handle = async () => {
        await authApi.logout(true);
        AppStorage.clearSession();
        window.location.href = '/login';
      };
      handle();
    }
  }, [searchParams]);

  return <div>Logout...</div>;
}

export default function LogoutPage() {
  return (
    <React.Suspense>
      <Logout />
    </React.Suspense>
  );
}
