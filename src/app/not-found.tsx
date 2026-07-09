import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description:
    "The page you are looking for could not be found on Vanguard Business Services.",
  robots: {
    index: false,
    follow: false,
  },
};

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
          Sorry, the page you are looking for doesn't exist, may have been
          moved, or the URL may be incorrect.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="rounded-xl bg-blue-600 px-8 py-4 font-semibold transition hover:bg-blue-700"
          >
            Back to Home
          </Link>

          <Link
            href="/#contact"
            className="rounded-xl border border-blue-600 px-8 py-4 font-semibold text-blue-400 transition hover:bg-blue-600 hover:text-white"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </main>
  );
}