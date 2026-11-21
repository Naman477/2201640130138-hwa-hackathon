'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/lib/cartStore';
import { ShoppingCart, Menu, X, Mail, Phone } from 'lucide-react';
import { cn } from './ui';
import { NAV_LINKS } from '@/lib/data';

export function Header() {
  const pathname = usePathname();
  const { itemCount, setIsOpen } = useCart();

  return (
    <header className="sticky top-0 z-50">
      <div className="absolute inset-0 w-full pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-400/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute top-0 right-1/2 translate-x-1/2 w-[500px] h-[250px] bg-sage-400/10 rounded-full blur-[100px] pointer-events-none"></div>
      </div>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={cn(
            'flex h-18 items-center justify-between',
            pathname === '/' ? 'pb-2' : ''
          )}
        >
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-2xl bg-gradient-brand flex items-center justify-center text-white font-bold text-lg shadow-glow group-hover:scale-105 transition-transform duration-300">
              SL
            </div>
            <span className="font-serif text-2xl font-bold text-brand-900 tracking-tight">ScentLoop</span>
          </Link>

          <nav className="hidden md:flex gap-7 text-sm font-medium text-brand-600">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'transition-all duration-300 hover:text-brand-900 relative',
                  pathname === link.href ? 'text-brand-900 font-semibold' : ''
                )}
              >
                {link.label}
                {pathname === link.href && (
                  <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-brand-600 rounded-full animate-pulse" />
                )}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/configurator"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-900 text-white font-bold text-xs shadow-sm hover:bg-brand-800 transition-all active:scale-95"
            >
              <span>Build Kit</span>
              <span className="text-amber-400">|</span>
              <span className="text-amber-300 font-mono">₹4,999</span>
            </Link>

            <button
              onClick={() => setIsOpen(true)}
              className="relative p-2.5 text-brand-600 hover:text-brand-900 transition-colors group"
              aria-label="Open Cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-amber-500 ring-2 ring-brand-50 group-hover:ring-brand-600"></span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
