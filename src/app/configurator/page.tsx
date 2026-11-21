'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  CheckCircle,
  Dog,
  Palette,
  Package,
  Bone,
  ArrowRight,
  ChevronLeft,
  Flame,
  Shield,
} from 'lucide-react';
import { useCart, buildMainUnitItem, buildAddOnItem } from '@/lib/cartStore';
import { DOG_SIZES, COLORWAYS, ADD_ONS } from '@/lib/data';
import { cn } from '@/components/ui';

type Step = 'size' | 'colorway' | 'addons' | 'summary';

export default function Configurator() {
  const [step, setStep] = useState<Step>('size');
  const [dogSize, setDogSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [colorway, setColorway] = useState<'sage' | 'sandstone' | 'forest'>('sage');
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const { addItem, itemCount } = useCart();

  return (
    <div className="min-h-screen bg-brand-50">
      {/* Progress */}
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-brand-500 hover:text-brand-900 text-sm font-medium transition-colors"
          >
            <ChevronLeft className="w-4 h-4" /> Back to store
          </Link>
          <span className="text-sm font-medium text-brand-600">
            Build your ScentLoop — {itemCount} in cart
          </span>
        </div>

        <div className="flex w-full gap-1">
          {['size', 'colorway', 'addons', 'summary'].map((s, i) => {
            const completed = ['size', 'colorway', 'addons', 'summary'].indexOf(step) > i;
            const active = step === s;
            const labels: Record<Step, string> = {
              size: 'Dog size',
              colorway: 'Colorway',
              addons: 'Add‑ons',
              summary: 'Review',
            };
            return (
              <div
                key={s}
                className={cn(
                  'flex-1 relative h-10 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300',
                  completed
                    ? 'bg-brand-600 text-white'
                    : active
                    ? 'bg-brand-900 text-white shadow-glow'
                    : 'bg-white border border-brand-200 text-brand-500 shadow-sm'
                )}
              >
                <span className="z-10">{labels[s as Step]}</span>
                {i < 3 && (
                  <div className="absolute inset-0 h-[1px] bg-brand-200"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Steps */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pb-24">
        {step === 'size' && (
          <SizeStep
            dogSize={dogSize}
            setDogSize={setDogSize}
            onNext={() => setStep('colorway')}
          />
        )}
        {step === 'colorway' && (
          <ColorwayStep
            colorway={colorway}
            setColorway={setColorway}
            onBack={() => setStep('size')}
            onNext={() => setStep('addons')}
          />
        )}
        {step === 'addons' && (
          <AddOnsStep
            selectedAddOns={selectedAddOns}
            setSelectedAddOns={setSelectedAddOns}
            onBack={() => setStep('colorway')}
            onNext={() => setStep('summary')}
          />
        )}
        {step === 'summary' && (
          <SummaryStep
            dogSize={dogSize}
            colorway={colorway}
            selectedAddOns={selectedAddOns}
            onAddToCart={() => {
              addItem(buildMainUnitItem(dogSize, colorway));
              ADD_ONS.filter((a) => selectedAddOns.includes(a.id)).forEach((a) =>
                addItem(buildAddOnItem(a))
              );
              setStep('size');
            }}
            onBack={() => setStep('addons')}
          />
        )}
      </div>
    </div>
  );
}

function SizeStep({
  dogSize,
  setDogSize,
  onNext,
}: {
  dogSize: 'small' | 'medium' | 'large';
  setDogSize: (v: 'small' | 'medium' | 'large') => void;
  onNext: () => void;
}) {
  const sizeIcons: { [key: string]: any } = { small: Dog, medium: Dog, large: Shield };
  return (
    <div className="space-y-8 animate-in fade-in slide-up duration-500">
      <div>
        <h1 className="text-[3rem] md:text-[4rem] font-serif font-bold text-brand-900 mb-4 tracking-tight">
          Pick your dog's size
        </h1>
        <p className="text-brand-600 text-lg max-w-xl">
          Choose by weight and chew strength. Each size gets its own tuned resistance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {Object.entries(DOG_SIZES).map(([id, size]) => {
          const Icon = sizeIcons[id] || Dog;
          return (
            <button
              key={id}
              onClick={() => setDogSize(id as 'small' | 'medium' | 'large')}
              className={cn(
                'p-8 rounded-3xl border flex flex-col items-center gap-4 transition-all duration-300 text-center group',
                dogSize === id
                  ? 'bg-brand-900 border-brand-900 text-white shadow-glow scale-105 ring-4 ring-brand-600/30'
                  : 'bg-white border-brand-200 text-brand-700 hover:border-brand-400 hover:shadow-soft hover:bg-brand-50'
              )}
            >
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-2">
                <Icon className="w-7 h-7" />
              </div>
              <span className="font-serif font-bold text-lg">{size.name}</span>
              <span className="text-xs font-medium tracking-wide uppercase text-brand-500 group-hover:text-brand-900 transition-colors">
                {size.weightRange}
              </span>
              <span className="text-[11px] font-bold uppercase tracking-wider text-brand-500 bg-brand-100/50 px-3 py-1 rounded-full">
                {size.chewStrength}
              </span>
              <p className="text-[12px] text-brand-500 mt-2 leading-relaxed">
                {size.description}
              </p>
            </button>
          );
        })}
      </div>

      <button
        onClick={onNext}
        className="w-full py-5 rounded-3xl bg-gradient-brand text-white font-serif font-semibold text-lg hover:shadow-glow transition-all duration-300 flex items-center justify-center gap-2"
      >
        Continue <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
}

function ColorwayStep({
  colorway,
  setColorway,
  onBack,
  onNext,
}: {
  colorway: 'sage' | 'sandstone' | 'forest';
  setColorway: (v: 'sage' | 'sandstone' | 'forest') => void;
  onBack: () => void;
  onNext: () => void;
}) {
  return (
    <div className="space-y-8 animate-in fade-in slide-up duration-500">
      <div>
        <h1 className="text-[3rem] md:text-[4rem] font-serif font-bold text-brand-900 mb-4 tracking-tight">
          Choose a colorway
        </h1>
        <p className="text-brand-600 text-lg max-w-xl">
          Pick the finish that suits your home — each handcrafted to age beautifully.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {Object.entries(COLORWAYS).map(([id, cw]) => (
          <button
            key={id}
            onClick={() => setColorway(id as 'sage' | 'sandstone' | 'forest')}
            className={cn(
              'p-8 rounded-3xl border flex flex-col items-center gap-4 transition-all duration-300 text-center group',
              colorway === id
                ? 'bg-white border-4 border-brand-900 shadow-glow scale-105'
                : 'bg-white border-brand-200 hover:border-brand-400 hover:shadow-soft'
            )}
            style={{ borderColor: cw.hex }}
          >
            <div className="w-16 h-16 rounded-full border-4 flex items-center justify-center mb-3 shadow-sm" style={{ backgroundColor: cw.hex }}>
              <Palette className="w-7 h-7 text-white" />
            </div>
            <span className="font-serif font-bold text-lg text-brand-900">{cw.name}</span>
            <p className="text-[12px] text-brand-500 leading-relaxed">{cw.description}</p>
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="text-sm font-medium text-brand-500 hover:text-brand-900 flex items-center gap-2 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" /> Back
        </button>
        <button
          onClick={onNext}
          className="w-full sm:w-auto py-3.5 px-8 rounded-2xl bg-brand-900 text-white font-semibold hover:bg-brand-800 transition-all flex items-center gap-2"
        >
          Continue <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

function AddOnsStep({
  selectedAddOns,
  setSelectedAddOns,
  onBack,
  onNext,
}: {
  selectedAddOns: string[];
  setSelectedAddOns: (v: string[]) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  return (
    <div className="space-y-8 animate-in fade-in slide-up duration-500">
      <div>
        <h1 className="text-[3rem] md:text-[4rem] font-serif font-bold text-brand-900 mb-4 tracking-tight">
          Bundle add‑ons
        </h1>
        <p className="text-brand-600 text-lg max-w-xl">
          Enhance your ScentLoop with extra scent cartridges, modules, and treats.
        </p>
      </div>

      <div className="space-y-4">
        {ADD_ONS.map((addOn) => {
          const selected = selectedAddOns.includes(addOn.id);
          return (
            <label
              key={addOn.id}
              className={cn(
                'flex items-center gap-5 p-6 rounded-3xl border cursor-pointer transition-all duration-300',
                selected
                  ? 'bg-brand-50 border-brand-600 shadow-soft'
                  : 'bg-white border-brand-200 hover:border-brand-400 hover:shadow-soft'
              )}
            >
              <input
                type="checkbox"
                checked={selected}
                onChange={() =>
                  setSelectedAddOns(selected
                    ? selectedAddOns.filter((id) => id !== addOn.id)
                    : [...selectedAddOns, addOn.id])
                }
                className="w-6 h-6 rounded border-brand-600 text-brand-600 focus:ring-brand-500 accent-brand-600"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="font-serif font-bold text-brand-900">{addOn.name}</h3>
                    <p className="text-[12px] text-brand-500 uppercase tracking-wider font-semibold">
                      {addOn.tagline}
                    </p>
                  </div>
                  <span className="font-serif font-bold text-brand-900">${addOn.price}</span>
                </div>
                <p className="text-[13px] text-brand-600 leading-relaxed">
                  {addOn.description}
                </p>
                {addOn.originalPrice > addOn.price && (
                  <p className="text-[11px] text-brand-400 mt-1 line-through">
                    Was ${addOn.originalPrice}
                  </p>
                )}
              </div>
              {selected && (
                <div className="w-8 h-8 rounded-full bg-brand-600 flex items-center justify-center text-white shadow-sm">
                  <CheckCircle className="w-4 h-4" />
                </div>
              )}
            </label>
          );
        })}
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="text-sm font-medium text-brand-500 hover:text-brand-900 flex items-center gap-2 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" /> Back
        </button>
        <button
          onClick={onNext}
          className="w-full sm:w-auto py-3.5 px-8 rounded-2xl bg-brand-900 text-white font-semibold hover:bg-brand-800 transition-all flex items-center gap-2"
        >
          Review <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

function SummaryStep({
  dogSize,
  colorway,
  selectedAddOns,
  onAddToCart,
  onBack,
}: {
  dogSize: 'small' | 'medium' | 'large';
  colorway: 'sage' | 'sandstone' | 'forest';
  selectedAddOns: string[];
  onAddToCart: () => void;
  onBack: () => void;
}) {
  const size = DOG_SIZES[dogSize];
  const cw = COLORWAYS[colorway];
  const chosenAddOns = ADD_ONS.filter((a) => selectedAddOns.includes(a.id));
  const subtotal =
    size.price + chosenAddOns.reduce((sum, a) => sum + a.price, 0);

  return (
    <div className="space-y-8 animate-in fade-in slide-up duration-500">
      <div>
        <h1 className="text-[3rem] md:text-[4rem] font-serif font-bold text-brand-900 mb-4 tracking-tight">
          Review &amp; add to cart
        </h1>
        <p className="text-brand-600 text-lg max-w-xl">
          Confirm your configuration before adding to cart.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 rounded-3xl border border-brand-100 bg-white shadow-sm">
            <h3 className="font-serif font-bold text-brand-900 mb-3 flex items-center gap-2">
              <Dog className="w-5 h-5" /> {size.name}
            </h3>
            <p className="text-[13px] text-brand-600 mb-4">
              {size.weightRange} · {size.chewStrength}
            </p>
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full border-2" style={{ borderColor: cw.hex }} />
              <span className="text-sm font-medium text-brand-700">{cw.name} colorway</span>
            </div>
          </div>

          {chosenAddOns.length > 0 && (
            <div className="p-6 rounded-3xl border border-brand-100 bg-white shadow-sm">
              <h3 className="font-serif font-bold text-brand-900 mb-4 flex items-center gap-2">
                <Package className="w-5 h-5" /> Add‑ons
              </h3>
              <ul className="space-y-3">
                {chosenAddOns.map((a) => (
                  <li key={a.id} className="flex justify-between items-start py-3 border-b border-brand-50 last:border-0">
                    <div>
                      <p className="font-medium text-brand-900 text-sm">{a.name}</p>
                      <p className="text-[12px] text-brand-500">{a.tagline}</p>
                    </div>
                    <span className="font-serif font-bold text-brand-700">${a.price}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="lg:col-span-5">
          <div className="p-8 rounded-3xl border border-brand-200 bg-gradient-deep text-white shadow-premium sticky top-24">
            <h3 className="font-serif font-bold text-brand-200 mb-6 tracking-wide">Order total</h3>
            <div className="text-[3rem] font-serif font-bold text-white mb-8">
              ${subtotal.toFixed(2)}
            </div>
            <button
              onClick={onAddToCart}
              className="w-full py-5 rounded-2xl bg-amber-500 text-brand-900 font-serif font-bold text-lg shadow-glow hover:bg-amber-400 hover:shadow-[0_0_40px_-10px_rgba(251,191,36,0.6)] transition-all duration-300 flex items-center justify-center gap-2"
            >
              Add to cart <ArrowRight className="w-5 h-5" />
            </button>
            <p className="mt-6 text-[12px] text-brand-400 text-center">
              Free shipping · 30‑day return · No subscription
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="text-sm font-medium text-brand-500 hover:text-brand-900 flex items-center gap-2 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" /> Back
        </button>
      </div>
    </div>
  );
}
