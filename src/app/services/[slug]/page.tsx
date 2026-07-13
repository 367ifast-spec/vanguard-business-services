import { notFound } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase";
import AddToCartButton from "@/components/AddToCartButton";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ServiceDetailPage({
  params,
}: Props) {
  const { slug } = await params;

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
    .select(`
      id,
      title,
      slug,
      price,
      short_description,
      description,
      image_url
    `)
    .eq("slug", slug)
    .single();

  if (error || !service) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#05071d] text-white">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <h1 className="text-5xl font-bold">
          {service.title}
        </h1>

        <p className="mt-6 text-xl font-semibold text-blue-400">
          ${Number(service.price ?? 0).toFixed(2)}
        </p>

        <p className="mt-8 leading-8 text-gray-300">
          {service.short_description ??
            service.description ??
            "No description available."}
        </p>

        <div className="mt-10">
          <AddToCartButton serviceId={service.id} />
        </div>
      </div>
    </main>
  );
}