'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import type { AddOn, CartItem, Colorway, DogSize } from '@/lib/types';
import { DOG_SIZES, COLORWAYS } from '@/lib/data';

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'id' | 'quantity'> & { quantity?: number }) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clear: () => void;
  itemCount: number;
  subtotal: number;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  openCart: () => void;
  closeCart: () => void;
  isCartOpen: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('scentloop-cart');
      if (saved) setItems(JSON.parse(saved));
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('scentloop-cart', JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items]);

  const addItem = useCallback(
    (item: Omit<CartItem, 'id' | 'quantity'> & { quantity?: number }) => {
      setItems((prev) => {
        const existing = prev.find(
          (i) =>
            i.type === item.type &&
            i.name === item.name &&
            i.dogSize === item.dogSize &&
            i.colorway === item.colorway &&
            i.addOnId === item.addOnId
        );
        if (existing) {
          return prev.map((i) =>
            i.id === existing.id ? { ...i, quantity: i.quantity + (item.quantity ?? 1) } : i
          );
        }
        return [
          ...prev,
          { ...item, id: crypto.randomUUID(), quantity: item.quantity ?? 1 },
        ];
      });
    },
    []
  );

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((i) => i.id !== id));
      return;
    }
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity } : i)));
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        updateQuantity,
        removeItem,
        clear,
        itemCount,
        subtotal,
        isOpen,
        setIsOpen,
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
        isCartOpen: isOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within a CartProvider');
  return ctx;
}

export function buildMainUnitItem(dogSize: DogSize, colorway: Colorway): CartItem {
  const size = DOG_SIZES[dogSize];
  return {
    id: `scentloop-${dogSize}-${colorway}`,
    type: 'main_unit',
    name: `ScentLoop™ Base Unit — ${size.name}`,
    price: size.price,
    quantity: 1,
    dogSize,
    colorway,
    details: `${size.description} Colorway: ${COLORWAYS[colorway].name}.`,
  };
}

export function buildAddOnItem(addOn: AddOn): CartItem {
  return {
    id: addOn.id,
    type: 'addon',
    name: addOn.name,
    price: addOn.price,
    quantity: 1,
    addOnId: addOn.id,
    details: addOn.description,
  };
}
