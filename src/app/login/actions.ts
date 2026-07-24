"use server";

import { supabase } from "@/lib/supabase";

export async function login(
  email: string,
  password: string
) {
  const { data, error } =
    await supabase.auth.signInWithPassword({
      email,
      password,
    });

  console.log("USER:", data.user);
  console.log("ERROR:", error);

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  return {
    success: true,
    message: "Login successful",
  };
}