"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession, signOut } from "@/lib/auth-client";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import PriceTicker from "./PriceTicker";
import { getBanglaDate, type Category } from "@/lib/utils";

export default function Navbar() {
  const { data: session, isPending } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    fetch("https://api.api-store.workers.dev/api/bazardor/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("সাইন আউট সফল হয়েছে!");
          router.push("/");
        },
 },
    });
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Top Row: Logo + Auth */}
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🛒</span>
          <div>
            <h1 className="text-xl font-bold text-green-700 leading-tight">
              বাজার দর
            </h1>
            <p className="text-xs text-gray-500">{getBanglaDate()}</p>
          </div>
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden btn btn-ghost btn-sm"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>

        {/* Auth Buttons (Desktop) */}
  <div className="hidden lg:flex items-center gap-2">
          {isPending ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : session ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-sm gap-2"
              >
                <div className="avatar placeholder">
                  <div className="bg-green-100 text-green-700 rounded-full w-8">
                    <span className="text-sm">
                      {session.user.name?.charAt(0) || "U"}
                    </span>
                  </div>
                </div>
                <span>{session.user.name}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-white rounded-box shadow-lg z-[1] w-52 p-2"
              >
                <li>
                  <Link href="/profile">
                    <span>👤</span> আমার প্রোফাইল
                  </Link>
    </li>
                <li>
                  <button onClick={handleSignOut}>
                    <span>🚪</span> সাইন আউট
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <>
              <Link href="/signin" className="btn btn-sm btn-outline btn-success">
                সাইন ইন
              </Link>
              <Link href="/signup" className="btn btn-sm btn-success text-white">
                সাইন আপ
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Category Links Row */}
      <div className="border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <nav className={`${mobileMenuOpen ? "block" : "hidden"} lg:block`}>
            <ul className="flex flex-wrap items-center gap-1 py-2">
              {categories.map((cat) => {
                const isActive = pathname === `/category/${cat.slug}`;
                return (
                  <li key={cat.slug}>
                    <Link
                      href={`/category/${cat.slug}`}
 className={`btn btn-sm ${
                        isActive
                          ? "btn-success text-white"
                          : "btn-ghost text-gray-600 hover:bg-green-50"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span>{cat.icon}</span>
                      {cat.nameBn}
                    </Link>
                  </li>
                );
              })}

              {/* Mobile Auth buttons */}
              {mobileMenuOpen && (
                <li className="w-full mt-2 flex gap-2 lg:hidden">
                  {session ? (
                    <>
                      <Link href="/profile" className="btn btn-sm btn-outline btn-success flex-1">
                        প্রোফাইল
                      </Link>
                      <button onClick={handleSignOut} className="btn btn-sm btn-error text-white flex-1">
                        সাইন আউট
                      </button>
                    </>
                  ) : (
                    <>
                      <Link href="/signin" className="btn btn-sm btn-outline btn-success flex-1">
                        সাইন ইন
                      </Link>
                   <Link href="/signup" className="btn btn-sm btn-success text-white flex-1">
                        সাইন আপ
                      </Link>
                    </>
                  )}
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>

      {/* Price Ticker */}
      <PriceTicker />
    </header>
  );
}
