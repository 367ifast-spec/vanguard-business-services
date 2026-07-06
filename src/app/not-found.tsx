import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#040714] px-6 text-white">
      <div className="max-w-2xl text-center">
        <h1 className="text-8xl font-extrabold text-blue-500">
          404
        </h1>

        <h2 className="mt-6 text-4xl font-bold">
          Page Not Found
        </h2>

        <p className="mt-6 text-lg leading-8 text-gray-400">
          Sorry, the page you are looking for doesn't exist or may have
          been moved.
        </p>

        <Link
          href="/"
          className="mt-10 inline-block rounded-xl bg-blue-600 px-8 py-4 font-semibold transition hover:bg-blue-700"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}