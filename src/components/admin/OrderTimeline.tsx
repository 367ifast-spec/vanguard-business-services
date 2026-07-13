
interface OrderTimelineProps {
  createdAt?: string | null;
  paymentStatus: string;
  orderStatus: string;
}

export default function OrderTimeline({
  createdAt,
  paymentStatus,
  orderStatus,
}: OrderTimelineProps) {
  const date = createdAt
    ? new Date(createdAt).toLocaleString()
    : "-";

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold">
        Order Timeline
      </h2>

      <div className="space-y-5">
        <div className="flex gap-4">
          <div className="mt-1 h-3 w-3 rounded-full bg-blue-600" />

          <div>
            <p className="font-semibold">
              Order Created
            </p>

            <p className="text-sm text-gray-500">
              {date}
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <div
            className={`mt-1 h-3 w-3 rounded-full ${
              paymentStatus === "finished" ||
              paymentStatus === "confirmed"
                ? "bg-green-600"
                : "bg-yellow-500"
            }`}
          />

          <div>
            <p className="font-semibold">
              Payment Status
            </p>

            <p className="text-sm text-gray-500 capitalize">
              {paymentStatus}
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <div
            className={`mt-1 h-3 w-3 rounded-full ${
              orderStatus === "completed"
                ? "bg-green-600"
                : orderStatus === "processing"
                ? "bg-blue-600"
                : "bg-gray-500"
            }`}
          />

          <div>
            <p className="font-semibold">
              Order Status
            </p>

            <p className="text-sm capitalize text-gray-500">
              {orderStatus}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}