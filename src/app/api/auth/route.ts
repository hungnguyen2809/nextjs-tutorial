import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const data = ((await request.json()) as { token?: string; expiresAt?: string }) || {};

  if (data.token && data.expiresAt) {
    const cookieStore = await cookies();
    cookieStore.set('sessionToken', data.token, {
      path: '/',
      secure: true,
      httpOnly: true,
      sameSite: 'lax',
      expires: new Date(data.expiresAt),
    });

    return Response.json({ data: data, message: 'Thành công' }, { status: 200 });
  } else {
    return Response.json({ data: data, message: 'Không nhận được session token' }, { status: 400 });
  }
}
