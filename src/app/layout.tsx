import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "SimpleStore",
  description: "Product catalog learning project",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased">
        <header className="border-b border-slate-200 bg-white sticky top-0 z-10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
            <Link
              href="/"
              className="text-xl font-bold tracking-tight text-slate-900 hover:text-blue-600 transition-colors"
            >
              SimpleStore
            </Link>
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <Link
                href="/"
                className="text-slate-600 hover:text-slate-900 transition-colors"
              >
                Products
              </Link>
            </nav>
          </div>
        </header>

        <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8">
          {children}
        </main>

        <footer className="border-t border-slate-200 bg-white py-6">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center text-sm text-slate-500">
            SimpleStore Product Catalog
          </div>
        </footer>
      </body>
    </html>
  );
}
