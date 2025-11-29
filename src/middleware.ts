import { NextRequest, NextResponse } from 'next/server';

const authPaths = ['/login', '/register'];
const privatePaths = ['/me'];

export const config = {
  matcher: ['/login', '/register', '/me'],
};

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionToken = request.cookies.get('sessionToken')?.value;

  //Not auth => /login
  if (privatePaths.some((path) => pathname.startsWith(path)) && !sessionToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  //Has auth => /me
  if (authPaths.some((path) => pathname.startsWith(path)) && sessionToken) {
    return NextResponse.redirect(new URL('/me', request.url));
  }

  return NextResponse.next();
}
