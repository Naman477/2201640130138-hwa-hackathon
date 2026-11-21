import { Clock, PawPrint, Droplets, Moon, Zap, RotateCw } from 'lucide-react';

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
    <section id="how-it-works" className="py-20 border-b border-brand-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-serif font-bold text-brand-900 mb-4">The 8‑Hour Cycle</h2>
          <p className="text-brand-600 max-w-2xl mx-auto">
            Treats release at randomized intervals across the workday — no two cycles are the same.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-brand-200"></div>

          {STEPS.map((step, i) => (
            <div key={i} className="relative mb-20 group">
              <div className="absolute left-1/2 -translate-x-1/2 top-2 w-8 h-8 rounded-full bg-white border-2 border-brand-600 flex items-center justify-center z-10 group-hover:border-brand-900 transition-colors">
                <step.icon className="w-4 h-4 text-brand-600 group-hover:text-brand-900" />
              </div>

              <div className="flex justify-between">
                <div className="w-1/2 pr-8 text-right">
                  <p className="text-xs font-bold text-brand-500 uppercase tracking-wider">{step.time}</p>
                  <h3 className="text-lg font-bold text-brand-900">{step.title}</h3>
                </div>
                <div className="w-1/2 pl-8">
                  <p className="text-brand-700 leading-relaxed">{step.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
