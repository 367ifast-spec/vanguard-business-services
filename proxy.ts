import { NextRequest, NextResponse } from "next/server";

const CART_COOKIE_NAME = "cart_session";

export function proxy(req: NextRequest) {
  const session = req.cookies.get("admin_session");

  const isLoginPage = req.nextUrl.pathname === "/admin/login";

  const isAdminRoute =
    req.nextUrl.pathname.startsWith("/admin") && !isLoginPage;

  let response: NextResponse;

  if (isAdminRoute && !session) {
    response = NextResponse.redirect(
      new URL("/admin/login", req.url)
    );
  } else if (isLoginPage && session) {
    response = NextResponse.redirect(
      new URL("/admin", req.url)
    );
  } else {
    response = NextResponse.next();
  }

  const cartSession = req.cookies.get(CART_COOKIE_NAME)?.value;

  if (!cartSession) {
    console.log("Creating cart cookie...");

    response.cookies.set(CART_COOKIE_NAME, crypto.randomUUID(), {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
  }

  console.log(
    "Current cart cookie:",
    req.cookies.get(CART_COOKIE_NAME)?.value
  );

  return response;
}

export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"],
};