'use client';
import { authApi } from '@/apis/apiAuth';
import { HttpError } from '@/apis/http';
import { useAppContext } from '@/contexts/app-ctx';
import { AppStorage } from '@/lib/storage';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

function ButtonLogout() {
  const router = useRouter();
  const { setAccountInfo } = useAppContext();

  const onLogout = async () => {
    try {
      await authApi.logout();
      setAccountInfo(null);
      AppStorage.clearSession();
      router.replace('/login');
    } catch (error) {
      if (error instanceof HttpError) {
        toast.error(error.message);
      }
    } finally {
      router.refresh();
    }
  };

  return (
    <div onClick={onLogout} className="underline cursor-pointer select-none">
      Đăng xuất
    </div>
  );
}

export default ButtonLogout;
