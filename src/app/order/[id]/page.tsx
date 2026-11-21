import { CheckCircle, Truck, Clock, Mail } from 'lucide-react';
import Link from 'next/link';

interface OrderPageProps {
  searchParams: { total?: string };
}

export default function OrderPage({ searchParams }: OrderPageProps) {
  const total = searchParams.total ? Number(searchParams.total) : 0;

  return (
    <div className="min-h-screen bg-brand-50">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="w-16 h-16 rounded-full bg-brand-100 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-brand-600" />
        </div>
        <h1 className="text-3xl font-serif font-bold text-brand-900 mb-2">Order confirmed</h1>
        <p className="text-brand-600 mb-10">
          Thank you! Your ScentLoop is on its way. No login needed — we'll email updates.
        </p>

        <div className="bg-white p-8 rounded-2xl border border-brand-200 shadow-sm mb-10">
          <div className="flex items-center justify-between mb-6 px-4">
            <span className="text-sm font-semibold text-brand-700">Order total</span>
            <span className="text-xl font-bold text-brand-900">${total.toFixed(2)}</span>
          </div>
          <div className="grid grid-cols-2 gap-4 text-left px-4">
            <div className="flex flex-col gap-1">
              <span className="text-xs text-brand-500 uppercase tracking-wider">Status</span>
              <span className="text-sm font-medium text-brand-700">Confirmed</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs text-brand-500 uppercase tracking-wider">Shipping</span>
              <span className="text-sm font-medium text-brand-700">Free</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs text-brand-500 uppercase tracking-wider">Est. delivery</span>
              <span className="text-sm font-medium text-brand-700">3–5 business days</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs text-brand-500 uppercase tracking-wider">Tracking</span>
              <span className="text-sm font-medium text-brand-700">Emailed on ship</span>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-brand-100 flex items-center gap-2 text-sm text-brand-600">
            <Mail className="w-4 h-4" />
            <span>Add a delivery note anytime from your confirmation email.</span>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-brand-900 text-white font-semibold hover:bg-brand-800 transition-colors"
          >
            Continue shopping
          </Link>
          <button className="inline-flex items-center gap-2 px-8 py-3 rounded-xl border border-brand-200 bg-white text-brand-700 font-semibold hover:bg-brand-50 transition-colors">
            <Truck className="w-4 h-4" />
            Track order
          </button>
        </div>

        <div className="mt-16 text-xs text-brand-400">
          This is a demo storefront. No real charges were processed.
        </div>
      </div>
    </div>
  );
}
