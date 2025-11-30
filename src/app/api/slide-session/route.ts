import { authApi } from '@/apis/apiAuth';
import { cookies } from 'next/headers';

export async function POST() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get('sessionToken')?.value;

  if (!sessionToken) {
    return Response.json({ message: 'Không nhận được session token' }, { status: 401 });
  }

  const { data } = await authApi.sildeSessionServer(sessionToken);
  const newExpriesAt = new Date(data.data.expiresAt);

  cookieStore.set('sessionToken', sessionToken, {
    path: '/',
    secure: true,
    httpOnly: true,
    sameSite: 'lax',
    expires: newExpriesAt,
  });
  return Response.json({ message: 'Thành công', data }, { status: 200 });
}
