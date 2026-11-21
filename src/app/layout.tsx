import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/lib/cartStore';
import { Header } from '@/components/header';
import { CartDrawer } from '@/components/cart-drawer';

export const metadata: Metadata = {
  title: 'ScentLoop™ — Autonomous Multi-Stage Canine Foraging & Enrichment System',
  description:
    "ScentLoop releases treats at randomized intervals across an 8‑hour workday, rotating chew‑proof puzzle modules and cycling natural scents so your dog hunts, thinks, and sleeps while you're away.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-brand-50 text-brand-900 antialiased selection:bg-amber-200 selection:text-brand-950">
        <CartProvider>
          <Header />
          <CartDrawer />
          <main className="flex-1">{children}</main>
        </CartProvider>
      </body>
    </html>
  );
}
