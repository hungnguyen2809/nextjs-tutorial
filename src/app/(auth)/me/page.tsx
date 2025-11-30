import { accountApi } from '@/apis/apiAccount';
import { cookies } from 'next/headers';
import Profile from './profile';

async function MePage() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get('sessionToken')?.value ?? '';

  const { data } = await accountApi.me(sessionToken);

  return (
    <div>
      <h1>Profile</h1>
      <div>{JSON.stringify(data.data)}</div>

      <Profile />
    </div>
  );
}

export default MePage;
