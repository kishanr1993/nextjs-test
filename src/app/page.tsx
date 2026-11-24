"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Featured Products
        </h1>
        <p className="mt-2 text-slate-600">
          Explore our collection of handpicked items.
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm animate-pulse"
            >
              <div className="h-52 bg-slate-200" />
              <div className="p-5 space-y-3">
                <div className="h-4 bg-slate-200 rounded w-1/3" />
                <div className="h-5 bg-slate-200 rounded w-3/4" />
                <div className="h-4 bg-slate-200 rounded w-full" />
                <div className="h-6 bg-slate-200 rounded w-1/4" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="group bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col"
            >
              <div className="relative h-52 w-full bg-slate-100 overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 mb-2">
                    {product.category}
                  </span>
                  <h2 className="text-lg font-semibold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                    {product.name}
                  </h2>
                  <p className="mt-1 text-sm text-slate-500 line-clamp-2">
                    {product.description}
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-lg font-bold text-slate-900">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="text-sm font-medium text-blue-600 group-hover:underline">
                    View details &rarr;
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
