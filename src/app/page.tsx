import { Hero } from '@/components/hero';
import { CanineCalibrator } from '@/components/canine-calibrator';
import { HowItWorks } from '@/components/how-it-works';
import { HardwareBreakdown } from '@/components/hardware-breakdown';
import { ComparisonTable } from '@/components/comparison-table';
import { Reviews } from '@/components/reviews';
import { FAQ } from '@/components/faq';

export default function Home() {
  return (
    <>
      <Hero />
      <CanineCalibrator />
      <HowItWorks />
      <HardwareBreakdown />
      <ComparisonTable />
      <Reviews />
      <FAQ />
    </>
  );
}
