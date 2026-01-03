import { NextRequest, NextResponse } from 'next/server';

const authPaths = ['/login', '/register'];
const privatePaths = ['/me'];

const regexEditProduct = /^\/products\/\d+\/edit$/;

export const config = {
  matcher: ['/login', '/register', '/me', '/products/:path*'], //chỉ ápp dụng các route matcher ở đây
};

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionToken = request.cookies.get('sessionToken')?.value;

  //Not auth => /login
  if ((privatePaths.some((path) => pathname.startsWith(path)) || pathname.match(regexEditProduct)) && !sessionToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  //Has auth => /me
  if (authPaths.some((path) => pathname.startsWith(path)) && sessionToken) {
    return NextResponse.redirect(new URL('/me', request.url));
  }

  return NextResponse.next();
}
