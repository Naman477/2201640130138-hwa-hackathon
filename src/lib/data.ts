export const DOG_SIZES: Record<string, import('@/lib/types').DogSizeOption> = {
  small: {
    id: 'small',
    name: 'Small / Gentle',
    weightRange: 'Under 12 kg (Indie Pup, Shih Tzu, Beagle, Frenchie)',
    chewStrength: 'Light to moderate chewer',
    description:
      'Smaller food-grade rubber modules with lighter spring resistance, calibrated for apartment pets and gentle foragers.',
    material: 'Soft natural vulcanized rubber + BPA-free nylon',
    price: 4999,
    badge: 'Best for Small Breeds',
  },
  medium: {
    id: 'medium',
    name: 'Medium / Standard',
    weightRange: '12–28 kg (Adult Indie, Golden Retriever, Cocker Spaniel)',
    chewStrength: 'Standard chewer',
    description:
      'Balanced dual-stage resistance across all 4 puzzle modules — the ideal companion for Indian workday routines.',
    material: 'Durable vulcanized natural rubber + reinforced nylon',
    price: 5499,
    badge: 'Most Popular across India',
  },
  large: {
    id: 'large',
    name: 'Large / Power Chewer',
    weightRange: 'Over 28 kg (Labrador, German Shepherd, Rottweiler)',
    chewStrength: 'Aggressive / heavy chewer',
    description:
      'Ballistic DuPont™ Zytel nylon armored modules, reinforced locking pins, and extra-weighted 4.2 kg cast base.',
    material: 'Extra-tough chew-proof ballistic nylon + steel-weighted base',
    price: 5999,
    badge: 'Chew-Proof Warranty',
  },
};

export const COLORWAYS: Record<string, import('@/lib/types').ColorwayOption> = {
  sage: {
    id: 'sage',
    name: 'Kerala Sage',
    hex: '#5b8765',
    description: 'Calming botanical green that complements modern Indian apartment aesthetics.',
  },
  sandstone: {
    id: 'sandstone',
    name: 'Jaipur Sandstone',
    hex: '#bc946a',
    description: 'Warm terracotta-cream tone inspired by heritage sandstone architecture.',
  },
  forest: {
    id: 'forest',
    name: 'Nilgiri Forest',
    hex: '#1b3826',
    description: 'Deep woodland green with copper accents that gracefully masks dust and scuffs.',
  },
};

export const ADD_ONS: import('@/lib/types').AddOn[] = [
  {
    id: 'scent-pack',
    name: 'Natural Botanic & Game Scent Refill Pack',
    tagline: '3 refill cartridges (Wild Duck, Meadow Thyme & Chamomile)',
    price: 699,
    originalPrice: 999,
    category: 'scents',
    description:
      '100% natural dried culinary herbs and wild game essence that gently cycle airflow during active sessions to trigger olfactory exhaustion.',
    iconName: 'Droplet',
    popular: true,
  },
  {
    id: 'module-pack',
    name: 'Interchangeable 4-Module Expansion Kit',
    tagline: 'Slide-bolt, rotating dial, wobble chamber & snuffle tray',
    price: 1299,
    originalPrice: 1799,
    category: 'hardware',
    description:
      'Full backup set of all 4 chew-proof modules so you can wash one set in the dishwasher while the other stays in rotation.',
    iconName: 'Settings',
  },
  {
    id: 'treat-pack',
    name: 'Single-Ingredient Freeze-Dried Training Morsels (200g)',
    tagline: 'Wild Buff & Himalayan Trout crunch cubes',
    price: 599,
    originalPrice: 799,
    category: 'treats',
    description:
      'High-protein, grain-free micro-cubes precisely sized at 8mm for zero-jam automated dispensing across workday cycles.',
    iconName: 'Bone',
  },
];

export const SHIPPING_COST = 0; // Free Pan-India Delivery on all ScentLoop kits
export const TAX_RATE = 0.05; // 5% GST

export const NAV_LINKS = [
  { href: '/#calibrator', label: 'Breed Calibrator' },
  { href: '/#how-it-works', label: '8-Hr Cycle' },
  { href: '/#hardware', label: 'Hardware' },
  { href: '/#comparison', label: 'Why ScentLoop' },
  { href: '/#reviews', label: 'Reviews' },
  { href: '/#faq', label: 'FAQ' },
];
