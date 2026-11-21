'use client';

import { useCart } from '@/lib/cartStore';
import { X, ChevronRight, Truck, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { cn } from './ui';
import { TAX_RATE, SHIPPING_COST } from '@/lib/data';

export function CartDrawer() {
  const { items, subtotal, updateQuantity, removeItem, clear, isOpen, setIsOpen } = useCart();
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax + SHIPPING_COST;

  return (
    <div
      className={cn(
        'fixed inset-0 z-[60] flex',
        isOpen ? '' : 'hidden'
      )}
    >
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={() => setIsOpen(false)}
      />
      <div className="absolute right-0 top-0 bottom-0 w-full sm:w-80 bg-white shadow-2xl border-l border-brand-100 flex flex-col animate-in slide-in-from-right duration-300">
        <div className="p-7 border-b border-brand-100 flex items-center justify-between">
          <h2 className="font-serif font-bold text-2xl text-brand-900">Your cart</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 text-brand-500 hover:text-brand-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-7">
          {items.length === 0 ? (
            <div className="text-center py-16">
              <AlertCircle className="mx-auto w-10 h-10 mb-4 text-brand-300 opacity-50" />
              <p className="text-brand-500 font-medium mb-2">Your cart is empty.</p>
              <Link
                href="/configurator"
                className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-900 transition-colors"
              >
                Start configuring <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="space-y-5">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-2xl border border-brand-100 bg-brand-50 flex items-center justify-center text-brand-600 font-bold text-xs shadow-sm">
                    {item.type === 'main_unit' ? 'SL' : '+'}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <p className="font-serif font-semibold text-brand-900 text-sm">{item.name}</p>
                      <button
                        onClick={() => removeItem(item.id!)}
                        className="p-1.5 text-brand-400 hover:text-brand-900 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    {item.details && (
                      <p className="text-[11px] text-brand-500 mt-1 leading-tight">{item.details}</p>
                    )}
                    <div className="mt-3 flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.id!, item.quantity - 1)}
                        className="w-7 h-7 rounded-xl border border-brand-200 flex items-center justify-center text-xs font-bold text-brand-700 hover:bg-brand-100 transition-colors"
                      >
                        −
                      </button>
                      <span className="w-6 text-center text-sm font-medium text-brand-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id!, item.quantity + 1)}
                        className="w-7 h-7 rounded-xl border border-brand-200 flex items-center justify-center text-xs font-bold text-brand-700 hover:bg-brand-100 transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <p className="font-medium text-brand-700 text-sm w-16 text-right">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-7 border-t border-brand-100 bg-brand-50/50">
          <div className="space-y-3 mb-8">
            <div className="flex justify-between text-sm">
              <span className="text-brand-600">Subtotal</span>
              <span className="font-serif font-bold text-brand-900">₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xs text-brand-500">
              <span>GST (5% estimated)</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xs text-brand-500">
              <span>Shipping</span>
              <span className="text-emerald-700 font-bold uppercase tracking-wider text-[11px]">FREE</span>
            </div>
            <div className="flex justify-between pt-3 border-t border-brand-200 text-lg font-serif font-bold text-brand-900">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 mb-6 px-3 py-3 rounded-2xl border border-amber-100 bg-amber-50">
            <Truck className="w-4 h-4 text-amber-600" />
            <span className="text-xs font-medium text-amber-800">
              Free Pan-India Delivery (Bluedart / Delhivery)
            </span>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="w-full py-4 rounded-2xl bg-brand-900 text-white font-serif font-semibold text-sm hover:bg-brand-800 transition-all shadow-glow flex items-center justify-center gap-2"
          >
            Checkout <ChevronRight className="w-4 h-4" />
          </button>
          <button
            onClick={clear}
            className="w-full mt-4 py-3 rounded-2xl border border-brand-200 bg-white text-brand-600 font-medium text-sm hover:bg-brand-50 transition-colors"
          >
            Clear cart
          </button>
        </div>
      </div>
    </div>
  );
}
