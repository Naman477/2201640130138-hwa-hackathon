import { CheckCircle, Truck, Clock, Mail, PawPrint } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/components/ui';

interface OrderPageProps {
  searchParams: { total?: string };
}

export default function OrderPage({ searchParams }: OrderPageProps) {
  const total = searchParams.total ? Number(searchParams.total) : 0;

  return (
    <div className="min-h-screen bg-brand-50">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-24 text-center">
        <div className="w-20 h-20 rounded-full bg-brand-100 flex items-center justify-center mx-auto mb-8 shadow-glow">
          <CheckCircle className="w-10 h-10 text-brand-600 animate-scale-in" />
        </div>
        <h1 className="text-[3rem] md:text-[4rem] font-serif font-bold text-brand-900 mb-4 tracking-tight">
          Order confirmed
        </h1>
        <p className="text-brand-600 mb-12 text-lg">
          Thank you! Your ScentLoop is on its way. No login needed — we'll email updates.
        </p>

        <div className="bg-white p-10 rounded-3xl border border-brand-100 shadow-sm mb-12">
          <div className="flex items-center justify-between mb-8 px-4">
            <span className="text-sm font-semibold text-brand-700 uppercase tracking-wider">Order total</span>
            <span className="text-[2rem] font-serif font-bold text-brand-900">${total.toFixed(2)}</span>
          </div>
          <div className="grid grid-cols-2 gap-6 text-left px-4">
            <StatRow label="Status" value="Confirmed" color="text-brand-900" />
            <StatRow label="Shipping" value="Free" color="text-sage-600" />
            <StatRow label="Est. delivery" value="3–5 business days" color="text-brand-700" />
            <StatRow label="Tracking" value="Emailed on ship" color="text-brand-700" />
          </div>
          <div className="mt-10 pt-8 border-t border-brand-100 flex items-center gap-3 text-sm text-brand-600 justify-center">
            <Mail className="w-4 h-4" />
            <span>Add a delivery note anytime from your confirmation email.</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-2xl bg-brand-900 text-white font-serif font-semibold hover:bg-brand-800 transition-all shadow-glow"
          >
            <PawPrint className="w-4 h-4" />
            Continue shopping
          </Link>
          <button className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-2xl border border-brand-200 bg-white text-brand-700 font-serif font-semibold hover:bg-brand-50 hover:border-brand-300 transition-all shadow-sm">
            <Truck className="w-4 h-4" />
            Track order
          </button>
        </div>

        <div className="mt-20 text-[11px] text-brand-400 uppercase tracking-widest">
          This is a demo storefront. No real charges were processed.
        </div>
      </div>
    </div>
  );
}

function StatRow({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs font-bold uppercase tracking-wider text-brand-500">{label}</span>
      <span className={cn('text-sm font-medium', color)}>{value}</span>
    </div>
  );
}
