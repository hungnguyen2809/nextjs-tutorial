'use client';
import { authApi } from '@/apis/apiAuth';
import { clientSessionToken, HttpError } from '@/apis/http';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

function ButtonLogout() {
  const router = useRouter();

  const onLogout = async () => {
    try {
      await authApi.logout();
      clientSessionToken.clear();
      router.replace('/login');
    } catch (error) {
      if (error instanceof HttpError) {
        toast.error(error.message);
      }
    }
  };

  return (
    <div onClick={onLogout} className="underline cursor-pointer select-none">
      Đăng xuất
    </div>
  );
}

export default ButtonLogout;
