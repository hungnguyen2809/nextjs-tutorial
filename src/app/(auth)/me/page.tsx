import { accountApi } from '@/apis/apiAccount';
import { cookies } from 'next/headers';
import Profile from './profile';
import ProfileForm from './profile-form';

async function MePage() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get('sessionToken')?.value ?? '';

  const { data } = await accountApi.me(sessionToken);
  console.log(data);

  return (
    <div>
      <h1>Profile</h1>
      <div>{JSON.stringify(data.data)}</div>

      <Profile />

      <div className="mt-[10%]">
        <h1 className="text-center text-2xl font-medium">Cập nhật</h1>
        <div className="flex justify-center mt-1">
          <ProfileForm profile={data} />
        </div>
      </div>
    </div>
  );
}

export default MePage;
