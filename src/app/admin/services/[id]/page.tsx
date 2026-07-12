import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabase";

export const metadata = {
  title: "Edit Service | Admin Dashboard",
};

export default async function EditServicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (!supabaseAdmin) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-red-600 font-semibold">
          Supabase is not configured.
        </p>
      </main>
    );
  }

  const { data: service, error } = await supabaseAdmin
    .from("services")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !service) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-red-600 font-semibold">
          Service not found.
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-4xl rounded-xl bg-white p-8 shadow">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              Edit Service
            </h1>

            <p className="mt-2 text-gray-600">
              Service ID: {id}
            </p>
          </div>

          <Link
            href="/admin/services"
            className="rounded-lg border px-4 py-2 hover:bg-gray-100"
          >
            ← Back
          </Link>
        </div>

        <div className="rounded-lg border p-6 space-y-3">
          <p>
            <strong>Title:</strong> {service.title}
          </p>

          <p>
            <strong>Slug:</strong> {service.slug}
          </p>

          <p>
            <strong>Price:</strong> ${service.price ?? 0}
          </p>

          <p>
            <strong>Status:</strong>{" "}
            {service.is_active ? "Active" : "Inactive"}
          </p>

          <p>
            <strong>Featured:</strong>{" "}
            {service.is_featured ? "Yes" : "No"}
          </p>
        </div>
      </div>
    </main>
  );
}