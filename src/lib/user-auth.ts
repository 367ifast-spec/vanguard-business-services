import { SignJWT, jwtVerify } from "jose";

const secret = process.env.USER_SESSION_SECRET;

if (!secret) {
  throw new Error(
    "USER_SESSION_SECRET environment variable is missing."
  );
}

const secretKey = new TextEncoder().encode(secret);

const ALGORITHM = "HS256";

export type UserSession = {
  id: string;
  email: string;
  role: "buyer" | "seller";
};

export async function createUserSession(
  payload: UserSession
): Promise<string> {
  return await new SignJWT(payload)
    .setProtectedHeader({
      alg: ALGORITHM,
    })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secretKey);
}

export async function verifyUserSession(
  token: string
): Promise<UserSession | null> {
  try {
    const { payload } = await jwtVerify(
      token,
      secretKey,
      {
        algorithms: [ALGORITHM],
        clockTolerance: 30,
      }
    );

    return {
      id: String(payload.id),
      email: String(payload.email),
      role: payload.role as "buyer" | "seller",
    };
  } catch (err) {
    console.error(
      "User JWT Verify Error:",
      err
    );

    return null;
  }
}

export async function destroyUserSession() {
  return null;
}