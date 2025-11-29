import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const data = ((await request.json()) as { token?: string }) || {};

  if (data.token) {
    const cookieStore = await cookies();
    cookieStore.set('sessionToken', data.token, { httpOnly: true, path: '/' });
  }

  return Response.json({ data: data, message: 'Thành công' });
}
