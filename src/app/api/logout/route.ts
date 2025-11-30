import { cookies } from 'next/headers';

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.set('sessionToken', '', { httpOnly: true, path: '/' });

  return Response.json({ data: null, message: 'Thành công' });
}
