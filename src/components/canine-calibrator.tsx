'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, Brain, Clock, ShieldCheck, Flame, ArrowRight, Dog, Compass } from 'lucide-react';
import { cn } from './ui';

interface BreedProfile {
  name: string;
  category: string;
  sizeKey: 'small' | 'medium' | 'large';
  baseReceptors: number;
  anxietyRisk: string;
  foragingTrait: string;
  parkWalkKm: number;
}

const BREEDS: Record<string, BreedProfile> = {
  indie: {
    name: 'Indie / Desi Dog',
    category: 'High Intelligence & Natural Scavenger Instinct',
    sizeKey: 'medium',
    baseReceptors: 250,
    anxietyRisk: 'Medium (Street-smart, needs mental stimulation)',
    foragingTrait: 'Exceptional olfactory problem solver; solves normal toys in under 60 seconds.',
    parkWalkKm: 5.2,
  },
  golden: {
    name: 'Golden Retriever',
    category: 'High Separation Anxiety & Soft Mouth Drive',
    sizeKey: 'medium',
    baseReceptors: 260,
    anxietyRisk: 'High (Prone to pacing & door-watching when alone)',
    foragingTrait: 'Needs gentle scent cues to calm nervous pacing and induce restful sleep.',
    parkWalkKm: 6.0,
  },
  labrador: {
    name: 'Labrador Retriever',
    category: 'Extreme Food Obsession & Power Chewing',
    sizeKey: 'large',
    baseReceptors: 240,
    anxietyRisk: 'Medium to High (Frantic scarfing of treats)',
    foragingTrait: 'Gorges on standard dispensers; 2-kibble micro-releases prevent bloat & vomiting.',
    parkWalkKm: 5.8,
  },
  beagle: {
    name: 'Beagle',
    category: 'World-Class Scent Hound',
    sizeKey: 'small',
    baseReceptors: 290,
    anxietyRisk: 'High (Barks & howls if olfactory drive is neglected)',
    foragingTrait: 'Needs multi-scent airflow to channel relentless scent tracking into calmness.',
    parkWalkKm: 4.8,
  },
  gsd: {
    name: 'German Shepherd',
    category: 'Working Drive & High Jaw Strength',
    sizeKey: 'large',
    baseReceptors: 280,
    anxietyRisk: 'High (Destructive chewing on furniture if bored)',
    foragingTrait: 'Demands shifting mechanical locks to prevent repetitive muscle memory.',
    parkWalkKm: 7.2,
  },
  shihtzu: {
    name: 'Shih Tzu / Pug / Small Breed',
    category: 'Apartment Companion',
    sizeKey: 'small',
    baseReceptors: 180,
    anxietyRisk: 'Medium (Velcro dog, needs gentle comfort)',
    foragingTrait: 'Requires lightweight soft rubber tension pins tailored for smaller jaws.',
    parkWalkKm: 3.5,
  },
};

