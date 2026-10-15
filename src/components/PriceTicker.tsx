"use client";

import { useEffect, useState } from "react";
import { formatPrice, toBengaliNumber, type Product } from "@/lib/utils";

export default function PriceTicker() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("https://api.api-store.workers.dev/api/bazardor/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Ticker error:", err));
  }, []);

  if (products.length === 0) return null;

  const unitMap: Record<string, string> = {
    kg: "কেজি",
    litre: "লিটার",
    dozen: "ডজন",
    piece: "পিস",
  };

  // দুইবার repeat করি smooth infinite scroll এর জন্য
  const tickerItems = [...products, ...products];

  return (
    <div className="bg-gray-50 border-t border-gray-100 overflow-hidden">
      <div className="animate-marquee whitespace-nowrap py-1.5 flex">
        {tickerItems.map((product, index) => (
          <span
            key={`${index}`}
            className="inline-flex items-center gap-1.5 mx-4 text-sm"
          >
            <span>{product.image}</span>
            <span className="font-medium text-gray-700">{product.nameBn}</span>
            <span className="text-gray-500">
              {formatPrice(product.today)} টাকা/{unitMap[product.unit] || product.unit}
            </span>
            <span
              className={`font-semibold ${product.change.dir === "up"
                  ? "text-red-500"
                  : product.change.dir === "down"
                    ? "text-green-500"
                    : "text-gray-400"
                }`}
            >
              {product.change.dir === "up"
                ? `▲ ${toBengaliNumber(Math.abs(product.change.pct).toFixed(1))}%`
                : product.change.dir === "down"
                  ? `▼ ${toBengaliNumber(Math.abs(product.change.pct).toFixed(1))}%`
                  : `— ${toBengaliNumber("0.0")}%`}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
