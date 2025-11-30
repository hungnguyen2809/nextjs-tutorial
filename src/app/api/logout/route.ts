/* eslint-disable @typescript-eslint/no-explicit-any */
import { authApi } from '@/apis/apiAuth';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get('sessionToken')?.value;
  const response = ((await request.json()) as { force?: boolean }) || {};

  if (response.force) {
    cookieStore.set('sessionToken', '', { httpOnly: true, path: '/', maxAge: 0 });
    return Response.json({ data: null, message: 'Thành công' });
  }

  if (!sessionToken) {
    return Response.json({ message: 'session token not found' }, { status: 401 });
  }

  try {
    await authApi.logoutServer(sessionToken);
    cookieStore.set('sessionToken', '', { httpOnly: true, path: '/', maxAge: 0 });
    return Response.json({ data: null, message: 'Thành công' });
  } catch (error) {
    const errorRes = error as any;
    return Response.json({ data: null, message: errorRes?.message || 'Lỗi' }, { status: 401 });
  }
}
