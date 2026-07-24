"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { register } from "@/app/register/actions";

export default function RegisterForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");
  const [loading, setLoading] =
    useState(false);
  const [error, setError] =
    useState("");

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setLoading(true);
    setError("");

    const result = await register(
      email,
      password
    );

    setLoading(false);

    if (!result.success) {
      setError(
        result.message ||
          "Registration failed."
      );

      return;
    }

    alert(
      "Registration successful! Please check your email."
    );

    router.push("/login");
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="mt-10 space-y-6"
      >
        <div>
          <label className="mb-2 block text-sm font-medium">
            Email Address
          </label>

          <input
            type="email"
            placeholder="john@example.com"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full rounded-xl bg-[#0B1020] p-4 outline-none"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Password
          </label>

          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full rounded-xl bg-[#0B1020] p-4 outline-none"
            required
          />
        </div>

        {error && (
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-indigo-600 py-4 font-semibold transition hover:bg-indigo-700 disabled:opacity-50"
        >
          {loading
            ? "Creating Account..."
            : "Create Account"}
        </button>
      </form>

      <p className="mt-8 text-center text-gray-400">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-indigo-400"
        >
          Login
        </Link>
      </p>
    </>
  );
}