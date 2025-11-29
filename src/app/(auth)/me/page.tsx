import { ENV } from '@/configs/env';
import { cookies } from 'next/headers';
import Profile from './profile';

async function MePage() {
  const cookieStore = await cookies();

  const response = await fetch(`${ENV.NEXT_PUBLIC_API_ENDPOINT}/account/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${cookieStore.get('sessionToken')?.value}`,
    },
  });

  const result = await response.json();

  return (
    <div>
      <h1>Profile</h1>
      <div>{JSON.stringify(result.data)}</div>

      <Profile />
    </div>
  );
}

export default MePage;
