import { NextRequest, NextResponse } from "next/server";

const CART_COOKIE_NAME = "cart_session";

export function proxy(req: NextRequest) {
  const session = req.cookies.get("admin_session");

  const isLoginPage = req.nextUrl.pathname === "/admin/login";

  const isAdminRoute =
    req.nextUrl.pathname.startsWith("/admin") && !isLoginPage;

  let response: NextResponse;

  if (isAdminRoute && !session) {
    response = NextResponse.redirect(new URL("/admin/login", req.url));
  } else if (isLoginPage && session) {
    response = NextResponse.redirect(new URL("/admin", req.url));
  } else {
    response = NextResponse.next();
  }

  const cartSession = req.cookies.get(CART_COOKIE_NAME)?.value;

  if (!cartSession) {
    response.cookies.set(CART_COOKIE_NAME, crypto.randomUUID(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
  }

  /*
   * Security Headers
   */

  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  response.headers.set("Cross-Origin-Opener-Policy", "same-origin");
  response.headers.set("Cross-Origin-Resource-Policy", "same-origin");

  if (process.env.NODE_ENV === "production") {
    response.headers.set(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains; preload"
    );
  }

  const csp = [
    "default-src 'self'",
    "base-uri 'self'",
    "object-src 'none'",
    "frame-ancestors 'none'",
    "form-action 'self'",
    "img-src 'self' data: https:",
    "font-src 'self' https: data:",
    "style-src 'self' 'unsafe-inline' https:",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https:",
    "connect-src 'self' https:",
    "frame-src 'self' https:",
    "upgrade-insecure-requests",
  ].join("; ");

  response.headers.set("Content-Security-Policy", csp);

  return response;
}

export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"],
};