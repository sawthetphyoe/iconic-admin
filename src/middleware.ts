import { NextRequest, NextResponse } from "next/server";
import { hasCookie } from "cookies-next";

export function middleware(request: NextRequest) {
  const isAuth = hasCookie("iconic-access-token", { req: request });

  if (isAuth) {
    return NextResponse.next({
      headers: {
        "Content-Security-Policy": "upgrade-insecure-requests",
      },
    });
  } else {
    return NextResponse.redirect(new URL(`/auth/login`, request.url), {
      headers: {
        "Content-Security-Policy": "upgrade-insecure-requests",
      },
    });
  }
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|fonts|favicon.ico|images|auth/login).*)",
  ],
};
