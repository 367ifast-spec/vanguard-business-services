import QuoteStatusForm from "@/components/admin/QuoteStatusForm";
import { notFound } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return {
    title: `Quote ${id} | Admin Dashboard`,
  };
}

export default async function QuoteDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  if (!supabaseAdmin) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-red-600 font-semibold">
          Supabase is not configured.
        </p>
      </main>
    );
  }

  const { id } = await params;

  const { data: quote } = await supabaseAdmin
    .from("quotes")
    .select("*")
    .eq("quote_id", id)
    .single();

  if (!quote) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-5xl">

        <h1 className="mb-8 text-4xl font-bold">
          Quote Details
        </h1>

        <div className="rounded-xl bg-white p-8 shadow">

          <div className="grid gap-6 md:grid-cols-2">

            <Info
              label="Quote ID"
              value={quote.quote_id}
            />

            <Info
              label="Status"
              value={quote.status}
            />

            <Info
              label="Full Name"
              value={quote.full_name}
            />

            <Info
              label="Email"
              value={quote.email}
            />

            <Info
              label="WhatsApp"
              value={quote.whatsapp}
            />

            <Info
              label="Country"
              value={quote.country}
            />

            <Info
              label="Business Name"
              value={quote.business_name}
            />

            <Info
              label="Website"
              value={quote.website}
            />

            <Info
              label="Service"
              value={quote.service}
            />

            <Info
              label="Budget"
              value={quote.budget}
            />

            <Info
              label="Preferred Contact"
              value={quote.preferred_contact}
            />

            <Info
              label="Created"
              value={
                quote.created_at
                  ? new Date(
                      quote.created_at
                    ).toLocaleString()
                  : "-"
              }
            />

          </div>

          <div className="mt-8">

            <h2 className="mb-2 text-lg font-semibold">
              Project Details
            </h2>

            <div className="rounded-lg border bg-gray-50 p-5 whitespace-pre-wrap">
              {quote.message || "No message"}
            </div>

          </div>

        </div>
 {/* White Card শেষ */}

<QuoteStatusForm
  quoteId={quote.quote_id}
  currentStatus={quote.status}
/>

</div>   {/* max-w-5xl */}

</main>
    );
}

function Info({
  label,
  value,
}: {
  label: string;
  value: unknown;
}) {
  return (
    <div>
      <p className="text-sm text-gray-500">
        {label}
      </p>

      <p className="mt-1 font-semibold break-words">
        {String(value ?? "-")}
      </p>
    </div>
  );
}