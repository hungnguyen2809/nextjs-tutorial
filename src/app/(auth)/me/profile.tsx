'use client';

import { accountApi } from '@/apis/apiAccount';
import { authApi } from '@/apis/apiAuth';
import { HttpError, clientSessionToken } from '@/apis/http';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

function Profile() {
  const router = useRouter();
  const onGetData = async () => {
    try {
      const { data } = await accountApi.meClient();
      alert(JSON.stringify(data.data));
    } catch (error) {
      if (error instanceof HttpError) {
        toast.error(error.message);
      }
    }
  };

  const onLogout = async () => {
    try {
      await authApi.logout();
      clientSessionToken.value = '';
      router.replace('/login');
    } catch (error) {
      if (error instanceof HttpError) {
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="gap-2">
      <Button onClick={onGetData}>Get Me</Button>

      <Button onClick={onLogout}>Logout</Button>
    </div>
  );
}

export default Profile;
