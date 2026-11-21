'use client';

import React, { useState } from 'react';
import { Shield, Sparkles, Volume2, Wind, RefreshCw, CheckCircle2, ChevronRight, Award } from 'lucide-react';
import { playChimeCue } from '@/lib/audio';
import { useCart } from '@/lib/cartStore';

export function Hero() {
  const { openCart } = useCart();
  const [chimePlaying, setChimePlaying] = useState(false);
  const [activeTab, setActiveTab] = useState<'micro-dose' | 'puzzle' | 'scents'>('micro-dose');

  const handleTestChime = () => {
    setChimePlaying(true);
    playChimeCue();
    setTimeout(() => setChimePlaying(false), 2000);
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative overflow-hidden pt-8 pb-20 md:py-24 bg-gradient-to-b from-brand-50 via-brand-100/50 to-brand-50">
      {/* Decorative ambient background glows */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[850px] h-[400px] bg-gradient-to-br from-amber-200/30 via-sage-200/20 to-transparent blur-3xl pointer-events-none -z-10 rounded-full" />
      <div className="absolute -top-24 right-10 w-96 h-96 bg-brand-200/40 rounded-full blur-2xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Product Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            {/* High-Impact Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sage-100 border border-sage-300 text-sage-900 text-xs sm:text-sm font-semibold shadow-sm">
              <Award className="w-4 h-4 text-sage-700" />
              <span>Veterinary Behavioralist Recommended Foraging Tech</span>
              <span className="w-1.5 h-1.5 rounded-full bg-sage-500 animate-pulse" />
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-brand-950 tracking-tight leading-[1.12] font-serif">
              The 8-Hour Foraging System That Keeps Your Dog{' '}
              <span className="relative whitespace-nowrap">
                <span className="relative z-10 text-amber-700 underline decoration-amber-400/60 decoration-wavy decoration-2">
                  Truly Fulfilled
                </span>
              </span>{' '}
              While You're Away.
            </h1>

            {/* Core Problem & Mechanism Statement */}
            <p className="text-lg sm:text-xl text-brand-800 leading-relaxed font-normal">
              Standard puzzle toys are solved in <span className="font-semibold text-brand-950">3 minutes</span>.
              Treat cameras dump food and trigger frantic barking. Ball launchers ruin joints.
              <br className="hidden sm:inline" />
              <strong className="text-brand-950 font-bold"> ScentLoop™</strong> is an autonomous system that drops
              randomized 1–2 kibble micro-doses into <span className="underline decoration-sage-500">physically shifting chew-proof puzzles</span> paired
              with natural olfactory scent trails across an 8-hour workday—tiring your dog mentally so they rest peacefully.
            </p>

            {/* Key Engineering Pillars Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-start gap-2.5 text-sm text-brand-900 font-medium">
                <CheckCircle2 className="w-5 h-5 text-sage-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Scheduled Micro-Sessions:</strong> 1–2 kibbles every 45–90 min with acoustic hunt cue.
                </span>
              </div>
              <div className="flex items-start gap-2.5 text-sm text-brand-900 font-medium">
                <CheckCircle2 className="w-5 h-5 text-sage-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Shifting Mechanical Puzzle:</strong> 4 modules rotate lock-states every cycle.
                </span>
              </div>
              <div className="flex items-start gap-2.5 text-sm text-brand-900 font-medium">
                <CheckCircle2 className="w-5 h-5 text-sage-600 shrink-0 mt-0.5" />
                <span>
                  <strong>AromaJet™ Olfactory Circulation:</strong> Real botanicals trigger deep cognitive foraging.
                </span>
              </div>
              <div className="flex items-start gap-2.5 text-sm text-brand-900 font-medium">
                <CheckCircle2 className="w-5 h-5 text-sage-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Chew-Proof Weighted Base:</strong> Low CG (8.5 lbs) + suction rings. Zero subscriptions.
                </span>
              </div>
            </div>

            {/* CTA Group */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={() => scrollTo('configurator')}
                className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-brand-900 via-brand-800 to-forest-950 text-white px-8 py-4 rounded-2xl font-extrabold text-base sm:text-lg shadow-xl shadow-brand-900/20 hover:shadow-2xl hover:from-black hover:to-forest-900 transition-all transform active:scale-[0.98] group"
              >
                <span>Customize Your ScentLoop™</span>
                <span className="text-amber-400 font-normal">|</span>
                <span className="text-amber-300 font-bold">$189</span>
                <ChevronRight className="w-5 h-5 text-amber-400 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => scrollTo('timeline')}
                className="inline-flex items-center justify-center gap-2 bg-brand-100 hover:bg-brand-200/90 text-brand-950 border border-brand-300 px-6 py-4 rounded-2xl font-bold text-base transition-all shadow-sm active:scale-95"
              >
                <span>See the 8-Hour Cycle</span>
              </button>
            </div>

            {/* Social Proof & Guarantees Bar */}
            <div className="pt-4 border-t border-brand-300/60 flex flex-wrap items-center gap-6 text-xs text-brand-700">
              <div className="flex items-center gap-1.5">
                <div className="flex text-amber-500 text-sm">★★★★★</div>
                <span className="font-bold text-brand-950">4.92 / 5</span>
                <span>(1,480+ Solved Sessions)</span>
              </div>
              <div className="flex items-center gap-1">
                <Shield className="w-4 h-4 text-sage-600" />
                <span>60-Day "Happy Dog" Risk-Free Trial</span>
              </div>
              <div className="flex items-center gap-1">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Dishwasher Safe Food-Grade Parts</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Hardware & Simulation Preview Card */}
          <div className="lg:col-span-5">
            <div className="relative bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-brand-200/90 ring-1 ring-brand-900/5 backdrop-blur-sm">
              {/* Product Badge Header */}
              <div className="flex items-center justify-between pb-4 border-b border-brand-100">
                <div className="flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    Active Foraging Simulator
                  </span>
                </div>
                <span className="text-xs font-mono text-brand-600">Model: SL-MK4 Pro</span>
              </div>

              {/* Hardware Mockup Display */}
              <div className="my-5 relative bg-gradient-to-br from-brand-100/70 via-brand-50 to-sage-50 rounded-2xl p-6 border border-brand-200/60 overflow-hidden text-center">
                {/* Visual Representation of ScentLoop Base */}
                <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
                  {/* Outer weighted ring */}
                  <div className="absolute inset-0 rounded-full border-8 border-brand-900/20 bg-gradient-to-tr from-brand-900 via-brand-800 to-forest-900 shadow-inner flex items-center justify-center">
                    {/* Rotating Puzzle Ring */}
                    <div className="w-36 h-36 rounded-full border-4 border-dashed border-amber-400/80 bg-brand-950/90 flex items-center justify-center animate-spin-slow">
                      {/* 4 Puzzle Module Indicators */}
                      <div className="absolute top-1.5 w-3 h-3 rounded-full bg-emerald-400 shadow-md shadow-emerald-400" />
                      <div className="absolute bottom-1.5 w-3 h-3 rounded-full bg-amber-400 shadow-md shadow-amber-400" />
                      <div className="absolute left-1.5 w-3 h-3 rounded-full bg-sky-400 shadow-md shadow-sky-400" />
                      <div className="absolute right-1.5 w-3 h-3 rounded-full bg-rose-400 shadow-md shadow-rose-400" />
                    </div>
                  </div>

                  {/* Center Carousel Dome */}
                  <div className="relative z-10 w-24 h-24 rounded-full bg-gradient-to-br from-brand-50 to-brand-200 border-4 border-brand-300 shadow-lg flex flex-col items-center justify-center">
                    <span className="text-2xl">🐶</span>
                    <span className="text-[10px] font-bold text-brand-900 uppercase tracking-tighter">
                      ScentLoop™
                    </span>
                    <span className="text-[9px] text-brand-600 font-mono">Micro-Dose</span>
                  </div>

                  {/* Scent airflow animation simulation */}
                  <div className="absolute -top-3 -right-3 bg-sage-600/90 text-white text-[10px] px-2.5 py-1 rounded-full font-bold shadow-lg flex items-center gap-1 animate-bounce">
                    <Wind className="w-3 h-3 text-sage-200" />
                    <span>Meadow Scent Active</span>
                  </div>
                </div>

                {/* Chime Demonstration Action */}
                <div className="mt-5 pt-4 border-t border-brand-200/80 flex items-center justify-between">
                  <div className="text-left">
                    <span className="text-[11px] font-bold text-brand-700 block uppercase tracking-wider">
                      528 Hz Harmonic Cue
                    </span>
                    <span className="text-xs text-brand-900 font-medium">Acoustic Foraging Chime</span>
                  </div>
                  <button
                    onClick={handleTestChime}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-brand-950 font-bold text-xs shadow-md transition-all active:scale-90"
                  >
                    <Volume2 className={`w-4 h-4 ${chimePlaying ? 'animate-bounce text-brand-950' : ''}`} />
                    <span>{chimePlaying ? 'Chiming...' : 'Test Hunt Chime'}</span>
                  </button>
                </div>
              </div>

              {/* Feature Switcher Tabs */}
              <div className="grid grid-cols-3 gap-1.5 bg-brand-100 p-1.5 rounded-xl text-xs font-bold text-brand-800">
                <button
                  onClick={() => setActiveTab('micro-dose')}
                  className={`py-2 rounded-lg transition-all ${
                    activeTab === 'micro-dose' ? 'bg-white text-brand-950 shadow-sm' : 'hover:text-brand-950'
                  }`}
                >
                  Micro-Sessions
                </button>
                <button
                  onClick={() => setActiveTab('puzzle')}
                  className={`py-2 rounded-lg transition-all ${
                    activeTab === 'puzzle' ? 'bg-white text-brand-950 shadow-sm' : 'hover:text-brand-950'
                  }`}
                >
                  Shifting Puzzle
                </button>
                <button
                  onClick={() => setActiveTab('scents')}
                  className={`py-2 rounded-lg transition-all ${
                    activeTab === 'scents' ? 'bg-white text-brand-950 shadow-sm' : 'hover:text-brand-950'
                  }`}
                >
                  AromaJet™ Scent
                </button>
              </div>

              {/* Dynamic Feature Explanations */}
              <div className="mt-4 p-4 rounded-2xl bg-brand-50 border border-brand-200 text-xs leading-relaxed text-brand-900">
                {activeTab === 'micro-dose' && (
                  <div className="space-y-1.5">
                    <div className="font-bold text-brand-950 flex items-center gap-1.5 text-sm">
                      <RefreshCw className="w-4 h-4 text-amber-600" />
                      1–2 Kibble Precision Portioning
                    </div>
                    <p className="text-brand-700">
                      Eliminates food coma and digestive upset. Dispenses tiny treats across 45–90 minute intervals,
                      keeping your dog curious and calm throughout an entire 8-hour workday.
                    </p>
                  </div>
                )}
                {activeTab === 'puzzle' && (
                  <div className="space-y-1.5">
                    <div className="font-bold text-brand-950 flex items-center gap-1.5 text-sm">
                      <Shield className="w-4 h-4 text-sage-600" />
                      4 Rotating Chew-Proof Modules
                    </div>
                    <p className="text-brand-700">
                      Slide-bolt, rotating dial, wobble chamber, and snuffle tray mechanically alternate lock states.
                      Your dog never solves the same pattern twice in a row!
                    </p>
                  </div>
                )}
                {activeTab === 'scents' && (
                  <div className="space-y-1.5">
                    <div className="font-bold text-brand-950 flex items-center gap-1.5 text-sm">
                      <Wind className="w-4 h-4 text-emerald-600" />
                      Timed Natural Olfactory Diffusion
                    </div>
                    <p className="text-brand-700">
                      Dried meadow herb and savory game scent cartridges cycle during active hunt windows,
                      stimulating 300 million canine olfactory receptors—naturally tiring them out.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
