import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", request.nextUrl.pathname);

  // console.log("middleware.ts: requestHeaders", requestHeaders);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}
