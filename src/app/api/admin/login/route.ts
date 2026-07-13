import { NextRequest, NextResponse } from "next/server";
import { ADMIN_EMAIL, ADMIN_PASSWORD } from "@/lib/admin";
import { createAdminSession } from "@/lib/auth";
import { getClientIp, rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

const MAX_ATTEMPTS = 5;
const WINDOW_MS = 60 * 1000;

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req.headers);

    const result = rateLimit(
      `admin-login:${ip}`,
      MAX_ATTEMPTS,
      WINDOW_MS
    );

    if (!result.success) {
      return NextResponse.json(
        {
          error: "Too many login attempts. Please try again in a minute.",
        },
        {
          status: 429,
          headers: {
            "Retry-After": Math.ceil(
              (result.resetAt - Date.now()) / 1000
            ).toString(),
          },
        }
      );
    }

    const { email, password } = await req.json();

    if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        {
          error: "Invalid email or password.",
        },
        {
          status: 401,
        }
      );
    }

    const token = await createAdminSession({
      email,
    });

    const response = NextResponse.json({
      success: true,
    });

    response.cookies.set("admin_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return response;
  } catch (error) {
    console.error("Admin login error:", error);

    return NextResponse.json(
      {
        error: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}