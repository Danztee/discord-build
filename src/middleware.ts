import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const { pathname, protocol, host } = request.nextUrl;
  const req = request;
  const token = await getToken({ req, secret: process.env.NEXT_AUTH_SECRET });

  const isAuthenticationPath = /^(\/(login|register))$/.test(pathname);

  if (token && isAuthenticationPath) {
    return NextResponse.redirect(new URL(`${protocol}//${host}/`));
  }

  if (!token && isAuthenticationPath) {
    return NextResponse.next();
  }

  if (!token) {
    if (pathname !== "/") {
      return NextResponse.redirect(
        new URL(`${protocol}//${host}/login?next=${pathname.slice(1)}`)
      );
    } else {
      return NextResponse.redirect(new URL(`${protocol}//${host}/login`));
    }
  }

  if (token) {
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
