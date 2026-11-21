import { cn } from '@/components/ui';

const ROWS = [
  {
    feature: 'Time a dog stays engaged',
    scentloop: 'All day (8 hr)',
    puzzle: '~3 min',
    camera: '~15 min',
  },
  {
    feature: 'Treat portion control',
    scentloop: '1–2 pieces per release',
    puzzle: 'All at once',
    camera: 'Easy to overfeed',
  },
  {
    feature: 'Novelty wears off',
    scentloop: 'Rotating lock‑states',
    puzzle: 'Solved once, done',
    camera: 'Dog ignores it',
  },
  {
    feature: 'Mental fatigue',
    scentloop: 'Olfactory + mechanical',
    puzzle: 'Mechanical only',
    camera: 'Visual only',
  },
  {
    feature: 'Camera / app subscription',
    scentloop: 'None',
    puzzle: 'None',
    camera: 'Monthly fee',
  },
  {
    feature: 'Chew‑proof construction',
    scentloop: 'Yes',
    puzzle: 'Often no',
    camera: 'No',
  },
];

export function ComparisonTable() {
  return (
    <section id="comparison" className="py-24 border-b border-brand-100 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-[3rem] md:text-[4rem] font-serif font-bold text-brand-900 mb-6 tracking-tight">
            Not just another puzzle toy
          </h2>
          <p className="text-brand-600 max-w-2xl mx-auto text-lg">
            How ScentLoop compares to standard options.
          </p>
        </div>

        <div className="overflow-x-auto rounded-3xl border border-brand-100 shadow-soft">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-brand-50 border-b border-brand-200">
                <th className="p-6 font-serif font-bold text-brand-900 uppercase tracking-wider text-sm">Feature</th>
                <th className="p-6 font-serif font-bold text-brand-900 bg-brand-100 border-b border-brand-200 uppercase tracking-wider text-sm">ScentLoop™</th>
                <th className="p-6 font-serif font-bold text-brand-900 uppercase tracking-wider text-sm">Standard puzzle toy</th>
                <th className="p-6 font-serif font-bold text-brand-900 uppercase tracking-wider text-sm">Treat camera</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row, i) => (
                <tr
                  key={row.feature}
                  className={cn(
                    'border-b border-brand-100 hover:bg-brand-50/50 transition-colors group',
                    i % 2 === 0 && 'bg-brand-50/30'
                  )}
                >
                  <td className="p-6 font-medium text-brand-700">{row.feature}</td>
                  <td className="p-6 text-brand-900 font-medium">{row.scentloop}</td>
                  <td className="p-6 text-brand-500">{row.puzzle}</td>
                  <td className="p-6 text-brand-500">{row.camera}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
