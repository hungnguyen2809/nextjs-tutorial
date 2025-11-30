import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const data = ((await request.json()) as { token?: string; expriesAt?: Date }) || {};

  if (data.token && data.expriesAt) {
    const cookieStore = await cookies();
    cookieStore.set('sessionToken', data.token, {
      path: '/',
      secure: true,
      httpOnly: true,
      sameSite: 'lax',
      expires: data.expriesAt,
    });

    return Response.json({ data: data, message: 'Thành công' }, { status: 200 });
  } else {
    return Response.json({ data: data, message: 'Không nhận được session token' }, { status: 400 });
  }
}
