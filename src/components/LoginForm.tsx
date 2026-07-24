"use client";

import { useState } from "react";
import Link from "next/link";

import { login } from "@/app/login/actions";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const result = await login(
        email,
        password
      );

      if (!result.success) {
        setError(
          result.message || "Login failed."
        );
        return;
      }

      window.location.href =
        "/seller/dashboard";
    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError(
          "Something went wrong. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
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

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" />
            Remember me
          </label>

          <Link
            href="#"
            className="text-sm text-indigo-400"
          >
            Forgot Password?
          </Link>
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
            ? "Logging in..."
            : "Login"}
        </button>
      </form>

      <p className="mt-8 text-center text-gray-400">
        Don't have an account?{" "}
        <Link
          href="/register"
          className="text-indigo-400"
        >
          Register
        </Link>
      </p>
    </>
  );
}