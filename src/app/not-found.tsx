
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 text-center">
      <h1 className="text-7xl font-bold text-green-600">
        404
      </h1>

      <h2 className="mt-4 text-2xl font-semibold text-gray-800">
        পেজটি খুঁজে পাওয়া যায়নি!
      </h2>

      <p className="mt-3 text-gray-600">
        দুঃখিত, আপনি যে পেজটি খুঁজছেন সেটি পাওয়া যাচ্ছে না।
      </p>

      <Link
        href="/"
        className="mt-6 rounded-lg bg-green-600 px-6 py-3 font-medium text-white hover:bg-green-700"
      >
        হোম পেজে ফিরে যান
      </Link>
    </main>
  );
}