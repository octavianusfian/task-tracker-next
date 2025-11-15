import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const accessToken = req.cookies
    .getAll()
    .find((c) => c.name.includes("sb-") && c.name.includes("auth-token"));;

  const url = req.nextUrl.clone();

  const isAuthPage =
    url.pathname.startsWith("/login") || url.pathname.startsWith("/signup");

  console.log("accessToken", accessToken);
  console.log("isAuthPage", isAuthPage);

  if (!accessToken && !isAuthPage) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  if (accessToken && isAuthPage) {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|static|favicon.ico).*)"],
};
