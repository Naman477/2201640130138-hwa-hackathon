import { NextResponse } from 'next/server';

type OrderItem = {
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  details?: string;
};

type ShippingDetails = {
  dogName?: string;
  dogBreed?: string;
  fullName: string;
  email: string;
  phone?: string;
  address: string;
  apartment?: string;
  city: string;
  state: string;
  postalCode: string;
  country?: string;
  deliveryNotes?: string;
};

type PaymentMethod = {
  type?: string;
  last4?: string;
  cardBrand?: string;
};

type OrderPayload = {
  shippingDetails: ShippingDetails;
  items: OrderItem[];
  subtotal: number;
  shippingCost?: number;
  tax?: number;
  total: number;
  paymentMethod?: PaymentMethod;
};

type StoredOrder = {
  id: string;
  createdAt: string;
  status: 'confirmed';
  shippingDetails: ShippingDetails;
  items: OrderItem[];
  subtotal: number;
  shippingCost: number;
  tax: number;
  total: number;
  paymentMethod: PaymentMethod;
  estimatedDelivery: string;
  trackingNumber: string;
};

// In-memory store (persists for the life of the server instance).
const orders: StoredOrder[] = [];

function generateId() {
  return 'SL-' + Math.random().toString(36).slice(2, 10).toUpperCase();
}

function addDays(date: Date, days: number) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d.toISOString();
}

function validate(payload: unknown): { ok: true; order: OrderPayload } | { ok: false; error: string } {
  const p = payload as OrderPayload;
  if (!p || typeof p !== 'object') {
    return { ok: false, error: 'Invalid request body.' };
  }
  const { shippingDetails, items, subtotal, total } = p;
  if (!shippingDetails || typeof shippingDetails !== 'object') {
    return { ok: false, error: 'shippingDetails is required.' };
  }
  const { fullName, email, address, city, state, postalCode } = shippingDetails;
  if (!fullName || !email || !address || !city || !state || !postalCode) {
    return { ok: false, error: 'Missing required shipping fields.' };
  }
  if (!Array.isArray(items) || items.length === 0) {
    return { ok: false, error: 'At least one item is required.' };
  }
  for (const item of items) {
    if (!item.name || typeof item.quantity !== 'number' || typeof item.unitPrice !== 'number') {
      return { ok: false, error: 'Invalid item payload.' };
    }
  }
  if (typeof subtotal !== 'number' || typeof total !== 'number') {
    return { ok: false, error: 'Missing order totals.' };
  }
  return { ok: true, order: p };
}

export async function POST(req: Request) {
  let payload: OrderPayload;
  try {
    payload = (await req.json()) as OrderPayload;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON.' }, { status: 400 });
  }

  const result = validate(payload);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  const { order } = result;
  const now = new Date();
  const id = generateId();
  const stored: StoredOrder = {
    id,
    createdAt: now.toISOString(),
    status: 'confirmed',
    shippingDetails: order.shippingDetails,
    items: order.items,
    subtotal: order.subtotal,
    shippingCost: order.shippingCost ?? 0,
    tax: order.tax ?? 0,
    total: order.total,
    paymentMethod: order.paymentMethod ?? { type: 'card', last4: '0000', cardBrand: 'Visa' },
    estimatedDelivery: addDays(now, 4),
    trackingNumber: `SL${Math.floor(100000 + Math.random() * 900000)}`,
  };

  orders.push(stored);

  return NextResponse.json({ order: stored }, { status: 201 });
}

export async function GET() {
  return NextResponse.json({ orders, count: orders.length });
}
