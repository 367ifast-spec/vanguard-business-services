import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const session = req.cookies.get("admin_session");

  const isLoginPage = req.nextUrl.pathname === "/admin/login";

  const isAdminRoute =
    req.nextUrl.pathname.startsWith("/admin") && !isLoginPage;

  if (isAdminRoute && !session) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  if (isLoginPage && session) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};