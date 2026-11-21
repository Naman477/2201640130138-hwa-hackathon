import Link from 'next/link';
import { Play, PawPrint, Flame, ShieldCheck } from 'lucide-react';
import { cn } from './ui';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-brand-50 border-b border-brand-200">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-amber-200/40 rounded-full blur-[100px] opacity-50"></div>
        <div className="absolute bottom-0 right-1/2 translate-x-1/2 w-[600px] h-[400px] bg-sage-200/40 rounded-full blur-[100px] opacity-50"></div>
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-32 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-300 bg-brand-100 text-brand-700 text-xs font-semibold mb-6 uppercase tracking-wider">
          <div className="w-2 h-2 rounded-full bg-brand-600 animate-pulse" />
          Scheduled micro‑sessions — no screens, no subscriptions
        </div>
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-brand-900 tracking-tight mb-6 lg:max-w-2xl mx-auto">
          ScentLoop™<br />
          <span className="text-brand-600">Foraging that lasts the whole workday.</span>
        </h1>
        <p className="text-lg md:text-xl text-brand-700 mb-10 max-w-2xl mx-auto leading-relaxed">
          Standard puzzle toys are solved in three minutes. ScentLoop releases treats at randomized
          intervals across an 8‑hour day, rotating through four chew‑proof puzzle modules and cycling
          natural scents — so your dog hunts, thinks, and sleeps while you're away.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/configurator"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-900 text-white text-base font-semibold rounded-xl shadow-lg hover:bg-brand-800 transition-colors"
          >
            <Play className="w-5 h-5" />
            Build your ScentLoop
          </Link>
          <Link
            href="/#how-it-works"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-brand-300 bg-white text-brand-700 text-base font-semibold rounded-xl shadow-sm hover:bg-brand-50 transition-colors"
          >
            How it works
          </Link>
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-left border-t border-brand-200 pt-8">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-brand-600" />
              <span className="text-xs font-semibold text-brand-900 uppercase tracking-wider">3+ min</span>
            </div>
            <p className="text-sm text-brand-600">time a standard puzzle lasts</p>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <PawPrint className="w-5 h-5 text-brand-600" />
              <span className="text-xs font-semibold text-brand-900 uppercase tracking-wider">8 hrs</span>
            </div>
            <p className="text-sm text-brand-600">of scheduled micro‑sessions</p>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-brand-600" />
              <span className="text-xs font-semibold text-brand-900 uppercase tracking-wider">chew‑proof</span>
            </div>
            <p className="text-sm text-brand-600">natural rubber + nylon build</p>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-brand-900 uppercase tracking-wider">$0/mo</span>
            </div>
            <p className="text-sm text-brand-600">no camera or app subscription</p>
          </div>
        </div>
      </div>
    </section>
  );
}
