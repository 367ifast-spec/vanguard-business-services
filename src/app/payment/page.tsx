import { redirect } from "next/navigation";
import PaymentButton from "@/components/PaymentButton";

interface PaymentPageProps {
  searchParams: Promise<{
    order?: string;
  }>;
}

export const metadata = {
  title: "Payment | Vanguard Business Services",
};

export default async function PaymentPage({
  searchParams,
}: PaymentPageProps) {
  const params = await searchParams;

  if (!params.order) {
    redirect("/checkout");
  }

  return (
    <main className="container mx-auto max-w-2xl px-4 py-16">
      <div className="rounded-2xl border bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold">
          Complete Your Payment
        </h1>

        <p className="mt-4 text-gray-600">
          Click the button below to generate your secure crypto payment
          invoice through NOWPayments.
        </p>

        <div className="mt-8">
          <PaymentButton orderId={params.order} />
        </div>
      </div>
    </main>
  );
}