export function CanineCalibrator() {
  const [selectedBreedKey, setSelectedBreedKey] = useState<string>('indie');
  const [workdayHours, setWorkdayHours] = useState<number>(8);
  const [chewStyle, setChewStyle] = useState<'gentle' | 'moderate' | 'power'>('moderate');

  const breed = BREEDS[selectedBreedKey] || BREEDS.indie;

  // Real-time calculated metrics
  const microSessions = Math.round((workdayHours * 60) / 65);
  const totalKcal = microSessions * 6; // ~6 kcal per 1-2 micro-kibble release
  const calculatedWalkKm = (breed.parkWalkKm * (workdayHours / 8)).toFixed(1);
  const anxietyReduction = Math.min(94, 65 + workdayHours * 3);
  const totalReceptors = breed.baseReceptors + (chewStyle === 'power' ? 20 : 10);

  return (
    <section id="calibrator" className="py-24 bg-gradient-to-b from-white via-brand-50 to-white border-b border-brand-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider border border-amber-300">
            <Brain className="w-3.5 h-3.5 text-amber-700" />
            Interactive Canine Science Tool
          </div>
          <h2 className="text-[2.5rem] md:text-[3.8rem] font-serif font-bold text-brand-900 tracking-tight leading-tight">
            Canine Olfactory Satiety Calibrator
          </h2>
          <p className="text-brand-600 text-base md:text-lg leading-relaxed">
            Every dog’s brain operates differently. Pick your dog’s breed and your typical office workday to
            simulate their personalized micro-foraging protocol and mental exhaustion curve.
          </p>
        </div>

        {/* Calibrator Control Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Form (7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-brand-200/90 shadow-sm space-y-7">
            {/* 1. Breed Selector */}
            <div className="space-y-3">
              <label className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-brand-900">
                <span>1. Select Dog Breed / Type</span>
                <span className="text-brand-500 font-normal">Common Indian Households</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {Object.entries(BREEDS).map(([key, b]) => {
                  const isSelected = selectedBreedKey === key;
                  return (
                    <button
                      key={key}
                      onClick={() => setSelectedBreedKey(key)}
                      className={cn(
                        'p-3.5 rounded-2xl border text-left transition-all',
                        isSelected
                          ? 'border-brand-900 bg-brand-900 text-white shadow-md scale-[1.02]'
                          : 'border-brand-200 bg-brand-50/50 hover:bg-white text-brand-800'
                      )}
                    >
                      <div className="text-xs font-bold truncate">{b.name}</div>
                      <div
                        className={cn(
                          'text-[10px] mt-0.5 truncate',
                          isSelected ? 'text-brand-300' : 'text-brand-500'
                        )}
                      >
                        {b.sizeKey.toUpperCase()} SIZE
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Workday Alone Time Slider */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-brand-900">
                  2. Workday Hours Left Alone
                </label>
                <span className="font-mono font-extrabold text-sm text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-200">
                  {workdayHours} Hours at Office
                </span>
              </div>
              <input
                type="range"
                min="4"
                max="10"
                step="1"
                value={workdayHours}
                onChange={(e) => setWorkdayHours(Number(e.target.value))}
                className="w-full h-2 bg-brand-200 rounded-lg appearance-none cursor-pointer accent-brand-900"
              />
              <div className="flex justify-between text-[11px] text-brand-500 font-mono">
                <span>4 Hours (Half Day)</span>
                <span>8 Hours (Standard Office)</span>
                <span>10 Hours (Long Commute)</span>
              </div>
            </div>

            {/* 3. Chewing Temperament */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-brand-900 block">
                3. Chewing Temperament & Destructiveness
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'gentle', label: 'Gentle', sub: 'Nuzzles & licks' },
                  { id: 'moderate', label: 'Curious', sub: 'Active paws & nose' },
                  { id: 'power', label: 'Power Chewer', sub: 'Heavy jaw force' },
                ].map((c) => {
                  const isSelected = chewStyle === c.id;
                  return (
                    <button
                      key={c.id}
                      onClick={() => setChewStyle(c.id as any)}
                      className={cn(
                        'p-3.5 rounded-2xl border text-center transition-all',
                        isSelected
                          ? 'border-brand-950 bg-brand-950 text-white shadow-sm'
                          : 'border-brand-200 bg-white hover:bg-brand-50 text-brand-800'
                      )}
                    >
                      <div className="text-xs font-bold">{c.label}</div>
                      <div
                        className={cn(
                          'text-[10px] mt-0.5',
                          isSelected ? 'text-brand-300' : 'text-brand-500'
                        )}
                      >
                        {c.sub}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Canine Behavioral Insight Callout */}
            <div className="p-4 rounded-2xl bg-sage-50 border border-sage-200 text-xs text-sage-900 space-y-1">
              <div className="font-bold flex items-center gap-1.5 text-sage-950">
                <Dog className="w-4 h-4 text-sage-700" />
                <span>Behavioral Assessment for {breed.name}:</span>
              </div>
              <p className="leading-relaxed text-sage-900">{breed.foragingTrait}</p>
            </div>
          </div>

          {/* Results Diagnostic Card (5 Cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-brand-950 via-brand-900 to-forest-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="border-b border-brand-800/80 pb-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400 font-mono">
                CALIBRATED WORKDAY PROTOCOL
              </span>
              <h3 className="text-2xl font-serif font-bold text-white mt-1">
                {breed.name} Custom Routine
              </h3>
              <p className="text-xs text-brand-300 mt-1">
                Optimized for Indian apartment living during {workdayHours}-hour workdays.
              </p>
            </div>

            {/* 4 Diagnostic Metrics */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 space-y-1">
                <span className="text-[10px] uppercase font-bold tracking-wider text-brand-300 block">
                  Olfactory Stimulation
                </span>
                <div className="text-xl font-bold font-mono text-amber-300">
                  {totalReceptors}M+
                </div>
                <span className="text-[10px] text-brand-300 block">Nasal Receptors Engaged</span>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 space-y-1">
                <span className="text-[10px] uppercase font-bold tracking-wider text-brand-300 block">
                  Mental Exhaustion Equivalent
                </span>
                <div className="text-xl font-bold font-mono text-emerald-300">
                  {calculatedWalkKm} km
                </div>
                <span className="text-[10px] text-brand-300 block">Outdoor Park Walk</span>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 space-y-1">
                <span className="text-[10px] uppercase font-bold tracking-wider text-brand-300 block">
                  Scheduled Micro-Doses
                </span>
                <div className="text-xl font-bold font-mono text-amber-300">
                  {microSessions} Releases
                </div>
                <span className="text-[10px] text-brand-300 block">Every ~65 mins (1–2 treats)</span>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 space-y-1">
                <span className="text-[10px] uppercase font-bold tracking-wider text-brand-300 block">
                  Anxiety Drop Index
                </span>
                <div className="text-xl font-bold font-mono text-emerald-300">
                  -{anxietyReduction}%
                </div>
                <span className="text-[10px] text-brand-300 block">Less pacing & vocalization</span>
              </div>
            </div>

            {/* Calorie safety callout */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-xs space-y-1 text-brand-200">
              <div className="font-bold text-white flex items-center justify-between">
                <span>Total Workday Calories:</span>
                <span className="font-mono text-amber-300 font-bold">~{totalKcal} kcal</span>
              </div>
              <p className="text-[11px] text-brand-300 leading-relaxed">
                Replaces destructive overfeeding. Your dog stays lean, excited, and completely satisfied
                without digestive upset.
              </p>
            </div>

            {/* Direct CTA */}
            <Link
              href="/configurator"
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-brand-950 font-extrabold text-sm shadow-lg flex items-center justify-center gap-2 transition-all transform active:scale-95"
            >
              <Compass className="w-4 h-4 text-brand-950" />
              <span>Configure ScentLoop for {breed.name} (from ₹4,999)</span>
              <ArrowRight className="w-4 h-4 text-brand-950" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
