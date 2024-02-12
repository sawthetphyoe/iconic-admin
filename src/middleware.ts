import { NextRequest, NextResponse } from "next/server";
import { deleteCookie, hasCookie } from "cookies-next";

export function middleware(request: NextRequest, response: NextResponse) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", request.nextUrl.pathname);
  const isAuth = hasCookie("accessToken", { req: request });

  if (isAuth) {
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } else {
    return NextResponse.redirect(new URL(`/auth/login`, request.url));
  }
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|fonts|favicon.ico|images|auth/login).*)",
  ],
};
