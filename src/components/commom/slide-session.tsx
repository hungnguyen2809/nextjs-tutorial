'use client';
import { authApi } from '@/apis/apiAuth';
import { clientSessionToken, HttpError } from '@/apis/http';
import { toast } from 'sonner';
import { Button } from '../ui/button';

const SlideSession = () => {
  const handleSlideSession = async () => {
    try {
      const { data } = await authApi.sildeSession();
      clientSessionToken.expriesAt = new Date(data.data.expiresAt);
    } catch (error) {
      if (error instanceof HttpError) {
        toast.error(error.message);
      } else {
        alert(JSON.stringify(error));
      }
    }
  };

  return (
    <div>
      <Button onClick={handleSlideSession}>SlideSession</Button>
    </div>
  );
};

export default SlideSession;
