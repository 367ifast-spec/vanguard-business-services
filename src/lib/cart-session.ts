import { cookies } from "next/headers";
import { randomUUID } from "crypto";

const CART_COOKIE_NAME = "cart_session";

export async function getCartSessionId(): Promise<string> {
  const cookieStore = await cookies();

  const existing = cookieStore.get(CART_COOKIE_NAME)?.value;

  if (existing) {
    return existing;
  }

  const sessionId = randomUUID();

  cookieStore.set(CART_COOKIE_NAME, sessionId, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });

  return sessionId;
}