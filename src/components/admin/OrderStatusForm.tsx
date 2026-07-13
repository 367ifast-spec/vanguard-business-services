"use client";

import { useTransition } from "react";
import {
  updateOrderStatus,
  updatePaymentStatus,
} from "@/app/admin/orders/actions";

interface OrderStatusFormProps {
  orderId: string;
  status: string;
  paymentStatus: string;
}

export default function OrderStatusForm({
  orderId,
  status,
  paymentStatus,
}: OrderStatusFormProps) {
  const [isPending, startTransition] = useTransition();

  return (
    <div className="space-y-6 rounded-xl border bg-white p-6">
      <div>
        <h2 className="text-xl font-semibold">
          Update Order
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Update order and payment status.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium">
            Order Status
          </label>

          <select
            defaultValue={status}
            disabled={isPending}
            className="w-full rounded-lg border px-4 py-2"
            onChange={(e) => {
              const value = e.target.value;

              startTransition(async () => {
                try {
                  await updateOrderStatus(orderId, value as any);
                  alert("Order status updated.");
                } catch (err) {
                  alert(
                    err instanceof Error
                      ? err.message
                      : "Failed to update order."
                  );
                }
              });
            }}
          >
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Payment Status
          </label>

          <select
            defaultValue={paymentStatus}
            disabled={isPending}
            className="w-full rounded-lg border px-4 py-2"
            onChange={(e) => {
              const value = e.target.value;

              startTransition(async () => {
                try {
                  await updatePaymentStatus(orderId, value);
                  alert("Payment status updated.");
                } catch (err) {
                  alert(
                    err instanceof Error
                      ? err.message
                      : "Failed to update payment."
                  );
                }
              });
            }}
          >
            <option value="waiting">Waiting</option>
            <option value="confirming">Confirming</option>
            <option value="confirmed">Confirmed</option>
            <option value="sending">Sending</option>
            <option value="finished">Finished</option>
            <option value="partially_paid">
              Partially Paid
            </option>
            <option value="failed">Failed</option>
            <option value="expired">Expired</option>
            <option value="refunded">Refunded</option>
          </select>
        </div>
      </div>

      {isPending && (
        <p className="text-sm text-blue-600">
          Updating...
        </p>
      )}
    </div>
  );
}