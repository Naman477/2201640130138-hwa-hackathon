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
  Mail,
  Phone,
  Home,
  User,
  PawPrint,
  Dog,
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
        <div className="mb-8 flex items-center justify-between">
          <Link
            href="/configurator"
            className="inline-flex items-center gap-2 text-brand-500 hover:text-brand-900 text-sm font-medium transition-colors"
          >
            <ChevronLeft className="w-4 h-4" /> Back to cart
          </Link>
        </div>

        {/* Steps indicator */}
        <div className="flex gap-2 mb-12">
          {['shipping', 'payment', 'done'].map((s) => {
            const active = step === s;
            const done = ['shipping', 'payment', 'done'].indexOf(step) > ['shipping', 'payment', 'done'].indexOf(s);
            const labels: Record<string, string> = { shipping: 'Shipping', payment: 'Payment', done: 'Complete' };
            return (
              <div
                key={s}
                className={cn(
                  'flex-1 relative h-10 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-300',
                  active
                    ? 'bg-brand-900 text-white shadow-glow'
                    : done
                    ? 'bg-brand-600 text-white'
                    : 'bg-white border border-brand-200 text-brand-500 shadow-sm'
                )}
              >
                <span className="z-10">{labels[s]}</span>
                <div className="absolute inset-0 h-[1px] bg-brand-200"></div>
              </div>
            );
          })}
        </div>

        {/* Shipping step */}
        {step === 'shipping' && (
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <h2 className="text-[2.5rem] md:text-[3rem] font-serif font-bold text-brand-900 mb-4 tracking-tight">
                Shipping details
              </h2>
              <p className="text-brand-600 text-lg">
                Where should we send your ScentLoop?
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Field
                label="Dog's name"
                name="dogName"
                value={form.dogName}
                onChange={(e) => setForm({ ...form, dogName: e.target.value })}
                placeholder="e.g. Luna"
                icon={<Dog />}
              />
              <Field
                label="Dog's breed"
                name="dogBreed"
                value={form.dogBreed}
                onChange={(e) => setForm({ ...form, dogBreed: e.target.value })}
                placeholder="e.g. Border Collie"
                icon={<PawPrint />}
              />
              <Field
                label="Full name"
                name="fullName"
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                placeholder="Jane Doe"
                required
                icon={<User />}
              />
              <Field
                label="Email"
                name="email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="jane@example.com"
                required
                icon={<Mail />}
              />
              <Field
                label="Phone"
                name="phone"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="+1 (555) 000-0000"
                icon={<Phone />}
              />
              <Field
                label="Address"
                name="address"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                placeholder="123 Main Street"
                required
                icon={<MapPin />}
              />
              <Field
                label="Apartment / unit (optional)"
                name="apartment"
                value={form.apartment}
                onChange={(e) => setForm({ ...form, apartment: e.target.value })}
                placeholder="Apt 4B"
                icon={<Home />}
              />
              <Field
                label="City"
                name="city"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                placeholder="Portland"
                required
              />
              <Field
                label="State / region"
                name="state"
                value={form.state}
                onChange={(e) => setForm({ ...form, state: e.target.value })}
                placeholder="OR"
                required
              />
              <Field
                label="Postal code"
                name="postalCode"
                value={form.postalCode}
                onChange={(e) => setForm({ ...form, postalCode: e.target.value })}
                placeholder="97201"
                required
              />
              <Field
                label="Country"
                name="country"
                as="select"
                value={form.country}
                onChange={(e) => setForm({ ...form, country: e.target.value })}
              >
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="GB">United Kingdom</option>
                <option value="AU">Australia</option>
              </Field>
              <div className="md:col-span-2">
                <Field
                  label="Delivery notes (optional)"
                  name="deliveryNotes"
                  as="textarea"
                  rows={2}
                  value={form.deliveryNotes}
                  onChange={(e) => setForm({ ...form, deliveryNotes: e.target.value })}
                  placeholder="Leave at door, gate code, etc."
                />
              </div>
            </div>

            <div className="pt-8 border-t border-brand-200 flex justify-between items-end gap-4">
              <span className="text-brand-600 text-sm">
                Cart: {items.reduce((s, i) => s + i.quantity, 0)} item{items.reduce((s, i) => s + i.quantity, 0) !== 1 ? 's' : ''}
              </span>
              <button
                type="submit"
                disabled={!isShippingValid || loading}
                className={cn(
                  'px-10 py-4 rounded-3xl font-serif font-semibold text-lg transition-all duration-300 flex items-center gap-2',
                  !isShippingValid || loading
                    ? 'bg-brand-300 text-brand-200 cursor-not-allowed'
                    : 'bg-brand-900 text-white hover:shadow-glow hover:bg-brand-800'
                )}
              >
                {loading ? 'Placing order...' : 'Continue to payment'}
                <Truck className="w-5 h-5" />
              </button>
            </div>
          </form>
        )}

        {/* Payment step */}
        {step === 'payment' && (
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <h2 className="text-[2.5rem] md:text-[3rem] font-serif font-bold text-brand-900 mb-4 tracking-tight">
                Payment
              </h2>
              <p className="text-brand-600 text-lg">
                Secure, simulated checkout — no login required.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <Field
                  label="Card number"
                  name="cardNumber"
                  value={payment.cardNumber}
                  onChange={(e) =>
                    setPayment({ ...payment, cardNumber: e.target.value.replace(/\D/g, '') })
                  }
                  maxLength={16}
                  placeholder="•••• •••• •••• ••••"
                  icon={<CreditCard />}
                />
                <div className="grid grid-cols-2 gap-4">
                  <Field
                    label="Expiry (MM/YY)"
                    name="expiry"
                    value={payment.expiry}
                    onChange={(e) =>
                      setPayment({ ...payment, expiry: e.target.value.replace(/\D/g, '') })
                    }
                    maxLength={4}
                    placeholder="MM/YY"
                  />
                  <Field
                    label="CVC"
                    name="cvc"
                    value={payment.cvc}
                    onChange={(e) =>
                      setPayment({ ...payment, cvc: e.target.value.replace(/\D/g, '') })
                    }
                    maxLength={3}
                    placeholder="•••"
                  />
                </div>
                <Field
                  label="Name on card"
                  name="nameOnCard"
                  value={payment.nameOnCard}
                  onChange={(e) => setPayment({ ...payment, nameOnCard: e.target.value })}
                  placeholder="Jane Doe"
                />
                <div className="flex items-start gap-3 p-4 rounded-2xl border border-brand-200 bg-brand-50">
                  <CheckCircle className="w-5 h-5 text-brand-600 mt-0.5 shrink-0" />
                  <p className="text-sm text-brand-700 leading-relaxed">
                    This is a demo storefront. No real charges are processed.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-1 bg-white p-8 rounded-3xl border border-brand-200 shadow-sm">
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-brand-600">Subtotal</span>
                    <span className="font-serif font-bold text-brand-900">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xs text-brand-500">
                    <span>Shipping</span>
                    <span>$0.00</span>
                  </div>
                  <div className="flex justify-between text-xs text-brand-500">
                    <span>Tax (estimated)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between pt-3 border-t border-brand-200 text-2xl font-serif font-bold text-brand-900">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-3xl bg-brand-900 text-white font-serif font-semibold text-lg hover:bg-brand-800 transition-all shadow-glow disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {loading ? 'Placing order...' : 'Place order'}
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Error banner */}
        {error && (
          <div className="mb-6 p-4 rounded-2xl border border-amber-200 bg-amber-50 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
            <p className="text-sm text-amber-800">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  placeholder,
  required,
  icon,
  type = 'text',
  as,
  rows,
  maxLength,
  children,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<any>) => void;
  placeholder?: string;
  required?: boolean;
  icon?: React.ReactNode;
  type?: string;
  as?: 'select' | 'textarea';
  rows?: number;
  maxLength?: number;
  children?: React.ReactNode;
}) {
  const Component = as === 'select' ? 'select' : as === 'textarea' ? 'textarea' : 'input';
  return (
    <div className="space-y-2">
      <label className="flex items-center gap-2 text-sm font-semibold text-brand-700">
        {icon}
        {label}
        {required && <span className="text-brand-500">*</span>}
      </label>
      <Component
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        type={type}
        maxLength={maxLength}
        rows={rows}
        className="w-full rounded-2xl border border-brand-200 bg-white px-4 py-3 text-brand-900 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
      >
        {children}
      </Component>
    </div>
  );
}
