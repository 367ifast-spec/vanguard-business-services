"use server";

import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

export async function login(
  email: string,
  password: string
) {
  try {
    const cookieStore = await cookies();

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },

          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(
                ({ name, value, options }) => {
                  cookieStore.set(
                    name,
                    value,
                    options
                  );
                }
              );
            } catch (error) {
              console.error(
                "Failed to set auth cookies:",
                error
              );
            }
          },
        },
      }
    );

    const { data, error } =
      await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

    if (error) {
      console.error(
        "LOGIN ERROR:",
        error.message
      );

      return {
        success: false,
        message: error.message,
      };
    }

    if (!data.user || !data.session) {
      return {
        success: false,
        message:
          "Login succeeded but no authentication session was created.",
      };
    }

    console.log(
      "LOGIN SUCCESS:",
      data.user.id
    );

    return {
      success: true,
      message: "Login successful",
    };
  } catch (error) {
    console.error("LOGIN FAILED:", error);

    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Login failed.",
    };
  }
}