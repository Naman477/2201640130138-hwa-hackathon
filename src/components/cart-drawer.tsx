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
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={() => setIsOpen(false)}
      />
      <div className="absolute right-0 top-0 bottom-0 w-full sm:w-80 bg-white shadow-2xl border-l border-brand-200 flex flex-col animate-in slide-in-from-right duration-300">
        <div className="p-6 border-b border-brand-100 flex items-center justify-between">
          <h2 className="text-lg font-bold text-brand-900">Your cart</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 text-brand-500 hover:text-brand-900"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="text-center py-10 text-brand-500">
              <AlertCircle className="mx-auto w-8 h-8 mb-2 opacity-50" />
              <p className="text-sm">Your cart is empty.</p>
              <Link
                href="/configurator"
                className="mt-4 inline-block text-sm font-medium text-brand-600 hover:underline"
              >
                Start configuring
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-xl border border-brand-200 bg-brand-50 flex items-center justify-center text-brand-600 font-bold text-xs">
                    {item.type === 'main_unit' ? 'SL' : '+'}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <p className="text-sm font-semibold text-brand-900">{item.name}</p>
                      <button
                        onClick={() => removeItem(item.id!)}
                        className="p-1 text-brand-400 hover:text-brand-900"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    {item.details && (
                      <p className="text-xs text-brand-500 mt-0.5">{item.details}</p>
                    )}
                    <div className="mt-2 flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.id!, item.quantity - 1)}
                        className="w-7 h-7 rounded border border-brand-300 flex items-center justify-center text-xs font-bold text-brand-700 hover:bg-brand-100"
                      >
                        −
                      </button>
                      <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id!, item.quantity + 1)}
                        className="w-7 h-7 rounded border border-brand-300 flex items-center justify-center text-xs font-bold text-brand-700 hover:bg-brand-100"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <p className="text-sm font-medium text-brand-700 w-16 text-right">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-6 border-t border-brand-100 bg-brand-50">
          <div className="space-y-2 mb-6">
            <div className="flex justify-between text-sm">
              <span className="text-brand-600">Subtotal</span>
              <span className="font-medium text-brand-900">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xs text-brand-500">
              <span>Tax (estimated)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xs text-brand-500">
              <span>Shipping</span>
              <span>$0.00</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-brand-200 text-base font-bold text-brand-900">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-4 px-2 py-2 rounded-lg border border-amber-200 bg-amber-50">
            <Truck className="w-4 h-4 text-amber-600" />
            <span className="text-xs text-amber-800 font-medium">
              Free shipping on all orders
            </span>
          </div>

          <button
            onClick={() => {
              setIsOpen(false);
            }}
            className="w-full py-3 rounded-xl bg-brand-600 text-white font-semibold text-sm hover:bg-brand-700 transition-colors flex items-center justify-center gap-2"
          >
            Checkout <ChevronRight className="w-4 h-4" />
          </button>
          <button
            onClick={clear}
            className="w-full mt-3 py-2 rounded-xl border border-brand-200 bg-white text-brand-600 text-sm font-medium hover:bg-brand-50 transition-colors"
          >
            Clear cart
          </button>
        </div>
      </div>
    </div>
  );
}
