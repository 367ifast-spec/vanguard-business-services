"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { supabase } from "@/lib/supabase";

export default function SellerLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (loading) {
      return;
    }

    try {
      setLoading(true);

      // Clear any existing buyer/seller session first.
      const { error: signOutError } =
        await supabase.auth.signOut();

      if (signOutError) {
        console.warn(
          "PRE-LOGIN SIGN OUT ERROR:",
          signOutError
        );
      }

      // Login with the account entered in this form.
      const { data, error } =
        await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

      console.log("SELLER LOGIN DATA:", data);
      console.log("SELLER LOGIN ERROR:", error);

      if (error) {
        alert(error.message);
        return;
      }

      if (!data.user || !data.session) {
        alert(
          "Login succeeded but no authenticated session was created."
        );
        return;
      }

      // Verify which Supabase user is now active.
      const {
        data: { user: activeUser },
        error: activeUserError,
      } = await supabase.auth.getUser();

      if (activeUserError || !activeUser) {
        console.error(
          "ACTIVE USER VERIFY ERROR:",
          activeUserError
        );

        alert(
          "Unable to verify the authenticated account."
        );
        return;
      }

      console.log(
        "ACTIVE USER AFTER LOGIN:",
        activeUser.id
      );

      console.log(
        "ACTIVE USER EMAIL:",
        activeUser.email
      );

      if (activeUser.id !== data.user.id) {
        console.error(
          "SESSION USER MISMATCH:",
          {
            loginUserId: data.user.id,
            activeUserId: activeUser.id,
          }
        );

        alert(
          "Authentication session mismatch. Please try again."
        );
        return;
      }

      alert("Login successful!");

      router.replace("/seller/dashboard");
      router.refresh();
    } catch (error) {
      console.error(
        "SELLER LOGIN ERROR:",
        error
      );

      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#0B1020] text-white">
      <div className="mx-auto max-w-md px-6 py-24">
        <div className="rounded-3xl border border-white/10 bg-[#111827] p-10">
          <h1 className="text-center text-4xl font-bold">
            Seller Login
          </h1>

          <p className="mt-3 text-center text-gray-400">
            Login to your Vanguard Marketplace account.
          </p>

          <form
            onSubmit={handleLogin}
            className="mt-10 space-y-6"
          >
            <div>
              <label className="mb-2 block text-sm font-medium">
                Email Address
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                placeholder="john@example.com"
                autoComplete="email"
                disabled={loading}
                className="w-full rounded-xl bg-[#0B1020] p-4 outline-none disabled:opacity-60"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                placeholder="********"
                autoComplete="current-password"
                disabled={loading}
                className="w-full rounded-xl bg-[#0B1020] p-4 outline-none disabled:opacity-60"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-indigo-600 py-4 font-semibold transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading
                ? "Logging in..."
                : "Login"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}