import { cookies } from "next/headers";
import { randomUUID } from "crypto";

const CART_COOKIE_NAME = "cart_session";

export async function getCartSessionId(): Promise<string> {
  const cookieStore = await cookies();

  const sessionId = cookieStore.get(CART_COOKIE_NAME)?.value;

  if (sessionId) {
    return sessionId;
  }

  return randomUUID();
}