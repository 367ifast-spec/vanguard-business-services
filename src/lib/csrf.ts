import crypto from "crypto";

const CSRF_TOKEN_LENGTH = 32;

export function generateCsrfToken(): string {
  return crypto.randomBytes(CSRF_TOKEN_LENGTH).toString("hex");
}

export function hashCsrfToken(token: string): string {
  return crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
}

export function verifyCsrfToken(
  token: string | null | undefined,
  hashedToken: string | null | undefined
): boolean {
  if (!token || !hashedToken) {
    return false;
  }

  const hashed = hashCsrfToken(token);

  try {
    return crypto.timingSafeEqual(
      Buffer.from(hashed),
      Buffer.from(hashedToken)
    );
  } catch {
    return false;
  }
}

export function getCsrfCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
    path: "/",
    maxAge: 60 * 60 * 2, // 2 hours
  };
}