'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/lib/cartStore';
import { ShoppingCart, Menu, X, Mail, Phone, Clock } from 'lucide-react';
import { cn } from './ui';
import { NAV_LINKS } from '@/lib/data';

export function Header() {
  const pathname = usePathname();
  const { itemCount, subtotal, setIsOpen } = useCart();

  return (
    <header className="sticky top-0 z-50 border-b border-brand-200 bg-brand-50/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-brand-600 flex items-center justify-center text-white font-bold text-xs">
              SL
            </div>
            <span className="font-serif text-xl font-bold text-brand-900 tracking-tight">ScentLoop</span>
          </Link>

          <nav className="hidden md:flex gap-8 text-sm font-medium text-brand-700">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'transition-colors hover:text-brand-900',
                  pathname === link.href ? 'text-brand-900 font-semibold' : ''
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsOpen(true)}
              className="relative p-2 text-brand-700 hover:text-brand-900 transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-amber-500 ring-2 ring-brand-50"></span>
              )}
            </button>
            <button className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full border border-brand-300 bg-brand-600 text-white text-xs font-semibold hover:bg-brand-700 transition-colors">
              <Clock className="w-3 h-3" />
              8‑hr cycle
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
