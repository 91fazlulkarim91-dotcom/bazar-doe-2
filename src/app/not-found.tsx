import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <div className="text-8xl mb-4">🔍</div>
      <h1 className="text-4xl font-bold text-gray-800 mb-2">
        পেজটি পাওয়া যায়নি
      </h1>
      <p className="text-gray-500 mb-6 max-w-md">
        আপনি যে পেজটি খুঁজছেন সেটি পাওয়া যায়নি। এটি সরিয়ে ফেলা হয়ে থাকতে
        পারে বা ঠিকানাটি ভুল হতে পারে।
      </p>
      <Link href="/" className="btn btn-success text-white">
        🏠 হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}
