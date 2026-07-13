interface OrderStatusBadgeProps {
  status: string | null;
}

export default function OrderStatusBadge({
  status,
}: OrderStatusBadgeProps) {
  const value = (status ?? "pending").toLowerCase();

  const classes: Record<string, string> = {
    pending:
      "bg-yellow-100 text-yellow-800 border-yellow-200",
    processing:
      "bg-blue-100 text-blue-800 border-blue-200",
    completed:
      "bg-green-100 text-green-800 border-green-200",
    cancelled:
      "bg-red-100 text-red-800 border-red-200",
  };

  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${
        classes[value] ??
        "bg-gray-100 text-gray-700 border-gray-200"
      }`}
    >
      {value.charAt(0).toUpperCase() + value.slice(1)}
    </span>
  );
}