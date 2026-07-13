interface OrderSummaryCardProps {
  totalAmount: number;
  paymentStatus: string;
  orderStatus: string;
  paymentMethod?: string | null;
  paymentId?: string | null;
}

import OrderStatusBadge from "./OrderStatusBadge";
import PaymentStatusBadge from "./PaymentStatusBadge";

export default function OrderSummaryCard({
  totalAmount,
  paymentStatus,
  orderStatus,
  paymentMethod,
  paymentId,
}: OrderSummaryCardProps) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-xl font-semibold">
        Order Summary
      </h2>

      <div className="space-y-4">
        <div className="flex items-center justify-between border-b pb-3">
          <span className="text-gray-500">
            Total Amount
          </span>

          <span className="text-2xl font-bold text-green-600">
            ${totalAmount.toFixed(2)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-500">
            Payment Status
          </span>

          <PaymentStatusBadge
            status={paymentStatus}
          />
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-500">
            Order Status
          </span>

          <OrderStatusBadge
            status={orderStatus}
          />
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-500">
            Payment Method
          </span>

          <span className="font-medium">
            {paymentMethod || "-"}
          </span>
        </div>

        <div className="flex items-start justify-between">
          <span className="text-gray-500">
            NOWPayments ID
          </span>

          <span className="max-w-xs break-all text-right text-sm">
            {paymentId || "-"}
          </span>
        </div>
      </div>
    </div>
  );
}