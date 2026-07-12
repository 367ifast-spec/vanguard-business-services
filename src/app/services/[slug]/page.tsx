import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ServiceDetailPage({
  params,
}: Props) {
  const { slug } = await params;

  if (!slug) {
    notFound();
  }

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold">
          {slug}
        </h1>

        <p className="mt-4 text-gray-600">
          Service details page is under development.
        </p>
      </div>
    </main>
  );
}