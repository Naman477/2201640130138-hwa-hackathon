import { Clock, PawPrint, Droplets, Moon, Zap, RotateCw } from 'lucide-react';
import { cn } from './ui';

const STEPS = [
  {
    icon: Clock,
    time: '09:00',
    title: 'Morning release',
    body:
      'A distinct acoustic chime sounds — the "hunt" cue. One or two kibble pieces drop into the first puzzle module.',
  },
  {
    icon: PawPrint,
    time: '11:30',
    title: 'Mid‑morning hunt',
    body:
      'The carousel rotates to a new module. Lock‑states shift so the mechanism is never solved twice in a row.',
  },
  {
    icon: Droplets,
    time: '14:00',
    title: 'Scent window',
    body:
      'Refillable scent cartridges cycle airflow (rabbit, sage, mint), firing up olfactory foraging before nap time.',
  },
  {
    icon: Moon,
    time: '17:00',
    title: 'Evening wind‑down',
    body:
      'Final release lands in the wobble chamber, then the unit enters quiet rest mode so your dog sleeps through the night.',
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 border-b border-brand-100 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-[3rem] md:text-[4rem] font-serif font-bold text-brand-900 mb-6 tracking-tight">
            The 8‑Hour Cycle
          </h2>
          <p className="text-brand-600 max-w-2xl mx-auto text-lg">
            Treats release at randomized intervals across the workday — no two cycles are ever the same.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div className="absolute inset-x-0 top-0 bottom-0 w-px bg-brand-100"></div>

          {STEPS.map((step, i) => (
            <div key={i} className="relative mb-24 group">
              <div className="absolute left-1/2 -translate-x-1/2 top-2 w-10 h-10 rounded-full bg-white border-2 border-brand-600 flex items-center justify-center z-10 shadow-premium group-hover:border-brand-900 transition-all duration-300 group-hover:scale-110">
                <step.icon className="w-5 h-5 text-brand-600 group-hover:text-brand-900 transition-colors" />
              </div>

              <div className="flex justify-between items-start">
                <div className="w-1/2 pr-10 text-right">
                  <p className="text-xs font-bold text-brand-500 uppercase tracking-wider mb-2">{step.time}</p>
                  <h3 className="text-xl font-serif font-bold text-brand-900 mb-4">{step.title}</h3>
                </div>
                <div className="w-1/2 pl-10">
                  <p className="text-brand-700 leading-relaxed text-lg font-light">{step.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
