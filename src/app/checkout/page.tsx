'use client';

import { useState } from 'react';
import { useCart } from '@/lib/cartStore';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  MapPin,
  CreditCard,
  ChevronLeft,
  CheckCircle,
  AlertTriangle,
  Truck,
} from 'lucide-react';
import { TAX_RATE, SHIPPING_COST } from '@/lib/data';
import { cn } from '@/components/ui';

type Step = 'shipping' | 'payment' | 'confirming' | 'done';

interface FormData {
  dogName: string;
  dogBreed: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  apartment: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  deliveryNotes: string;
}

const EMPTY_FORM: FormData = {
  dogName: '',
  dogBreed: '',
  fullName: '',
  email: '',
  phone: '',
  address: '',
  apartment: '',
  city: '',
  state: '',
  postalCode: '',
  country: 'US',
  deliveryNotes: '',
};

export default function Checkout() {
  const { items, subtotal, clear } = useCart();
  const router = useRouter();
  const [step, setStep] = useState<Step>('shipping');
  const [form, setForm] = useState<FormData>(EMPTY_FORM);
  const [payment, setPayment] = useState({
    cardNumber: '',
    expiry: '',
    cvc: '',
    nameOnCard: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax + SHIPPING_COST;

  const isShippingValid =
    form.fullName && form.email && form.address && form.city && form.state && form.postalCode;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (items.length === 0) {
      setError('Your cart is empty.');
      return;
    }
    setLoading(true);
    try {
      const orderPayload = {
        shippingDetails: form,
        items: items.map((i) => ({
          name: i.name,
          quantity: i.quantity,
          unitPrice: i.price,
          totalPrice: i.price * i.quantity,
          details: i.details,
        })),
        subtotal,
        shippingCost: SHIPPING_COST,
        tax,
        total,
        paymentMethod: {
          type: 'card',
          last4: payment.cardNumber.slice(-4),
          cardBrand: 'Visa',
        },
      };
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Order failed');
      clear();
      setStep('done');
      // stash order id for the confirmation page via query
      router.push(`/order/${data.order.id}?total=${data.order.total}`);
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-50">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Header + progress */}
        <div className="mb-8 flex items-center justify-between">
          <Link
            href="/configurator"
            className="inline-flex items-center gap-2 text-brand-500 hover:text-brand-700 text-sm font-medium"
          >
            <ChevronLeft className="w-4 h-4" /> Back to cart
          </Link>
          <div className="flex items-center gap-2 text-sm font-medium text-brand-600">
            <span className="w-2 h-2 rounded-full bg-brand-600"></span>
            Checkout
          </div>
        </div>

        {/* Steps indicator */}
        <div className="flex gap-1 mb-10">
          {['shipping', 'payment', 'done'].map((s) => {
            const active = step === s;
            const done = ['shipping', 'payment', 'done'].indexOf(step) > ['shipping', 'payment', 'done'].indexOf(s);
            const labels: Record<string, string> = { shipping: 'Shipping', payment: 'Payment', done: 'Complete' };
            return (
              <div
                key={s}
                className={cn(
                  'flex-1 relative h-10 rounded-full flex items-center justify-center text-xs font-medium transition-all',
                  active
                    ? 'bg-brand-900 text-white shadow-lg'
                    : done
                    ? 'bg-brand-600 text-white'
                    : 'bg-brand-200 text-brand-500'
                )}
              >
                <span className="z-10">{labels[s]}</span>
                <div className="absolute inset-0 h-px"></div>
              </div>
            );
          })}
        </div>

        {/* Shipping step */}
        {step === 'shipping' && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-2xl font-serif font-bold text-brand-900 mb-2">Shipping details</h2>
            <p className="text-brand-600 mb-6">Where should we send your ScentLoop?</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-brand-700">Dog's name</label>
                <input
                  name="dogName"
                  value={form.dogName}
                  onChange={(e) => setForm({ ...form, dogName: e.target.value })}
                  className="w-full rounded-xl border border-brand-300 bg-white px-4 py-2 text-brand-900 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
                  placeholder="e.g. Luna"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-brand-700">Dog's breed</label>
                <input
                  name="dogBreed"
                  value={form.dogBreed}
                  onChange={(e) => setForm({ ...form, dogBreed: e.target.value })}
                  className="w-full rounded-xl border border-brand-300 bg-white px-4 py-2 text-brand-900 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
                  placeholder="e.g. Border Collie"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-brand-700">Full name</label>
                <input
                  name="fullName"
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  className="w-full rounded-xl border border-brand-300 bg-white px-4 py-2 text-brand-900 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-brand-700">Email</label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-xl border border-brand-300 bg-white px-4 py-2 text-brand-900 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-brand-700">Phone</label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full rounded-xl border border-brand-300 bg-white px-4 py-2 text-brand-900 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-brand-700">Address</label>
                <input
                  name="address"
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  className="w-full rounded-xl border border-brand-300 bg-white px-4 py-2 text-brand-900 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-brand-700">Apartment / unit (optional)</label>
                <input
                  name="apartment"
                  value={form.apartment}
                  onChange={(e) => setForm({ ...form, apartment: e.target.value })}
                  className="w-full rounded-xl border border-brand-300 bg-white px-4 py-2 text-brand-900 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-brand-700">City</label>
                <input
                  name="city"
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  className="w-full rounded-xl border border-brand-300 bg-white px-4 py-2 text-brand-900 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-brand-700">State / region</label>
                <input
                  name="state"
                  value={form.state}
                  onChange={(e) => setForm({ ...form, state: e.target.value })}
                  className="w-full rounded-xl border border-brand-300 bg-white px-4 py-2 text-brand-900 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-brand-700">Postal code</label>
                <input
                  name="postalCode"
                  value={form.postalCode}
                  onChange={(e) => setForm({ ...form, postalCode: e.target.value })}
                  className="w-full rounded-xl border border-brand-300 bg-white px-4 py-2 text-brand-900 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-brand-700">Country</label>
                <select
                  name="country"
                  value={form.country}
                  onChange={(e) => setForm({ ...form, country: e.target.value })}
                  className="w-full rounded-xl border border-brand-300 bg-white px-4 py-2 text-brand-900 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
                >
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="GB">United Kingdom</option>
                  <option value="AU">Australia</option>
                </select>
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-semibold text-brand-700">Delivery notes (optional)</label>
                <textarea
                  name="deliveryNotes"
                  value={form.deliveryNotes}
                  onChange={(e) => setForm({ ...form, deliveryNotes: e.target.value })}
                  rows={2}
                  className="w-full rounded-xl border border-brand-300 bg-white px-4 py-2 text-brand-900 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
                  placeholder="Leave at door, gate code, etc."
                />
              </div>
            </div>

            <div className="pt-6 border-t border-brand-200 flex justify-between">
              <span className="text-sm text-brand-600">
                Cart: {items.reduce((s, i) => s + i.quantity, 0)} item{items.reduce((s, i) => s + i.quantity, 0) !== 1 ? 's' : ''}
              </span>
              <button
                type="submit"
                disabled={!isShippingValid || loading}
                className={cn(
                  'px-8 py-3 rounded-xl font-semibold transition-colors flex items-center gap-2',
                  !isShippingValid || loading
                    ? 'bg-brand-300 text-brand-200 cursor-not-allowed'
                    : 'bg-brand-600 text-white hover:bg-brand-700'
                )}
              >
                {loading ? 'Processing...' : 'Continue to payment'}
                <Truck className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* Payment step */}
        {step === 'payment' && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-2xl font-serif font-bold text-brand-900 mb-2">Payment</h2>
            <p className="text-brand-600 mb-6">Secure, simulated checkout — no login required.</p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-brand-700">Card number</label>
                  <input
                    name="cardNumber"
                    value={payment.cardNumber}
                    onChange={(e) =>
                      setPayment({ ...payment, cardNumber: e.target.value.replace(/\D/g, '') })
                    }
                    maxLength={16}
                    className="w-full rounded-xl border border-brand-300 bg-white px-4 py-2 text-brand-900 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
                    placeholder="•••• •••• •••• ••••"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-brand-700">Expiry (MM/YY)</label>
                    <input
                      name="expiry"
                      value={payment.expiry}
                      onChange={(e) =>
                        setPayment({ ...payment, expiry: e.target.value.replace(/\D/g, '') })
                      }
                      maxLength={4}
                      className="w-full rounded-xl border border-brand-300 bg-white px-4 py-2 text-brand-900 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
                      placeholder="MM/YY"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-brand-700">CVC</label>
                    <input
                      name="cvc"
                      value={payment.cvc}
                      onChange={(e) =>
                        setPayment({ ...payment, cvc: e.target.value.replace(/\D/g, '') })
                      }
                      maxLength={3}
                      className="w-full rounded-xl border border-brand-300 bg-white px-4 py-2 text-brand-900 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
                      placeholder="•••"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-brand-700">Name on card</label>
                  <input
                    name="nameOnCard"
                    value={payment.nameOnCard}
                    onChange={(e) => setPayment({ ...payment, nameOnCard: e.target.value })}
                    className="w-full rounded-xl border border-brand-300 bg-white px-4 py-2 text-brand-900 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
                  />
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl border border-brand-200 bg-brand-50">
                  <CheckCircle className="w-5 h-5 text-brand-600" />
                  <p className="text-sm text-brand-700">
                    This is a demo store. No real charges are processed.
                  </p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-brand-200">
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-brand-600">Subtotal</span>
                    <span className="font-medium text-brand-900">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xs text-brand-500">
                    <span>Shipping</span>
                    <span>$0.00</span>
                  </div>
                  <div className="flex justify-between text-xs text-brand-500">
                    <span>Tax (estimated)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-brand-200 text-lg font-bold text-brand-900">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl bg-brand-600 text-white font-semibold hover:bg-brand-700 transition-colors disabled:opacity-60"
                >
                  {loading ? 'Placing order...' : 'Place order'}
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Error banner */}
        {error && (
          <div className="mb-6 p-4 rounded-xl border border-amber-200 bg-amber-50 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
            <p className="text-sm text-amber-800">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}
