import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#0B1020] text-white">
      <div className="mx-auto flex min-h-screen max-w-md items-center px-6">
        <div className="w-full rounded-3xl border border-white/10 bg-[#111827] p-10">
          <h1 className="text-5xl font-bold">
            Login
          </h1>

          <p className="mt-4 text-gray-400">
            Access your Vanguard Marketplace account.
          </p>

          <form className="mt-10 space-y-6">
            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Email Address
              </label>

              <input
                type="email"
                placeholder="john@example.com"
                className="w-full rounded-xl bg-[#0B1020] p-4 outline-none"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Password
              </label>

              <input
                type="password"
                placeholder="••••••••"
                className="w-full rounded-xl bg-[#0B1020] p-4 outline-none"
                required
              />
            </div>

            {/* Remember Me */}
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

            {/* Submit */}
            <button
              type="submit"
              className="w-full rounded-xl bg-indigo-600 py-4 font-semibold transition hover:bg-indigo-700"
            >
              Login
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
        </div>
      </div>
    </main>
  );
}