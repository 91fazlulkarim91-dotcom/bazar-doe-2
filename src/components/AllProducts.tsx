import ProductCard from "./ProductCard";
import { type Product } from "@/lib/utils";

export default function AllProducts({ products }: { products: Product[] }) {
  return (
    <section id="সব-পণ্য" className="py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">সব পণ্য</h2>
          <p className="text-gray-500 text-sm mt-1">
            মোট {products.length}টি পণ্যের আজকের বাজার দর
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
