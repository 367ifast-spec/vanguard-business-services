import Link from "next/link";

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-[#0B1020] text-white">
      <div className="mx-auto flex min-h-screen max-w-md items-center px-6">
        <div className="w-full rounded-3xl border border-white/10 bg-[#111827] p-10">
          <h1 className="text-5xl font-bold">
            Register
          </h1>

          <p className="mt-4 text-gray-400">
            Create your Vanguard Marketplace account.
          </p>

          <form className="mt-10 space-y-6">
            {/* Name */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Full Name
              </label>

              <input
                type="text"
                placeholder="John Doe"
                className="w-full rounded-xl bg-[#0B1020] p-4 outline-none"
                required
              />
            </div>

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

            {/* Role */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Account Type
              </label>

              <select className="w-full rounded-xl bg-[#0B1020] p-4 outline-none">
                <option>Buyer</option>
                <option>Seller</option>
              </select>
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

            {/* Confirm Password */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Confirm Password
              </label>

              <input
                type="password"
                placeholder="••••••••"
                className="w-full rounded-xl bg-[#0B1020] p-4 outline-none"
                required
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full rounded-xl bg-indigo-600 py-4 font-semibold transition hover:bg-indigo-700"
            >
              Create Account
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
        </div>
      </div>
    </main>
  );
}