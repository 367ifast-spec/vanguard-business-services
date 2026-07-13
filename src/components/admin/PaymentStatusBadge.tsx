interface PaymentStatusBadgeProps {
  status: string | null;
}

export default function PaymentStatusBadge({
  status,
}: PaymentStatusBadgeProps) {
  const value = (status ?? "waiting").toLowerCase();

  const classes: Record<string, string> = {
    waiting: "bg-yellow-100 text-yellow-800 border-yellow-200",
    confirming: "bg-blue-100 text-blue-800 border-blue-200",
    confirmed: "bg-indigo-100 text-indigo-800 border-indigo-200",
    sending: "bg-cyan-100 text-cyan-800 border-cyan-200",
    finished: "bg-green-100 text-green-800 border-green-200",
    partially_paid: "bg-orange-100 text-orange-800 border-orange-200",
    failed: "bg-red-100 text-red-800 border-red-200",
    expired: "bg-gray-100 text-gray-700 border-gray-200",
    refunded: "bg-purple-100 text-purple-800 border-purple-200",
  };

  const label = value
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${
        classes[value] ??
        "bg-gray-100 text-gray-700 border-gray-200"
      }`}
    >
      {label}
    </span>
  );
}