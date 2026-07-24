import Link from "next/link";
import { notFound } from "next/navigation";

const packages = [
  {
    slug: "free",
    name: "FREE",
    price: 0,
    listings: "15",
    badge: "None",
    description: "Perfect for new sellers getting started.",
  },
  {
    slug: "verified",
    name: "VERIFIED",
    price: 10,
    listings: "50",
    badge: "Verified Seller",
    description: "Verified sellers with increased listing capacity.",
  },
  {
    slug: "bronze",
    name: "BRONZE",
    price: 20,
    listings: "100",
    badge: "Bronze Seller",
    description: "Ideal for growing digital asset businesses.",
  },
  {
    slug: "silver",
    name: "SILVER",
    price: 35,
    listings: "250",
    badge: "Silver Seller",
    description: "Designed for active marketplace sellers.",
  },
  {
    slug: "gold",
    name: "GOLD",
    price: 50,
    listings: "500",
    badge: "Gold Seller",
    description: "Advanced package for high-volume sellers.",
  },
  {
    slug: "platinum",
    name: "PLATINUM",
    price: 75,
    listings: "1000",
    badge: "Platinum Seller",
    description: "Enterprise-level package for established sellers.",
  },
  {
    slug: "diamond",
    name: "DIAMOND",
    price: 100,
    listings: "Unlimited",
    badge: "Diamond Seller",
    description:
      "Unlimited listings with premium marketplace status.",
  },
];

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function SellerPackageDetailPage({
  params,
}: Props) {
  const { slug } = await params;

  const pkg = packages.find((p) => p.slug === slug);

  if (!pkg) {
    notFound();
  }

  return (
    <div className="container mx-auto max-w-4xl px-6 py-12">
      <div className="rounded-2xl border p-8 shadow-sm">
        <div className="mb-6">
          <h1 className="text-4xl font-bold">{pkg.name} PACKAGE</h1>

          {pkg.slug === "diamond" && (
            <span className="mt-3 inline-block rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium">
              Featured Package
            </span>
          )}
        </div>

        <div className="space-y-4 text-lg">
          <p>
            <strong>Price:</strong> ${pkg.price}
          </p>

          <p>
            <strong>Listing Limit:</strong> {pkg.listings}
          </p>

          <p>
            <strong>Badge:</strong> {pkg.badge}
          </p>

          <p>
            <strong>Description:</strong> {pkg.description}
          </p>
        </div>

        <div className="mt-8 flex gap-4">
          <Link
            href="/seller/packages"
            className="rounded-lg border px-5 py-3"
          >
            Back
          </Link>

          <button
  className="rounded-lg bg-black px-6 py-3 font-semibold !text-white transition hover:opacity-90"
>
  Activate Free Package
</button>
        </div>
      </div>

      <div className="mt-10 rounded-xl border bg-gray-50 p-6">
        <h2 className="text-xl font-semibold">Seller Requirements</h2>

        <ul className="mt-4 list-disc space-y-2 pl-6 text-gray-600">
          <li>Email Verification (Required)</li>
          <li>Manual KYC (Required)</li>
          <li>Manual Approval (Required)</li>
        </ul>
      </div>
    </div>
  );
}