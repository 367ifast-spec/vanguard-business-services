import { SignJWT, jwtVerify } from "jose";

const secret = process.env.ADMIN_SESSION_SECRET;

if (!secret) {
  throw new Error("ADMIN_SESSION_SECRET environment variable is missing.");
}

const secretKey = new TextEncoder().encode(secret);

const ALGORITHM = "HS256";

export type AdminSession = {
  email: string;
};

export async function createAdminSession(
  payload: AdminSession
): Promise<string> {
  return await new SignJWT(payload)
    .setProtectedHeader({
      alg: ALGORITHM,
    })
    .setIssuedAt()
    .setExpirationTime("30m")
    .sign(secretKey);
}

export async function verifyAdminSession(
  token: string
): Promise<AdminSession | null> {
  try {
    const { payload } = await jwtVerify(token, secretKey, {
      algorithms: [ALGORITHM],
      clockTolerance: 30,
    });

    return {
      email: String(payload.email),
    };
  } catch (err) {
    console.error("JWT Verify Error:", err);
    return null;
  }
}