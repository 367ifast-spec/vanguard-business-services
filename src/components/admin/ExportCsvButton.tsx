"use client";

export default function ExportCsvButton() {
  const exportCSV = () => {
    window.location.href = "/api/admin/quotes/export";
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