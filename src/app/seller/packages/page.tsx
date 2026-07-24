import { SELLER_PACKAGES } from "@/lib/seller-packages";

export default function SellerPackagesPage() {
  return (
    <main className="min-h-screen bg-[#0B1020] text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <h1 className="text-5xl font-bold">
          Seller Packages
        </h1>

        <p className="mt-4 text-gray-400">
          Upgrade your account to unlock more
          listings and premium marketplace features.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Object.values(SELLER_PACKAGES).map(
            (pkg) => (
              <div
                key={pkg.name}
                className="rounded-3xl border border-white/10 bg-[#111827] p-8"
              >
                <h2 className="text-3xl font-bold">
                  {pkg.name}
                </h2>

                <p className="mt-4 text-4xl font-bold text-indigo-400">
                  ${pkg.price}
                </p>

                <p className="mt-4 text-gray-400">
                  Listings:
                  {" "}
                  {pkg.isUnlimited
                    ? "Unlimited"
                    : pkg.listingLimit}
                </p>

                <button className="mt-8 w-full rounded-xl bg-indigo-600 py-4 font-semibold">
                  Upgrade
                </button>
              </div>
            )
          )}
        </div>
      </div>
    </main>
  );
}