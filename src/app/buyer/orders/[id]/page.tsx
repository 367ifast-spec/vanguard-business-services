"use client";

import Link from "next/link";
import {
  useParams,
  useRouter,
} from "next/navigation";
import {
  FormEvent,
  useEffect,
  useState,
} from "react";

import { supabase } from "@/lib/supabase";

type EscrowTransaction = {
  id: string;
  buyer_id: string;
  seller_id: string;
  listing_id: string | null;
  amount: number | string;
  buyer_fee: number | string | null;
  seller_fee: number | string | null;
  total_fee: number | string | null;
  status: string | null;
  payment_id: string | null;
  created_at: string | null;
  updated_at: string | null;
};

type MarketplaceListing = {
  id: string;
  title: string;
  slug: string;
};

type EscrowPayment = {
  id: string;
  transaction_id: string;
  buyer_id: string;
  provider: string;
  payment_reference: string | null;
  amount: number | string;
  status: string;
  submitted_at: string | null;
  verified_at: string | null;
};

type FundResponse = {
  success?: boolean;
  paymentRequired?: boolean;
  alreadyFunded?: boolean;
  message?: string;
  transactionId?: string;
  status?: string | null;
  paymentId?: string | null;

  payment?: {
    currency?: string;
    listingAmount?: number;
    buyerFee?: number;
    buyerTotal?: number;
  };
};

type SubmitPaymentResponse = {
  success?: boolean;
  message?: string;
  paymentId?: string;
  transactionId?: string;
  paymentStatus?: string;
  amountDue?: number;
  payment?: EscrowPayment;
};

