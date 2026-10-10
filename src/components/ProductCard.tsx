import Link from "next/link";
import { formatPrice, toBengaliNumber, getUnitBn, type Product } from "@/lib/utils";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="card  border-gray-100 hover:shadow-lg hover:border-green-200 transition-all duration-300 cursor-pointer group"
    >
      <div className="card-body p-4">
        {/* Top: Image + Name */}
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl group-hover:scale-110 transition-transform">
            {product.image}
          </span>
          <div>
            <h3 className="font-semibold text-gray-800 group-hover:text-green-700 transition-colors">
              {product.nameBn}
            </h3>
            <p className="text-xs text-gray-400">{getUnitBn(product.unit)}</p>
          </div>
        </div>

        {/* Bottom: Price + Change */}
        <div className="flex items-end justify-between mt-auto">
          <div>
            <p className="text-xs text-gray-400">আজকের দাম</p>
            <p className="text-lg font-bold text-gray-800">
              {formatPrice(product.today)} <span className="text-sm font-normal">টাকা</span>
            </p>
          </div>
          <span
            className={`badge badge-sm ${product.change.dir === "up"
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
    </Link>
  );
}
