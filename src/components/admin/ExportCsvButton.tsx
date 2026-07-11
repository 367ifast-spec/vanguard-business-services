"use client";

type Quote = {
  quote_id: string;
  full_name: string;
  email: string;
  service: string;
  status: string;
  created_at: string | null;
};

type Props = {
  quotes: Quote[];
};

export default function ExportCsvButton({ quotes }: Props) {
  const exportCSV = () => {
    if (!quotes.length) {
      alert("No quotes available to export.");
      return;
    }

    const headers = [
      "Quote ID",
      "Full Name",
      "Email",
      "Service",
      "Status",
      "Created At",
    ];

    const rows = quotes.map((q) => [
      q.quote_id,
      q.full_name,
      q.email,
      q.service,
      q.status,
      q.created_at
        ? new Date(q.created_at).toLocaleString()
        : "",
    ]);

    const csv = [
      headers,
      ...rows,
    ]
      .map((row) =>
        row
          .map((value) => `"${String(value ?? "").replace(/"/g, '""')}"`)
          .join(",")
      )
      .join("\n");

    // UTF-8 BOM for Excel compatibility
    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;

    const today = new Date().toISOString().split("T")[0];
    link.download = `quotes-${today}.csv`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  return (
    <button
      type="button"
      onClick={exportCSV}
      className="rounded-lg bg-emerald-600 px-5 py-2 text-white transition hover:bg-emerald-700"
    >
      📄 Export CSV
    </button>
  );
}