export default function BuyerOrderDetailsPage() {
  const params = useParams<{
    id: string;
  }>();

  const router = useRouter();

  const transactionId = String(
    params.id ?? ""
  );

  const [transaction, setTransaction] =
    useState<EscrowTransaction | null>(
      null
    );

  const [listing, setListing] =
    useState<MarketplaceListing | null>(
      null
    );

  const [payment, setPayment] =
    useState<EscrowPayment | null>(
      null
    );

  const [loading, setLoading] =
    useState(true);

  const [funding, setFunding] =
    useState(false);

  const [paymentReady, setPaymentReady] =
    useState(false);

  const [provider, setProvider] =
    useState("manual");

  const [
    paymentReference,
    setPaymentReference,
  ] = useState("");

  const [submitting, setSubmitting] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [fundMessage, setFundMessage] =
    useState("");

  const [fundError, setFundError] =
    useState(false);

  const [
    submitMessage,
    setSubmitMessage,
  ] = useState("");

  const [submitError, setSubmitError] =
    useState(false);

  useEffect(() => {
    let active = true;

    async function loadTransaction() {
      try {
        setLoading(true);
        setMessage("");

        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (!active) {
          return;
        }

        if (userError) {
          console.error(
            "BUYER TRANSACTION AUTH ERROR:",
            userError
          );

          setMessage(
            `Authentication failed: ${userError.message}`
          );

          return;
        }

        if (!user) {
          router.replace("/login");
          return;
        }

        if (!transactionId) {
          setMessage(
            "Transaction ID is missing."
          );

          return;
        }

        const {
          data: transactionData,
          error: transactionError,
        } = await supabase
          .from("escrow_transactions")
          .select(`
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
            created_at,
            updated_at
          `)
          .eq("id", transactionId)
          .eq("buyer_id", user.id)
          .maybeSingle();

        if (!active) {
          return;
        }

        if (transactionError) {
          console.error(
            "BUYER TRANSACTION LOAD ERROR:",
            transactionError
          );

          setMessage(
            `Failed to load transaction: ${transactionError.message}`
          );

          return;
        }

        if (!transactionData) {
          setMessage(
            "Transaction not found or you do not have permission to view it."
          );

          return;
        }

        const currentTransaction =
          transactionData as EscrowTransaction;

        setTransaction(
          currentTransaction
        );

        const {
          data: paymentData,
          error: paymentError,
        } = await supabase
          .from("escrow_payments")
          .select(`
            id,
            transaction_id,
            buyer_id,
            provider,
            payment_reference,
            amount,
            status,
            submitted_at,
            verified_at
          `)
          .eq(
            "transaction_id",
            currentTransaction.id
          )
          .eq("buyer_id", user.id)
          .order("created_at", {
            ascending: false,
          })
          .limit(1)
          .maybeSingle();

        if (!active) {
          return;
        }

        if (paymentError) {
          console.error(
            "ESCROW PAYMENT LOAD ERROR:",
            paymentError
          );
        } else if (paymentData) {
          setPayment(
            paymentData as EscrowPayment
          );

          setPaymentReady(true);
        }

        if (
          !currentTransaction.listing_id
        ) {
          return;
        }

        const {
          data: listingData,
          error: listingError,
        } = await supabase
          .from("marketplace_listings")
          .select(
            "id, title, slug"
          )
          .eq(
            "id",
            currentTransaction.listing_id
          )
          .maybeSingle();

        if (!active) {
          return;
        }

        if (listingError) {
          console.error(
            "BUYER TRANSACTION LISTING ERROR:",
            listingError
          );

          return;
        }

        if (listingData) {
          setListing(
            listingData as MarketplaceListing
          );
        }
      } catch (error) {
        console.error(
          "BUYER TRANSACTION UNEXPECTED ERROR:",
          error
        );

        if (!active) {
          return;
        }

        setMessage(
          error instanceof Error
            ? error.message
            : "Failed to load transaction."
        );
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadTransaction();

    return () => {
      active = false;
    };
  }, [router, transactionId]);
    async function handleFundEscrow() {
    if (
      funding ||
      !transaction
    ) {
      return;
    }

    try {
      setFunding(true);
      setFundMessage("");
      setFundError(false);

      const {
        data: { session },
        error: sessionError,
      } =
        await supabase.auth.getSession();

      if (sessionError) {
        setFundError(true);

        setFundMessage(
          `Authentication failed: ${sessionError.message}`
        );

        return;
      }

      if (
        !session?.user ||
        !session.access_token
      ) {
        router.push("/login");
        return;
      }

      const response = await fetch(
        "/api/marketplace/escrow/fund",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${session.access_token}`,
          },

          body: JSON.stringify({
            transactionId:
              transaction.id,
          }),
        }
      );

      let data: FundResponse;

      try {
        data =
          (await response.json()) as FundResponse;
      } catch {
        setFundError(true);

        setFundMessage(
          "Escrow funding API returned an invalid response."
        );

        return;
      }

      console.log(
        "ESCROW FUND RESPONSE:",
        data
      );

      if (
        !response.ok ||
        !data.success
      ) {
        setFundError(true);

        setFundMessage(
          data.message ||
            "Unable to prepare escrow funding."
        );

        return;
      }

      if (data.alreadyFunded) {
        setFundMessage(
          data.message ||
            "This transaction is already funded."
        );

        return;
      }

      if (data.paymentRequired) {
        setPaymentReady(true);

        setFundMessage(
          data.message ||
            "Escrow is ready for payment."
        );

        return;
      }

      setFundMessage(
        data.message ||
          "Escrow funding request completed."
      );
    } catch (error) {
      console.error(
        "ESCROW FUND ERROR:",
        error
      );

      setFundError(true);

      setFundMessage(
        error instanceof Error
          ? error.message
          : "Unable to prepare escrow funding."
      );
    } finally {
      setFunding(false);
    }
  }

  async function handleSubmitPayment(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (
      submitting ||
      !transaction
    ) {
      return;
    }

    const cleanReference =
      paymentReference.trim();

    if (!cleanReference) {
      setSubmitError(true);

      setSubmitMessage(
        "Payment reference is required."
      );

      return;
    }

    try {
      setSubmitting(true);
      setSubmitMessage("");
      setSubmitError(false);

      const {
        data: { session },
        error: sessionError,
      } =
        await supabase.auth.getSession();

      if (sessionError) {
        setSubmitError(true);

        setSubmitMessage(
          `Authentication failed: ${sessionError.message}`
        );

        return;
      }

      if (
        !session?.user ||
        !session.access_token
      ) {
        router.push("/login");
        return;
      }

      const response = await fetch(
        "/api/marketplace/escrow/submit-payment",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${session.access_token}`,
          },

          body: JSON.stringify({
            transactionId:
              transaction.id,

            provider,

            paymentReference:
              cleanReference,
          }),
        }
      );

      let data: SubmitPaymentResponse;

      try {
        data =
          (await response.json()) as SubmitPaymentResponse;
      } catch {
        setSubmitError(true);

        setSubmitMessage(
          "Payment API returned an invalid response."
        );

        return;
      }

      console.log(
        "ESCROW PAYMENT SUBMISSION RESPONSE:",
        data
      );

      if (
        !response.ok ||
        !data.success
      ) {
        setSubmitError(true);

        setSubmitMessage(
          data.message ||
            "Unable to submit payment."
        );

        return;
      }

      if (data.payment) {
        setPayment(data.payment);
      }

      setPaymentReady(true);
      setPaymentReference("");

      setSubmitMessage(
        data.message ||
          "Payment submitted and is awaiting verification."
      );
    } catch (error) {
      console.error(
        "PAYMENT SUBMISSION ERROR:",
        error
      );

      setSubmitError(true);

      setSubmitMessage(
        error instanceof Error
          ? error.message
          : "Unable to submit payment."
      );
    } finally {
      setSubmitting(false);
    }
  }
    function formatMoney(
    value: number | string | null
  ) {
    const amount = Number(
      value ?? 0
    );

    if (!Number.isFinite(amount)) {
      return "$0.00";
    }

    return new Intl.NumberFormat(
      "en-US",
      {
        style: "currency",
        currency: "USD",
      }
    ).format(amount);
  }

  function formatDate(
    value: string | null
  ) {
    if (!value) {
      return "—";
    }

    const date = new Date(value);

    if (
      Number.isNaN(date.getTime())
    ) {
      return "—";
    }

    return date.toLocaleString(
      "en-US"
    );
  }

  function getStatusClasses(
    status: string | null
  ) {
    const currentStatus = (
      status ?? "pending"
    ).toLowerCase();

    if (
      currentStatus === "completed" ||
      currentStatus === "released"
    ) {
      return "border-green-500/30 bg-green-500/10 text-green-300";
    }

    if (
      currentStatus === "disputed"
    ) {
      return "border-red-500/30 bg-red-500/10 text-red-300";
    }

    if (
      currentStatus === "funded" ||
      currentStatus === "paid"
    ) {
      return "border-blue-500/30 bg-blue-500/10 text-blue-300";
    }

    return "border-yellow-500/30 bg-yellow-500/10 text-yellow-300";
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0B1020] px-6 text-white">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-white/10 border-t-indigo-500" />

          <p className="mt-4 text-gray-400">
            Loading transaction...
          </p>
        </div>
      </main>
    );
  }

  if (!transaction) {
    return (
      <main className="min-h-screen bg-[#0B1020] px-6 py-16 text-white">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-3xl border border-red-500/20 bg-red-500/10 p-8">
            <h1 className="text-2xl font-bold text-red-300">
              Transaction Unavailable
            </h1>

            <p className="mt-3 text-gray-300">
              {message ||
                "The transaction could not be loaded."}
            </p>

            <Link
              href="/buyer/orders"
              className="mt-6 inline-flex rounded-xl bg-indigo-600 px-5 py-3 font-semibold transition hover:bg-indigo-700"
            >
              Back to My Purchases
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const buyerTotal =
    Number(transaction.amount ?? 0) +
    Number(
      transaction.buyer_fee ?? 0
    );

  const sellerReceives =
    Number(transaction.amount ?? 0) -
    Number(
      transaction.seller_fee ?? 0
    );

  const transactionStatus = (
    transaction.status ?? "pending"
  ).toLowerCase();

  const paymentStatus = (
    payment?.status ?? ""
  ).toLowerCase();

  /*
   * Payment / escrow state
   *
   * Keep submitted, verified and funded
   * separate so the buyer UI does not show
   * "awaiting verification" after escrow
   * has already been funded.
   */
  const isFunded =
    transactionStatus === "funded";

  const paymentVerified =
    paymentStatus === "verified";

  const paymentSubmitted =
    paymentStatus === "submitted";

  const paymentInProgress =
    paymentSubmitted ||
    paymentVerified ||
    isFunded;

  /*
   * Buyer can prepare escrow only while:
   *
   * 1. Transaction is pending
   * 2. No submitted/verified payment exists
   * 3. Escrow is not already funded
   */
  const canFund =
    transactionStatus === "pending" &&
    !paymentInProgress;
      return (
    <main className="min-h-screen bg-[#0B1020] text-white">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-400">
              Vanguard Marketplace
            </p>

            <h1 className="mt-3 text-4xl font-bold md:text-5xl">
              Transaction Details
            </h1>

            <p className="mt-3 text-gray-400">
              Review your protected marketplace
              transaction.
            </p>
          </div>

          <Link
            href="/buyer/orders"
            className="w-fit rounded-xl border border-white/10 px-5 py-3 font-semibold transition hover:bg-white/5"
          >
            My Purchases
          </Link>
        </div>

        <div className="mt-10 rounded-3xl border border-white/10 bg-[#111827] p-7 md:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm text-gray-400">
                Transaction ID
              </p>

              <p className="mt-2 break-all font-mono text-sm text-gray-200">
                {transaction.id}
              </p>
            </div>

            <span
              className={`w-fit rounded-full border px-4 py-2 text-sm font-semibold uppercase tracking-wide ${getStatusClasses(
                transaction.status
              )}`}
            >
              {transaction.status ??
                "pending"}
            </span>
          </div>

          {listing ? (
            <div className="mt-8 border-t border-white/10 pt-7">
              <p className="text-sm text-gray-400">
                Marketplace Listing
              </p>

              <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-2xl font-bold">
                  {listing.title}
                </h2>

                <Link
                  href={`/listing/${listing.slug}`}
                  className="w-fit font-semibold text-indigo-400 transition hover:text-indigo-300"
                >
                  View Listing →
                </Link>
              </div>
            </div>
          ) : null}
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-[#111827] p-7">
            <h2 className="text-xl font-bold">
              Payment Summary
            </h2>

            <div className="mt-6 space-y-4">
              <div className="flex justify-between gap-4">
                <span className="text-gray-400">
                  Listing Price
                </span>

                <span className="font-semibold">
                  {formatMoney(
                    transaction.amount
                  )}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-gray-400">
                  Buyer Fee
                </span>

                <span className="font-semibold">
                  {formatMoney(
                    transaction.buyer_fee
                  )}
                </span>
              </div>

              <div className="border-t border-white/10 pt-4">
                <div className="flex justify-between gap-4">
                  <span className="font-semibold">
                    Buyer Total
                  </span>

                  <span className="text-xl font-bold text-indigo-400">
                    {formatMoney(
                      buyerTotal
                    )}
                  </span>
                </div>
              </div>
            </div>

            {canFund ? (
              <div className="mt-7 border-t border-white/10 pt-6">
                <button
                  type="button"
                  onClick={
                    handleFundEscrow
                  }
                  disabled={funding}
                  className="w-full rounded-xl bg-green-600 px-6 py-4 font-semibold transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {funding
                    ? "Preparing Escrow..."
                    : `Fund Escrow — ${formatMoney(
                        buyerTotal
                      )}`}
                </button>
              </div>
            ) : null}

            {fundMessage ? (
              <div
                className={`mt-5 rounded-xl border p-4 text-sm ${
                  fundError
                    ? "border-red-500/30 bg-red-500/10 text-red-300"
                    : "border-green-500/30 bg-green-500/10 text-green-300"
                }`}
              >
                {fundMessage}
              </div>
            ) : null}
          </div>

          <div className="rounded-3xl border border-white/10 bg-[#111827] p-7">
            <h2 className="text-xl font-bold">
              Escrow Summary
            </h2>

            <div className="mt-6 space-y-4">
              <div className="flex justify-between gap-4">
                <span className="text-gray-400">
                  Seller Fee
                </span>

                <span className="font-semibold">
                  {formatMoney(
                    transaction.seller_fee
                  )}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-gray-400">
                  Total Platform Fee
                </span>

                <span className="font-semibold">
                  {formatMoney(
                    transaction.total_fee
                  )}
                </span>
              </div>

              <div className="border-t border-white/10 pt-4">
                <div className="flex justify-between gap-4">
                  <span className="font-semibold">
                    Seller Receives
                  </span>

                  <span className="text-xl font-bold text-green-400">
                    {formatMoney(
                      sellerReceives
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
                {paymentReady &&
        !paymentInProgress &&
        transactionStatus === "pending" ? (
          <div className="mt-6 rounded-3xl border border-indigo-500/20 bg-[#111827] p-7 md:p-8">
            <h2 className="text-2xl font-bold">
              Submit Payment
            </h2>

            <p className="mt-2 text-gray-400">
              Submit your payment reference for
              verification. Escrow will not become
              funded until the payment is verified.
            </p>

            <form
              onSubmit={handleSubmitPayment}
              className="mt-7 space-y-6"
            >
              <div>
                <label
                  htmlFor="payment-provider"
                  className="mb-2 block font-medium"
                >
                  Payment Method
                </label>

                <select
                  id="payment-provider"
                  value={provider}
                  disabled={submitting}
                  onChange={(event) =>
                    setProvider(
                      event.target.value
                    )
                  }
                  className="w-full rounded-xl border border-white/10 bg-[#0B1020] p-4 outline-none focus:border-indigo-500"
                >
                  <option value="manual">
                    Manual / Test Payment
                  </option>

                  <option value="bank_transfer">
                    Bank Transfer
                  </option>

                  <option value="crypto">
                    Crypto
                  </option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="payment-reference"
                  className="mb-2 block font-medium"
                >
                  Payment Reference
                </label>

                <input
                  id="payment-reference"
                  type="text"
                  value={paymentReference}
                  disabled={submitting}
                  maxLength={500}
                  onChange={(event) =>
                    setPaymentReference(
                      event.target.value
                    )
                  }
                  placeholder="Transaction ID, transfer reference, or test reference"
                  className="w-full rounded-xl border border-white/10 bg-[#0B1020] p-4 outline-none placeholder:text-gray-600 focus:border-indigo-500"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={
                  submitting ||
                  !paymentReference.trim()
                }
                className="w-full rounded-xl bg-indigo-600 py-4 font-semibold transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {submitting
                  ? "Submitting Payment..."
                  : `Submit ${formatMoney(
                      buyerTotal
                    )} Payment`}
              </button>
            </form>

            {submitMessage ? (
              <div
                className={`mt-5 rounded-xl border p-4 text-sm ${
                  submitError
                    ? "border-red-500/30 bg-red-500/10 text-red-300"
                    : "border-green-500/30 bg-green-500/10 text-green-300"
                }`}
              >
                {submitMessage}
              </div>
            ) : null}
          </div>
        ) : null}

        {paymentInProgress && payment ? (
          <div
            className={`mt-6 rounded-3xl border p-7 md:p-8 ${
              isFunded || paymentVerified
                ? "border-green-500/20 bg-green-500/5"
                : "border-yellow-500/20 bg-yellow-500/5"
            }`}
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2
                  className={`text-xl font-bold ${
                    isFunded ||
                    paymentVerified
                      ? "text-green-300"
                      : "text-yellow-300"
                  }`}
                >
                  {isFunded
                    ? "Payment Secured in Escrow"
                    : paymentVerified
                      ? "Payment Verified"
                      : "Payment Submitted"}
                </h2>

                <p className="mt-2 max-w-3xl leading-7 text-gray-400">
                  {isFunded
                    ? "Your payment has been verified and secured in escrow. The seller can now proceed with delivery."
                    : paymentVerified
                      ? "Your payment has been verified. Escrow funding is being confirmed."
                      : "Your payment is awaiting verification. The escrow transaction remains pending until verification is complete."}
                </p>
              </div>

              <span
                className={`w-fit rounded-full border px-4 py-2 text-sm font-semibold uppercase ${
                  isFunded ||
                  paymentVerified
                    ? "border-green-500/30 bg-green-500/10 text-green-300"
                    : "border-yellow-500/30 bg-yellow-500/10 text-yellow-300"
                }`}
              >
                {isFunded
                  ? "FUNDED"
                  : payment.status.toUpperCase()}
              </span>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div>
                <p className="text-sm text-gray-500">
                  Payment Record ID
                </p>

                <p className="mt-1 break-all font-mono text-sm text-gray-300">
                  {payment.id}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Amount Submitted
                </p>

                <p className="mt-1 font-semibold text-gray-200">
                  {formatMoney(
                    payment.amount
                  )}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Payment Method
                </p>

                <p className="mt-1 text-gray-300">
                  {payment.provider}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Submitted
                </p>

                <p className="mt-1 text-gray-300">
                  {formatDate(
                    payment.submitted_at
                  )}
                </p>
              </div>

              {paymentVerified ||
              isFunded ? (
                <div>
                  <p className="text-sm text-gray-500">
                    Verified
                  </p>

                  <p className="mt-1 text-gray-300">
                    {formatDate(
                      payment.verified_at
                    )}
                  </p>
                </div>
              ) : null}

              <div
                className={
                  paymentVerified ||
                  isFunded
                    ? ""
                    : "md:col-span-2"
                }
              >
                <p className="text-sm text-gray-500">
                  Payment Reference
                </p>

                <p className="mt-1 break-all text-gray-300">
                  {payment.payment_reference ||
                    "—"}
                </p>
              </div>
            </div>

            {isFunded ? (
              <div className="mt-6 rounded-xl border border-green-500/20 bg-green-500/5 p-5">
                <p className="font-semibold text-green-300">
                  Payment protection active
                </p>

                <p className="mt-2 text-sm leading-6 text-gray-400">
                  Your payment is secured in
                  escrow. Do not send any
                  additional payment directly to
                  the seller.
                </p>
              </div>
            ) : null}
          </div>
        ) : null}
                <div className="mt-6 rounded-3xl border border-white/10 bg-[#111827] p-7">
          <h2 className="text-xl font-bold">
            Transaction Information
          </h2>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div>
              <p className="text-sm text-gray-500">
                Created
              </p>

              <p className="mt-1 text-gray-300">
                {formatDate(
                  transaction.created_at
                )}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Last Updated
              </p>

              <p className="mt-1 text-gray-300">
                {formatDate(
                  transaction.updated_at
                )}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Payment ID
              </p>

              <p className="mt-1 break-all font-mono text-sm text-gray-300">
                {transaction.payment_id ||
                  "Not funded yet"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Listing ID
              </p>

              <p className="mt-1 break-all font-mono text-sm text-gray-300">
                {transaction.listing_id ??
                  "—"}
              </p>
            </div>
          </div>
        </div>

        {isFunded ? (
          <section className="mt-6 rounded-3xl border border-green-500/20 bg-green-500/5 p-7 md:p-8">
            <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
              <div className="max-w-3xl">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-green-400">
                  Escrow Protection
                </p>

                <h2 className="mt-2 text-2xl font-bold text-green-300">
                  Payment Secured in Escrow
                </h2>

                <p className="mt-3 leading-7 text-gray-400">
                  Your payment has been
                  verified and secured by
                  Vanguard Marketplace. The
                  transaction is now funded
                  and protected while the
                  seller completes delivery.
                </p>
              </div>

              <span className="inline-flex w-fit rounded-full border border-green-500/30 bg-green-500/10 px-4 py-2 text-sm font-bold uppercase tracking-wide text-green-300">
                FUNDED
              </span>
            </div>

            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-black/10 p-5">
                <p className="text-sm text-gray-400">
                  Amount Secured
                </p>

                <p className="mt-2 text-2xl font-bold text-white">
                  {formatMoney(
                    buyerTotal
                  )}
                </p>

                <p className="mt-2 text-xs text-gray-500">
                  Includes the buyer fee.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/10 p-5">
                <p className="text-sm text-gray-400">
                  Escrow Status
                </p>

                <p className="mt-2 text-2xl font-bold text-green-300">
                  Secured
                </p>

                <p className="mt-2 text-xs text-gray-500">
                  Payment has been verified.
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-indigo-500/20 bg-indigo-500/5 p-6">
              <p className="text-lg font-bold text-white">
                Waiting for Seller Delivery
              </p>

              <p className="mt-3 leading-7 text-gray-400">
                The seller can now deliver
                the purchased digital asset
                through the protected
                marketplace transaction.
                Keep communication, delivery,
                and transaction activity
                inside Vanguard Marketplace.
              </p>
            </div>

            <div className="mt-5 rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-5">
              <p className="font-semibold text-yellow-200">
                Do not send additional payment
              </p>

              <p className="mt-2 text-sm leading-6 text-gray-400">
                This transaction is already
                funded. Do not pay the seller
                directly or send additional
                funds outside the marketplace.
              </p>
            </div>
          </section>
        ) : transactionStatus ===
          "pending" ? (
          <section className="mt-6 rounded-3xl border border-yellow-500/20 bg-yellow-500/5 p-7">
            <h2 className="text-xl font-bold text-yellow-300">
              {paymentSubmitted
                ? "Awaiting Payment Verification"
                : paymentVerified
                  ? "Payment Verified"
                  : "Pending Transaction"}
            </h2>

            <p className="mt-3 leading-7 text-gray-400">
              {paymentSubmitted
                ? "A payment submission exists for this transaction. Escrow will remain pending until the payment is verified."
                : paymentVerified
                  ? "The payment has been verified. Escrow funding is being confirmed."
                  : "This transaction has been created but escrow has not been funded yet. Prepare escrow and submit payment before the transaction can move to funded status."}
            </p>
          </section>
        ) : (
          <section className="mt-6 rounded-3xl border border-blue-500/20 bg-blue-500/5 p-7">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="text-xl font-bold text-blue-300">
                  Escrow Status
                </h2>

                <p className="mt-3 leading-7 text-gray-400">
                  Current transaction status:{" "}
                  <span className="font-semibold text-white">
                    {transaction.status}
                  </span>
                  .
                </p>
              </div>

              <span
                className={`w-fit rounded-full border px-4 py-2 text-sm font-semibold uppercase ${getStatusClasses(
                  transaction.status
                )}`}
              >
                {transaction.status ??
                  "pending"}
              </span>
            </div>
          </section>
        )}

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/buyer/orders"
            className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold transition hover:bg-indigo-700"
          >
            My Purchases
          </Link>

          <Link
            href="/marketplace"
            className="rounded-xl border border-white/10 px-6 py-3 font-semibold transition hover:bg-white/5"
          >
            Marketplace
          </Link>
        </div>
      </div>
    </main>
  );
}