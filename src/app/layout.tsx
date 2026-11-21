import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { CartProvider } from '@/lib/cartStore';
import { Header } from '@/components/header';
import { CartDrawer } from '@/components/cart-drawer';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'ScentLoop™ — Autonomous Foraging System for Dogs',
  description:
    'ScentLoop releases treats at randomized intervals across an 8‑hour workday, rotating chew‑proof puzzle modules and cycling natural scents so your dog hunts, thinks, and sleeps while you\'re away.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-brand-50 text-brand-900 antialiased">
        <CartProvider>
          <Header />
          <CartDrawer />
          <main>{children}</main>
        </CartProvider>
      </body>
    </html>
  );
}
