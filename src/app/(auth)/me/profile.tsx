'use client';

import { Button } from '@/components/ui/button';
import { ENV } from '@/configs/env';
import { useAppContext } from '@/contexts/app-ctx';

function Profile() {
  const appCtx = useAppContext();

  const onGetData = async () => {
    const response = await fetch(`${ENV.NEXT_PUBLIC_API_ENDPOINT}/account/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${appCtx.sessionToken}`,
      },
    });

    const result = await response.json();
    alert(JSON.stringify(result));
  };

  return (
    <div>
      <Button onClick={onGetData}>Get Me</Button>
    </div>
  );
}

export default Profile;
