export const DOG_SIZES: Record<string, import('@/lib/types').DogSizeOption> = {
  small: {
    id: 'small',
    name: 'Small / Gentle',
    weightRange: 'Under 25 lb',
    chewStrength: 'Light chewer',
    description:
      'Smaller modules with softer rubber and lighter springs, sized for petite pups and gentle nibblers.',
    material: 'Soft natural rubber + BPA-free nylon',
    price: 129,
    badge: 'Best for puppies',
  },
  medium: {
    id: 'medium',
    name: 'Medium / Standard',
    weightRange: '25–60 lb',
    chewStrength: 'Average chewer',
    description:
      'Balanced resistance across all four puzzle modules — the everyday workday companion.',
    material: 'Durable natural rubber + reinforced nylon',
    price: 149,
    badge: 'Most popular',
  },
  large: {
    id: 'large',
    name: 'Large / Power Chewer',
    weightRange: 'Over 60 lb',
    chewStrength: 'Aggressive chewer',
    description:
      'Heavy-duty nylon modules, reinforced locking mechanisms, and a thicker weighted base.',
    material: 'Extra-tough chew-proof nylon + steel-reinforced base',
    price: 179,
    badge: 'Built to last',
  },
};

export const COLORWAYS: Record<string, import('@/lib/types').ColorwayOption> = {
  sage: {
    id: 'sage',
    name: 'Sage',
    hex: '#5b8765',
    description: 'Soft green that blends into any room.',
  },
  sandstone: {
    id: 'sandstone',
    name: 'Sandstone',
    hex: '#bc946a',
    description: 'Warm neutral tone for modern homes.',
  },
  forest: {
    id: 'forest',
    name: 'Forest',
    hex: '#1b3826',
    description: 'Deep woodland green, hides scuffs best.',
  },
};

export const ADD_ONS: import('@/lib/types').AddOn[] = [
  {
    id: 'scent-pack',
    name: 'Scent Refill Pack',
    tagline: '3 extra natural scent cartridges',
    price: 24,
    originalPrice: 30,
    category: 'scents',
    description:
      'Dried herb and game scents (rabbit, duck, sage, mint) that cycle airflow during active windows.',
    iconName: 'Droplet',
    popular: true,
  },
  {
    id: 'module-pack',
    name: 'Puzzle Module Pack',
    tagline: 'All four interchangeable modules',
    price: 48,
    originalPrice: 60,
    category: 'hardware',
    description:
      'Slide-bolt, rotating dial, weighted wobble chamber, and scent-snuffle tray — rotate lock-states every session.',
    iconName: 'Settings',
  },
  {
    id: 'treat-pack',
    name: 'Dehydrated Treat Starter Pack',
    tagline: '3 bags of single-ingredient treats',
    price: 18,
    originalPrice: 24,
    category: 'treats',
    description: 'Chicken, salmon, and beef treats sized for the micro-release carousel.',
    iconName: 'Bone',
  },
];

export const SHIPPING_COST = 0;
export const TAX_RATE = 0.08;

export const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/configurator', label: 'Configure' },
  { href: '/#how-it-works', label: 'How It Works' },
  { href: '/#hardware', label: 'Hardware' },
  { href: '/#comparison', label: 'Comparison' },
  { href: '/#faq', label: 'FAQ' },
  { href: '/#reviews', label: 'Reviews' },
];
