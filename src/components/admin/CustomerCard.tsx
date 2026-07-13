interface CustomerCardProps {
  customerName: string;
  customerEmail: string;
  orderId: string;
}

export default function CustomerCard({
  customerName,
  customerEmail,
  orderId,
}: CustomerCardProps) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-xl font-semibold">
        Customer Information
      </h2>

      <div className="space-y-5">
        <div>
          <p className="text-sm text-gray-500">
            Customer Name
          </p>

          <p className="mt-1 text-lg font-semibold">
            {customerName}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Email Address
          </p>

          <p className="mt-1 break-all">
            {customerEmail}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Order ID
          </p>

          <p className="mt-1 break-all rounded bg-gray-100 p-2 font-mono text-sm">
            {orderId}
          </p>
        </div>
      </div>
    </div>
  );
}