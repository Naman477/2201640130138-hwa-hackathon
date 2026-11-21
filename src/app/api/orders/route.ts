import { NextRequest, NextResponse } from 'next/server';
import { saveOrder, getOrderById, getAllOrders } from '@/lib/orders';
import { Order, OrderItemSummary, ShippingDetails } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      shippingDetails,
      items,
      subtotal,
      shippingCost = 0,
      discount = 0,
      tax = 0,
      total,
      paymentMethod = { type: 'credit_card', last4: '4242', cardBrand: 'Visa' },
    } = body;

    // Validation
    if (!shippingDetails || typeof shippingDetails !== 'object') {
      return NextResponse.json(
        { success: false, error: 'Missing shippingDetails object' },
        { status: 400 }
      );
    }

    const { fullName, email, address, city, postalCode } = shippingDetails as ShippingDetails;
    if (!fullName?.trim() || !email?.trim() || !address?.trim() || !city?.trim() || !postalCode?.trim()) {
      return NextResponse.json(
        {
          success: false,
          error: 'Please fill in all required shipping fields (Name, Email, Address, City, Postal Code)',
        },
        { status: 400 }
      );
    }

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Order must contain at least one item' },
        { status: 400 }
      );
    }

    // Generate readable ScentLoop Order ID (SL- + 6 digits)
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    const orderId = `SL-${randomNum}`;

    // Estimated delivery in 3 business days
    const estDeliveryDate = new Date();
    estDeliveryDate.setDate(estDeliveryDate.getDate() + 4);
    const estDeliveryFormatted = estDeliveryDate.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });

    const trackingNumber = `TRK-${Math.floor(10000000 + Math.random() * 90000000)}`;

    const newOrder: Order = {
      id: orderId,
      createdAt: new Date().toISOString(),
      status: 'confirmed',
      shippingDetails: {
        dogName: shippingDetails.dogName || 'Your Good Dog',
        dogBreed: shippingDetails.dogBreed || 'Companion',
        fullName: shippingDetails.fullName.trim(),
        email: shippingDetails.email.trim(),
        phone: shippingDetails.phone || '',
        address: shippingDetails.address.trim(),
        apartment: shippingDetails.apartment || '',
        city: shippingDetails.city.trim(),
        state: shippingDetails.state || '',
        postalCode: shippingDetails.postalCode.trim(),
        country: shippingDetails.country || 'United States',
        deliveryNotes: shippingDetails.deliveryNotes || '',
      },
      items: items.map((item: OrderItemSummary) => ({
        name: item.name,
        quantity: Number(item.quantity) || 1,
        unitPrice: Number(item.unitPrice) || 0,
        totalPrice: Number(item.totalPrice) || Number(item.unitPrice) || 0,
        details: item.details || '',
      })),
      subtotal: Number(subtotal) || 0,
      shippingCost: Number(shippingCost) || 0,
      discount: Number(discount) || 0,
      tax: Number(tax) || 0,
      total: Number(total) || (Number(subtotal) - Number(discount) + Number(shippingCost) + Number(tax)),
      paymentMethod: {
        type: paymentMethod.type || 'credit_card',
        last4: paymentMethod.last4 || '4242',
        cardBrand: paymentMethod.cardBrand || 'Visa',
      },
      estimatedDelivery: estDeliveryFormatted,
      trackingNumber,
    };

    saveOrder(newOrder);

    return NextResponse.json(
      {
        success: true,
        orderId: newOrder.id,
        order: newOrder,
        message: 'Order created successfully! ScentLoop micro-enrichment unit is being prepared.',
      },
      { status: 201 }
    );
  } catch (err: unknown) {
    console.error('Error processing order:', err);
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : 'Internal server error processing order' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get('id');

    if (orderId) {
      const order = getOrderById(orderId);
      if (!order) {
        return NextResponse.json(
          { success: false, error: `Order with ID ${orderId} not found` },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, order });
    }

    const all = getAllOrders();
    return NextResponse.json({
      success: true,
      count: all.length,
      orders: all.slice(0, 15),
    });
  } catch (err: unknown) {
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : 'Error fetching orders' },
      { status: 500 }
    );
  }
}
