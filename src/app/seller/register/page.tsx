import Link from "next/link";

export default function SellerRegisterPage() {
  return (
    <main className="min-h-screen bg-[#0B1020] text-white">
      <div className="mx-auto max-w-3xl px-6 py-20">
        <h1 className="text-5xl font-bold">Become a Seller</h1>

        <p className="mt-4 text-gray-400">
          Join Vanguard Marketplace and start selling your digital assets.
        </p>

        <form className="mt-10 space-y-6 rounded-2xl bg-white/5 p-8">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full rounded-xl bg-[#111827] p-4 outline-none"
          />

          <input
            type="email"
            placeholder="Email Address"
            className="w-full rounded-xl bg-[#111827] p-4 outline-none"
          />

          <input
            type="text"
            placeholder="Username"
            className="w-full rounded-xl bg-[#111827] p-4 outline-none"
          />

          <textarea
            placeholder="Tell us about yourself"
            rows={5}
            className="w-full rounded-xl bg-[#111827] p-4 outline-none"
          />

          <button className="w-full rounded-xl bg-indigo-600 py-4 font-semibold">
            Submit Application
          </button>
        </form>

        <div className="mt-8">
          <Link href="/marketplace" className="text-indigo-400">
            ← Back to Marketplace
          </Link>
        </div>
      </div>
    </main>
  );
}