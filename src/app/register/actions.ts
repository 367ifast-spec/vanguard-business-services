"use server";

import { supabase } from "@/lib/supabase";

export async function register(
  email: string,
  password: string
) {
  const { data, error } =
    await supabase.auth.signUp({
      email,
      password,
    });

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  return {
    success: true,
    user: data.user,
  };
}