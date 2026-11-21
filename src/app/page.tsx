import { Hero } from '@/components/hero';
import { HowItWorks } from '@/components/how-it-works';
import { HardwareBreakdown } from '@/components/hardware-breakdown';
import { ComparisonTable } from '@/components/comparison-table';
import { FAQ } from '@/components/faq';
import { Reviews } from '@/components/reviews';

export default function Home() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <HardwareBreakdown />
      <ComparisonTable />
      <FAQ />
      <Reviews />
    </>
  );
}
