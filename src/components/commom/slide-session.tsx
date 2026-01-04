'use client';
import { authApi } from '@/apis/apiAuth';
import { HttpError } from '@/apis/http';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { AppStorage } from '@/lib/storage';

//Chỗ này là cho chạy ngầm, kiểm tra session token sắp hết hạn chưa nếu sắp thì call gia hạn session token, chứ không phải hiển thị UI
const SlideSession = () => {
  const handleSlideSession = async () => {
    try {
      const { data } = await authApi.sildeSession();
      const expriesAt = new Date(data.data.expiresAt);
      AppStorage.setSessionTokenExpireAt(expriesAt.toISOString());
    } catch (error) {
      if (error instanceof HttpError) {
        toast.error(error.message);
      } else {
        alert(JSON.stringify(error));
      }
    }
  };

  return (
    <div className="mt-10">
      <Button onClick={handleSlideSession}>SlideSession</Button>
    </div>
  );
};

export default SlideSession;
