"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { toast } from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function Navbar() {
  const pathname = usePathname();

  const { data: session, isPending } =
    authClient.useSession();

  async function handleSignOut() {
    try {
      const result = await authClient.signOut();

      if (result.error) {
        toast.error("সাইন আউট করা যায়নি");
        return;
      }

      toast.success("সফলভাবে সাইন আউট হয়েছে");
      window.location.href = "/";
    } catch {
      toast.error("সমস্যা হয়েছে, আবার চেষ্টা করুন");
    }
  }

  const user = session?.user;

  return (
    <header className="sticky top-0 z-50 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 border-b px-4 py-3">
        <Link href="/" className="min-w-0">
          <span className="text-xl font-bold text-emerald-700">
            🛒 বাজার দর
          </span>

          <span className="block text-xs text-gray-500">
            বাংলাদেশের প্রতিদিনের বাজারদর
          </span>
        </Link>

        <div className="flex items-center gap-2">
          {isPending ? (
            <span className="text-sm text-gray-500">
              লোড হচ্ছে...
            </span>
          ) : user ? (
            <>
              <Link
                href="/profile"
                className="rounded-lg px-3 py-2 text-sm font-semibold hover:bg-emerald-50"
              >
                {user.name || "আমার প্রোফাইল"}
              </Link>

              <button
                type="button"
                onClick={handleSignOut}
                className="rounded-lg border px-3 py-2 text-sm font-semibold hover:bg-red-50"
              >
                সাইন আউট
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-lg border border-emerald-600 px-3 py-2 text-sm font-semibold text-emerald-700"
              >
                সাইন ইন
              </Link>

              <Link
                href="/register"
                className="rounded-lg bg-emerald-600 px-3 py-2 text-sm font-semibold text-white"
              >
                সাইন আপ
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Keep your category navigation and ticker here */}
    </header>
  );
}