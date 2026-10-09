import ProductCard from "./ProductCard";
import { type Product } from "@/lib/utils";

export default function PriceFallers({ products }: { products: Product[] }) {
  // দাম কমেছে এমন প্রোডাক্ট বের করো
  const fallers = products
    .filter((p) => p.change.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct) // সবচেয়ে বেশি কমেছে আগে
    .slice(0, 6);

  if (fallers.length === 0) return null;

  return (
    <section className="py-8 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <span className="text-green-500">▼</span> আজ দাম কমেছে
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {fallers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
