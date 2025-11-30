'use client';

import { accountApi } from '@/apis/apiAccount';
import { HttpError } from '@/apis/http';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

function Profile() {
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

  return (
    <div className="gap-2">
      <Button onClick={onGetData}>Get Me</Button>
    </div>
  );
}

export default Profile;
