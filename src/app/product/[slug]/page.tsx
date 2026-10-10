import { formatPrice, toBengaliNumber, getUnitBn, type Product } from "@/lib/utils";
import Link from "next/link";
import { notFound } from "next/navigation";

async function getProduct(slug: string): Promise<Product | null> {
  // slug দিয়ে সরাসরি API নেই, তাই সব প্রোডাক্ট ফেচ করে slug match করবো
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/products",
    { next: { revalidate: 60 } }
  );
  if (!res.ok) return null;
  const products: Product[] = await res.json();
  return products.find((p) => p.slug === slug) || null;
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  // মার্কেটগুলো ডিভিশন অনুযায়ী গ্রুপ করো
  const marketsByDivision = product.markets.reduce(
    (acc, market) => {
      if (!acc[market.division]) {
        acc[market.division] = [];
      }
      acc[market.division].push(market);
      return acc;
    },
    {} as Record<string, typeof product.markets>
  );

  // Min, Max, Average হিসাব করো
  const allMins = product.markets.map((m) => m.min);
  const allMaxs = product.markets.map((m) => m.max);
  const minPrice = Math.min(...allMins);
  const maxPrice = Math.max(...allMaxs);
  const avgPrice = Math.round(
    product.markets.reduce((sum, m) => sum + (m.min + m.max) / 2, 0) /
      product.markets.length
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-white text-black">
      {/* Breadcrumb */}
      <div className="breadcrumbs text-sm mb-6">
        <ul>
          <li>
            <Link href="/">হোম</Link>
          </li>
          <li>
            <Link href={`/category/${product.category}`}>
              {product.categoryNameBn}
            </Link>
          </li>
          <li className="font-semibold">{product.nameBn}</li>
        </ul>
      </div>

      {/* Top Summary */}
      <div className="bg-white border rounded-xl p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-start gap-6">
          {/* Left: Emoji + Title */}
          <div className="flex items-center gap-4">
            <span className="text-6xl">{product.image}</span>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                {product.nameBn}
              </h1>
              <p className="text-gray-500 mt-1">
                আজকের বাজারের সর্বশেষ দাম ও বিস্তারিত
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="badge badge-outline">{product.categoryIcon} {product.categoryNameBn}</span>
                <span className="badge badge-outline">{getUnitBn(product.unit)}</span>
                <span
                  className={`badge ${
                    product.change.dir === "up"
                      ? "badge-error text-white"
                      : product.change.dir === "down"
                      ? "badge-success text-white"
                      : "badge-ghost"
                  }`}
                >
                  {product.change.dir === "up"
                    ? `▲ ${toBengaliNumber(Math.abs(product.change.pct).toFixed(1))}%`
                    : product.change.dir === "down"
                    ? `▼ ${toBengaliNumber(Math.abs(product.change.pct).toFixed(1))}%`
                    : `— ${toBengaliNumber("0.0")}%`}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Price Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 ">
        <div className="  border border-green-100 rounded-xl p-4">
          <p className="text-sm text-gray-500">সর্বনিম্ন দাম</p>
          <p className="text-xl font-bold text-green-700">
            {formatPrice(minPrice)} <span className="text-sm font-normal">টাকা</span>
          </p>
        </div>
        <div className="border border-red-100 rounded-xl p-4">
          <p className="text-sm text-gray-500">সর্বোচ্চ দাম</p>
          <p className="text-xl font-bold text-red-600">
            {formatPrice(maxPrice)} <span className="text-sm font-normal">টাকা</span>
          </p>
        </div>
        <div className=" border border-blue-100 rounded-xl p-4">
          <p className="text-sm text-gray-500">গড় দাম</p>
          <p className="text-xl font-bold text-blue-600">
            {formatPrice(avgPrice)} <span className="text-sm font-normal">টাকা</span>
          </p>
        </div>
        <div className="border border-yellow-100 rounded-xl p-4">
          <p className="text-sm text-gray-500">আজকের দাম</p>
          <p className="text-xl font-bold text-gray-800">
            {formatPrice(product.today)} <span className="text-sm font-normal">টাকা</span>
          </p>
        </div>
      </div>

      {/* বাজারভিত্তিক আজকের দাম */}
      <div className="mb-8 bg-white ">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          🏪 বাজারভিত্তিক আজকের দাম
        </h2>

        <div className="space-y-6 text-black">
          {Object.entries(marketsByDivision).map(([division, markets]) => (
            <div key={division}>
              <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2">
                📍 {division}
              </h3>
              <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="text-gray-600">বাজার</th>
                      <th className="text-gray-600">সর্বনিম্ন</th>
                      <th className="text-gray-600">সর্বোচ্চ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {markets.map((market) => (
                      <tr key={market.market} className="hover">
                        <td className="font-medium">{market.market}</td>
                        <td className="text-green-600 font-semibold">
                          {formatPrice(market.min)} টাকা
                        </td>
                        <td className="text-red-500 font-semibold">
                          {formatPrice(market.max)} টাকা
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Historical Price Comparison */}
      <div className="bg-white border rounded-xl p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">📊 দামের তুলনা</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3  rounded-lg">
            <p className="text-sm text-gray-500">আজ</p>
            <p className="text-lg font-bold">{formatPrice(product.today)} টাকা</p>
          </div>
          <div className="text-center p-3  rounded-lg">
            <p className="text-sm text-gray-500">গতকাল</p>
            <p className="text-lg font-bold">{formatPrice(product.yesterday)} টাকা</p>
          </div>
          <div className="text-center p-3  rounded-lg">
            <p className="text-sm text-gray-500">গত সপ্তাহ</p>
            <p className="text-lg font-bold">{formatPrice(product.lastWeek)} টাকা</p>
          </div>
          <div className="text-center p-3  rounded-lg">
            <p className="text-sm text-gray-500">গত মাস</p>
            <p className="text-lg font-bold">{formatPrice(product.lastMonth)} টাকা</p>
          </div>
        </div>
      </div>
    </div>
  );
}
