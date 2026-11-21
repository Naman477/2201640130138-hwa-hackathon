export type DogSize = 'small' | 'medium' | 'large';

export interface DogSizeOption {
  id: DogSize;
  name: string;
  weightRange: string;
  chewStrength: string;
  description: string;
  material: string;
  price: number;
  badge?: string;
}

export type Colorway = 'sage' | 'sandstone' | 'forest';

export interface ColorwayOption {
  id: Colorway;
  name: string;
  hex: string;
  description: string;
}

export interface AddOn {
  id: string;
  name: string;
  tagline: string;
  price: number;
  originalPrice: number;
  category: 'scents' | 'hardware' | 'treats';
  description: string;
  iconName: string;
  popular?: boolean;
}

export interface CartItem {
  id: string;
  type: 'main_unit' | 'addon';
  name: string;
  price: number;
  quantity: number;
  dogSize?: DogSize;
  colorway?: Colorway;
  chewStrength?: string;
  addOnId?: string;
  details?: string;
}

export interface ShippingDetails {
  dogName: string;
  dogBreed: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  apartment?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  deliveryNotes?: string;
}

export interface OrderItemSummary {
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  details?: string;
}

export interface Order {
  id: string;
  createdAt: string;
  status: 'confirmed' | 'processing' | 'shipped';
  shippingDetails: ShippingDetails;
  items: OrderItemSummary[];
  subtotal: number;
  shippingCost: number;
  discount: number;
  tax: number;
  total: number;
  paymentMethod: {
    type: string;
    last4: string;
    cardBrand: string;
  };
  estimatedDelivery: string;
  trackingNumber: string;
}
