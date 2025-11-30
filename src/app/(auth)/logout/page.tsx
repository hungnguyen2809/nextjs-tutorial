'use client';
import { authApi } from '@/apis/apiAuth';
import { clientSessionToken } from '@/apis/http';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

function LogoutPage() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const sessionToken = searchParams.get('sessionToken');

    if (sessionToken && sessionToken === clientSessionToken.value) {
      const handle = async () => {
        await authApi.logout(true);
        clientSessionToken.clear();
        window.location.href = '/login';
      };
      handle();
    }
  }, [searchParams]);

  return <div>Logout...</div>;
}

export default LogoutPage;
