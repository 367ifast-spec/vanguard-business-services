import Link from "next/link";

import VerifyEscrowPaymentButton from "@/components/admin/VerifyEscrowPaymentButton";
import { supabaseAdmin } from "@/lib/supabase";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

type PaymentRecord = {
  id: string;
  transaction_id: string;
  buyer_id: string;
  provider: string;
  payment_reference: string | null;
  amount: number | string;
  status: string;
  submitted_at: string;
  verified_at: string | null;
  created_at: string;
  updated_at: string;
};

type TransactionRecord = {
  id: string;
  buyer_id: string;
  seller_id: string;
  listing_id: string;
  amount: number | string;
  buyer_fee: number | string;
  seller_fee: number | string;
  total_fee: number | string;
  status: string;
  payment_id: string | null;
  funded_at: string | null;
  delivered_at: string | null;
  released_at: string | null;
  disputed_at: string | null;
  created_at: string;
  updated_at: string;
};

type ListingRecord = {
  id: string;
  title: string;
  slug: string;
  price: number | string;
  status: string;
};

function formatMoney(value: number | string) {
  const amount = Number(value);

  if (!Number.isFinite(amount)) {
    return "$0.00";
  }

  return `$${amount.toFixed(2)}`;
}

function formatDate(value: string | null) {
  if (!value) {
    return "—";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleString("en-US");
}

function getStatusClass(status: string) {
  switch (status.toLowerCase()) {
    case "verified":
    case "funded":
    case "completed":
    case "released":
      return "border-green-500/30 bg-green-500/10 text-green-300";

    case "rejected":
    case "disputed":
      return "border-red-500/30 bg-red-500/10 text-red-300";

    case "submitted":
    case "pending":
      return "border-yellow-500/30 bg-yellow-500/10 text-yellow-300";

    default:
      return "border-gray-500/30 bg-gray-500/10 text-gray-300";
  }
}

function DetailRow({
  label,
  value,
  mono = false,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="border-b border-white/10 py-4 last:border-b-0">
      <p className="text-xs uppercase tracking-wider text-gray-500">
        {label}
      </p>

      <p
        className={`mt-2 break-all text-sm text-gray-200 ${
          mono ? "font-mono" : ""
        }`}
      >
        {value}
      </p>
    </div>
  );
}

export default async function AdminPaymentReviewPage({
  params,
}: PageProps) {
  const { id } = await params;

  if (!supabaseAdmin) {
    return (
      <main className="min-h-screen bg-[#0B1020] px-6 py-16 text-white">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-8">
            <h1 className="text-2xl font-bold text-red-300">
              Admin Configuration Error
            </h1>

            <p className="mt-3 text-red-200">
              Supabase admin client is unavailable.
            </p>
          </div>
        </div>
      </main>
    );
  }

  const {
    data: paymentData,
    error: paymentError,
  } = await supabaseAdmin
    .from("escrow_payments")
    .select(
      `
        id,
        transaction_id,
        buyer_id,
        provider,
        payment_reference,
        amount,
        status,
        submitted_at,
        verified_at,
        created_at,
        updated_at
      `
    )
    .eq("id", id)
    .maybeSingle();

  if (paymentError) {
    console.error(
      "ADMIN PAYMENT REVIEW ERROR:",
      paymentError
    );
  }

  if (paymentError || !paymentData) {
    return (
      <main className="min-h-screen bg-[#0B1020] px-6 py-16 text-white">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-8">
            <h1 className="text-3xl font-bold text-red-300">
              Payment Unavailable
            </h1>

            <p className="mt-3 text-gray-300">
              The payment record could not be found.
            </p>

            <Link
              href="/admin/marketplace/payments"
              className="mt-6 inline-flex rounded-xl bg-indigo-600 px-5 py-3 font-semibold transition hover:bg-indigo-700"
            >
              Back to Payments
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const payment =
    paymentData as PaymentRecord;

  const {
    data: transactionData,
    error: transactionError,
  } = await supabaseAdmin
    .from("escrow_transactions")
    .select(
      `
        id,
        buyer_id,
        seller_id,
        listing_id,
        amount,
        buyer_fee,
        seller_fee,
        total_fee,
        status,
        payment_id,
        funded_at,
        delivered_at,
        released_at,
        disputed_at,
        created_at,
        updated_at
      `
    )
    .eq(
      "id",
      payment.transaction_id
    )
    .maybeSingle();

  if (transactionError) {
    console.error(
      "ADMIN TRANSACTION REVIEW ERROR:",
      transactionError
    );
  }

  const transaction = transactionData
    ? (transactionData as TransactionRecord)
    : null;

  let listing: ListingRecord | null = null;

  if (transaction?.listing_id) {
    const {
      data: listingData,
      error: listingError,
    } = await supabaseAdmin
      .from("marketplace_listings")
      .select(
        "id, title, slug, price, status"
      )
      .eq("id", transaction.listing_id)
      .maybeSingle();

    if (listingError) {
      console.error(
        "ADMIN PAYMENT LISTING ERROR:",
        listingError
      );
    }

    if (listingData) {
      listing =
        listingData as ListingRecord;
    }
  }

  const transactionAmount = transaction
    ? Number(transaction.amount)
    : 0;

  const buyerFee = transaction
    ? Number(transaction.buyer_fee)
    : 0;

  const sellerFee = transaction
    ? Number(transaction.seller_fee)
    : 0;

  const totalFee = transaction
    ? Number(transaction.total_fee)
    : 0;

  const buyerTotal =
    transactionAmount + buyerFee;

  const sellerReceives =
    transactionAmount - sellerFee;

  return (
    <main className="min-h-screen bg-[#0B1020] text-white">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-400">
              Vanguard Marketplace
            </p>

            <h1 className="mt-3 text-4xl font-bold">
              Payment Review
            </h1>

            <p className="mt-3 text-gray-400">
              Review the submitted payment and
              associated escrow transaction.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/admin/marketplace/payments"
              className="rounded-xl border border-white/10 px-5 py-3 text-sm font-semibold transition hover:bg-white/5"
            >
              Back to Payments
            </Link>

            <Link
              href="/admin/marketplace"
              className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold transition hover:bg-indigo-700"
            >
              Marketplace Admin
            </Link>
          </div>
        </div>

        <section className="mt-10 rounded-2xl border border-white/10 bg-[#111827] p-7">
          <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-sm text-gray-500">
                Payment Record
              </p>

              <p className="mt-2 break-all font-mono text-sm text-gray-300">
                {payment.id}
              </p>
            </div>

            <span
              className={`inline-flex w-fit rounded-full border px-4 py-2 text-xs font-bold uppercase ${getStatusClass(
                payment.status
              )}`}
            >
              {payment.status}
            </span>
          </div>

          <div className="mt-6 border-t border-white/10 pt-6">
            <p className="text-sm text-gray-500">
              Submitted Amount
            </p>

            <p className="mt-2 text-4xl font-bold text-indigo-400">
              {formatMoney(payment.amount)}
            </p>
          </div>
        </section>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <section className="rounded-2xl border border-white/10 bg-[#111827] p-7">
            <h2 className="text-xl font-bold">
              Payment Information
            </h2>

            <div className="mt-4">
              <DetailRow
                label="Payment ID"
                value={payment.id}
                mono
              />

              <DetailRow
                label="Transaction ID"
                value={
                  payment.transaction_id
                }
                mono
              />

              <DetailRow
                label="Buyer ID"
                value={payment.buyer_id}
                mono
              />

              <DetailRow
                label="Payment Method"
                value={payment.provider}
              />

              <DetailRow
                label="Payment Reference"
                value={
                  payment.payment_reference ||
                  "Not provided"
                }
              />

              <DetailRow
                label="Amount Submitted"
                value={formatMoney(
                  payment.amount
                )}
              />

              <DetailRow
                label="Submitted"
                value={formatDate(
                  payment.submitted_at
                )}
              />

              <DetailRow
                label="Verified"
                value={formatDate(
                  payment.verified_at
                )}
              />
            </div>
          </section>

          <section className="rounded-2xl border border-white/10 bg-[#111827] p-7">
            <h2 className="text-xl font-bold">
              Escrow Transaction
            </h2>

            {!transaction ? (
              <div className="mt-5 rounded-xl border border-red-500/30 bg-red-500/10 p-5 text-sm text-red-300">
                Associated escrow transaction
                could not be loaded.
              </div>
            ) : (
              <div className="mt-4">
                <DetailRow
                  label="Transaction Status"
                  value={transaction.status}
                />

                <DetailRow
                  label="Listing ID"
                  value={transaction.listing_id}
                  mono
                />

                <DetailRow
                  label="Buyer ID"
                  value={transaction.buyer_id}
                  mono
                />

                <DetailRow
                  label="Seller ID"
                  value={transaction.seller_id}
                  mono
                />

                <DetailRow
                  label="Created"
                  value={formatDate(
                    transaction.created_at
                  )}
                />

                <DetailRow
                  label="Funded"
                  value={formatDate(
                    transaction.funded_at
                  )}
                />

                <DetailRow
                  label="Payment ID"
                  value={
                    transaction.payment_id ||
                    "Not funded yet"
                  }
                  mono={
                    Boolean(
                      transaction.payment_id
                    )
                  }
                />
              </div>
            )}
          </section>
        </div>

        {transaction ? (
          <section className="mt-6 rounded-2xl border border-white/10 bg-[#111827] p-7">
            <h2 className="text-xl font-bold">
              Financial Summary
            </h2>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
                <p className="text-sm text-gray-400">
                  Listing Price
                </p>

                <p className="mt-2 text-xl font-bold">
                  {formatMoney(
                    transaction.amount
                  )}
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
                <p className="text-sm text-gray-400">
                  Buyer Fee
                </p>

                <p className="mt-2 text-xl font-bold">
                  {formatMoney(
                    transaction.buyer_fee
                  )}
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
                <p className="text-sm text-gray-400">
                  Buyer Total
                </p>

                <p className="mt-2 text-xl font-bold text-indigo-400">
                  {formatMoney(buyerTotal)}
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
                <p className="text-sm text-gray-400">
                  Platform Fee
                </p>

                <p className="mt-2 text-xl font-bold text-yellow-300">
                  {formatMoney(totalFee)}
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
                <p className="text-sm text-gray-400">
                  Seller Receives
                </p>

                <p className="mt-2 text-xl font-bold text-green-400">
                  {formatMoney(
                    sellerReceives
                  )}
                </p>
              </div>
            </div>

            <p className="mt-4 text-xs text-gray-500">
              Seller fee:{" "}
              {formatMoney(sellerFee)}
            </p>
          </section>
        ) : null}

        {listing ? (
          <section className="mt-6 rounded-2xl border border-white/10 bg-[#111827] p-7">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm text-gray-500">
                  Marketplace Listing
                </p>

                <h2 className="mt-2 text-2xl font-bold">
                  {listing.title}
                </h2>

                <p className="mt-2 text-sm text-gray-400">
                  Listing price:{" "}
                  {formatMoney(listing.price)}
                </p>
              </div>

              <Link
                href={`/marketplace/${listing.slug}`}
                className="inline-flex w-fit rounded-xl border border-indigo-500/30 bg-indigo-500/10 px-5 py-3 text-sm font-semibold text-indigo-300 transition hover:bg-indigo-500/20"
              >
                View Listing →
              </Link>
            </div>
          </section>
        ) : null}
<section className="mt-6 rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-7">
  <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
    <div className="max-w-3xl">
      <h2 className="text-lg font-bold text-yellow-300">
        Awaiting Verification
      </h2>

      <p className="mt-2 text-sm leading-6 text-gray-400">
        Review the payment details carefully.
        Verify only after confirming the submitted
        payment. Verification will mark the payment
        as verified and fund the associated escrow
        transaction.
      </p>
    </div>

    <span
      className={`inline-flex w-fit rounded-full border px-4 py-2 text-xs font-bold uppercase ${getStatusClass(
        payment.status
      )}`}
    >
      {payment.status}
    </span>
  </div>

  <div className="mt-6 border-t border-white/10 pt-6">
    <VerifyEscrowPaymentButton
      paymentId={payment.id}
      paymentStatus={payment.status}
    />
  </div>
</section>
      </div>
    </main>
  );
}