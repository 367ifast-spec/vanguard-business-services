import PaymentStatusBadge from "./PaymentStatusBadge";

interface PaymentCardProps {
  payment: {
    payment_id?: string | null;
    payment_status?: string | null;
    invoice_url?: string | null;
    pay_currency?: string | null;
    pay_amount?: string | number | null;
    price_currency?: string | null;
    price_amount?: string | number | null;
    actually_paid?: string | number | null;
    outcome_currency?: string | null;
    outcome_amount?: string | number | null;
  } | null;
}

export default function PaymentCard({
  payment,
}: PaymentCardProps) {
  if (!payment) {
    return (
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold">
          Payment Information
        </h2>

        <p className="text-gray-500">
          No payment record found.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold">
        Payment Information
      </h2>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <p className="text-sm text-gray-500">
            Payment ID
          </p>

          <p className="mt-1 break-all text-sm font-medium">
            {payment.payment_id || "-"}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Status
          </p>

          <div className="mt-1">
            <PaymentStatusBadge
              status={payment.payment_status ?? "pending"}
            />
          </div>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Invoice
          </p>

          {payment.invoice_url ? (
            <a
              href={payment.invoice_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline break-all"
            >
              Open Invoice
            </a>
          ) : (
            <p>-</p>
          )}
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Pay Amount
          </p>

          <p>
            {payment.pay_amount ?? "-"}{" "}
            {payment.pay_currency ?? ""}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Price Amount
          </p>

          <p>
            {payment.price_amount ?? "-"}{" "}
            {payment.price_currency ?? ""}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Actually Paid
          </p>

          <p>
            {payment.actually_paid ?? "-"}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Outcome Amount
          </p>

          <p>
            {payment.outcome_amount ?? "-"}{" "}
            {payment.outcome_currency ?? ""}
          </p>
        </div>
      </div>
    </div>
  );
}