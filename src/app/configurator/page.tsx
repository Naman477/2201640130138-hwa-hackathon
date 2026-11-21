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

  const isLastStep = step === 'summary';

  return (
    <div className="min-h-screen bg-brand-50">
      {/* Progress */}
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-brand-500 hover:text-brand-700 text-sm font-medium"
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
              colorway: 'Color',
              addons: 'Add‑ons',
              summary: 'Review',
            };
            return (
              <div
                key={s}
                className={cn(
                  'flex-1 relative h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all',
                  completed
                    ? 'bg-brand-600 text-white'
                    : active
                    ? 'bg-brand-900 text-white shadow-lg'
                    : 'bg-brand-200 text-brand-500'
                )}
              >
                <span className="z-10">{labels[s as Step]}</span>
                {i < 3 && (
                  <div className="absolute inset-0 h-px"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Steps */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pb-24">
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
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div>
        <h1 className="text-3xl font-serif font-bold text-brand-900 mb-2">Pick your dog's size</h1>
        <p className="text-brand-600">Choose by weight and chew strength.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.entries(DOG_SIZES).map(([id, size]) => (
          <button
            key={id}
            onClick={() => setDogSize(id as 'small' | 'medium' | 'large')}
            className={cn(
              'p-6 rounded-2xl border flex flex-col items-center gap-3 transition-all text-center',
              dogSize === id
                ? 'bg-brand-900 border-brand-900 text-white shadow-xl ring-4 ring-brand-600'
                : 'bg-white border-brand-200 text-brand-700 hover:border-brand-400 hover:bg-brand-50'
            )}
          >
            <Dog className="w-10 h-10 text-brand-600" />
            <span className="font-bold text-brand-900">{size.name}</span>
            <span className="text-xs text-brand-500">{size.weightRange}</span>
            <span className="text-xs font-medium bg-brand-100 text-brand-700 px-2 py-0.5 rounded-full">
              {size.chewStrength}
            </span>
            <p className="text-[11px] text-brand-500 mt-2 leading-tight">
              {size.description}
            </p>
          </button>
        ))}
      </div>

      <button
        onClick={onNext}
        className="w-full py-4 rounded-2xl bg-brand-600 text-white font-semibold hover:bg-brand-700 transition-colors flex items-center justify-center gap-2"
      >
        Continue <ArrowRight className="w-4 h-4" />
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
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div>
        <h1 className="text-3xl font-serif font-bold text-brand-900 mb-2">Choose a colorway</h1>
        <p className="text-brand-600">Pick the finish that suits your home.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {Object.entries(COLORWAYS).map(([id, cw]) => (
          <button
            key={id}
            onClick={() => setColorway(id as 'sage' | 'sandstone' | 'forest')}
            className={cn(
              'p-6 rounded-2xl border flex flex-col items-center gap-3 transition-all text-center',
              colorway === id
                ? `bg-white border-4 border-brand-900 shadow-xl text-brand-900`
                : 'bg-white border-brand-200 hover:border-brand-400'
            )}
            style={{ borderColor: cw.hex }}
          >
            <div className="w-14 h-14 rounded-full border-4 flex items-center justify-center mb-2" style={{ backgroundColor: cw.hex }}>
              <Palette className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-brand-900">{cw.name}</span>
            <p className="text-[11px] text-brand-500 leading-tight">{cw.description}</p>
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="text-sm font-medium text-brand-500 hover:text-brand-700 flex items-center gap-2"
        >
          <ChevronLeft className="w-4 h-4" /> Back
        </button>
        <button
          onClick={onNext}
          className="w-full sm:w-auto py-3 px-6 rounded-2xl bg-brand-600 text-white font-semibold hover:bg-brand-700 transition-colors flex items-center gap-2"
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
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div>
        <h1 className="text-3xl font-serif font-bold text-brand-900 mb-2">Bundle add‑ons</h1>
        <p className="text-brand-600">Extra scent cartridges, modules, and treats.</p>
      </div>

      <div className="space-y-4">
        {ADD_ONS.map((addOn) => {
          const selected = selectedAddOns.includes(addOn.id);
          return (
            <label
              key={addOn.id}
              className={cn(
                'flex items-center gap-4 p-4 rounded-2xl border cursor-pointer transition-colors',
                selected
                  ? 'bg-brand-50 border-brand-600'
                  : 'bg-white border-brand-200 hover:border-brand-400'
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
                className="w-5 h-5 rounded border-brand-600 text-brand-600 focus:ring-brand-500"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-brand-900">{addOn.name}</h3>
                    <p className="text-xs text-brand-500">{addOn.tagline}</p>
                  </div>
                  <span className="font-medium text-brand-700">${addOn.price}</span>
                </div>
                <p className="text-xs text-brand-600 mt-1">{addOn.description}</p>
                {addOn.originalPrice > addOn.price && (
                  <p className="text-[11px] text-brand-500 mt-1 line-through">
                    Was ${addOn.originalPrice}
                  </p>
                )}
              </div>
              {selected && <CheckCircle className="w-5 h-5 text-brand-600" />}
            </label>
          );
        })}
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="text-sm font-medium text-brand-500 hover:text-brand-700 flex items-center gap-2"
        >
          <ChevronLeft className="w-4 h-4" /> Back
        </button>
        <button
          onClick={onNext}
          className="w-full sm:w-auto py-3 px-6 rounded-2xl bg-brand-600 text-white font-semibold hover:bg-brand-700 transition-colors flex items-center gap-2"
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
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div>
        <h1 className="text-3xl font-serif font-bold text-brand-900 mb-2">Review &amp; add to cart</h1>
        <p className="text-brand-600">Confirm your configuration.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="p-6 rounded-2xl border border-brand-200 bg-white">
            <h3 className="font-bold text-brand-900 mb-2 flex items-center gap-2">
              <Dog className="w-4 h-4" /> {size.name}
            </h3>
            <p className="text-sm text-brand-600">{size.weightRange} · {size.chewStrength}</p>
            <div className="mt-2 flex items-center gap-2">
              <div className="w-6 h-6 rounded-full border-2" style={{ borderColor: cw.hex }} />
              <span className="text-sm font-medium">{cw.name} colorway</span>
            </div>
          </div>

          {chosenAddOns.length > 0 && (
            <div className="p-6 rounded-2xl border border-brand-200 bg-white">
              <h3 className="font-bold text-brand-900 mb-3 flex items-center gap-2">
                <Package className="w-4 h-4" /> Add‑ons
              </h3>
              <ul className="space-y-2">
                {chosenAddOns.map((a) => (
                  <li key={a.id} className="flex justify-between text-sm">
                    <span className="text-brand-600">{a.name}</span>
                    <span className="font-medium text-brand-900">${a.price}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="p-8 rounded-2xl border border-brand-200 bg-brand-900 text-white shadow-xl">
          <h3 className="font-bold mb-4 text-brand-100">Total</h3>
          <div className="text-3xl font-serif font-bold mb-6"> ${subtotal.toFixed(2)}</div>
          <button
            onClick={onAddToCart}
            className="w-full py-4 rounded-xl bg-amber-500 text-brand-900 font-bold hover:bg-amber-400 transition-colors flex items-center justify-center gap-2"
          >
            Add to cart <ArrowRight className="w-4 h-4" />
          </button>
          <p className="mt-4 text-xs text-sage-300">
            Free shipping · 30‑day return
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="text-sm font-medium text-brand-500 hover:text-brand-700 flex items-center gap-2"
        >
          <ChevronLeft className="w-4 h-4" /> Back
        </button>
      </div>
    </div>
  );
}
