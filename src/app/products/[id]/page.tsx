"use client";

import { Suspense, use, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";

function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Product not found");
        }
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => {
        setNotFound(true);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-12 animate-pulse">
        <div className="h-6 bg-slate-200 rounded w-24 mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-8 rounded-2xl border border-slate-200">
          <div className="h-80 bg-slate-200 rounded-xl" />
          <div className="space-y-4">
            <div className="h-4 bg-slate-200 rounded w-20" />
            <div className="h-8 bg-slate-200 rounded w-3/4" />
            <div className="h-6 bg-slate-200 rounded w-28" />
            <div className="h-24 bg-slate-200 rounded w-full" />
            <div className="h-10 bg-slate-200 rounded w-36" />
          </div>
        </div>
      </div>
    );
  }

  if (notFound || !product) {
    return (
      <div className="max-w-md mx-auto text-center py-16">
        <h2 className="text-2xl font-bold text-slate-900">Product Not Found</h2>
        <p className="mt-2 text-slate-600">
          The product you are looking for does not exist.
        </p>
        <div className="mt-6">
          <Link
            href="/"
            className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Link
        href="/"
        className="inline-flex items-center text-sm font-medium text-slate-600 hover:text-slate-900 mb-6 transition-colors"
      >
        &larr; Back to all products
      </Link>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm grid grid-cols-1 md:grid-cols-2 gap-8 p-6 sm:p-8">
        <div className="relative h-80 sm:h-96 w-full rounded-xl overflow-hidden bg-slate-100">
          <Image
            src={product.image}
            alt={product.name}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600">
              {product.category}
            </span>

            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-3">
              {product.name}
            </h1>

            <div className="text-3xl font-bold text-blue-600 mt-4">
              ${product.price.toFixed(2)}
            </div>

            <div className="mt-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
                Description
              </h3>
              <p className="mt-2 text-slate-600 leading-relaxed text-base">
                {product.description}
              </p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100">
            <button
              type="button"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition shadow-sm hover:shadow"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="max-w-4xl mx-auto py-12 animate-pulse">
          <div className="h-6 bg-slate-200 rounded w-24 mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-8 rounded-2xl border border-slate-200">
            <div className="h-80 bg-slate-200 rounded-xl" />
            <div className="space-y-4">
              <div className="h-4 bg-slate-200 rounded w-20" />
              <div className="h-8 bg-slate-200 rounded w-3/4" />
              <div className="h-6 bg-slate-200 rounded w-28" />
              <div className="h-24 bg-slate-200 rounded w-full" />
              <div className="h-10 bg-slate-200 rounded w-36" />
            </div>
          </div>
        </div>
      }
    >
      <ProductDetail params={params} />
    </Suspense>
  );
}
