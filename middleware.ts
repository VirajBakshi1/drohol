import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, COOKIE_NAME } from '@/lib/auth';

const ADMIN_BASE = '/drohol-9x7k';
const LOGIN_PATH = `${ADMIN_BASE}/login`;

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (!pathname.startsWith(ADMIN_BASE)) return NextResponse.next();

  if (pathname === LOGIN_PATH || pathname.startsWith(`${LOGIN_PATH}/`)) {
    return NextResponse.next();
  }

  const token = req.cookies.get(COOKIE_NAME)?.value;
  const verified = token ? await verifyToken(token) : null;
  if (verified) return NextResponse.next();

  const loginUrl = new URL(LOGIN_PATH, req.url);
  loginUrl.searchParams.set('from', pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ['/drohol-9x7k/:path*'],
};
