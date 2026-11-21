const MODULES = [
  {
    name: 'Slide‑bolt',
    body: 'Treat slides behind a bolt the dog must nose aside — builds persistence.',
    icon: '⬌',
  },
  {
    name: 'Rotating dial',
    body: 'Spin the dial to align the treat chamber — a rotating memory challenge.',
    icon: '🔄',
  },
  {
    name: 'Weighted wobble',
    body: 'The chamber wobbles as the dog works it, releasing kibble gradually.',
    icon: '⚖️',
  },
  {
    name: 'Scent‑snuffle tray',
    body: 'Hide treats in textured ridges for pure olfactory foraging.',
    icon: '👃',
  },
];

export function HardwareBreakdown() {
  return (
    <section id="hardware" className="py-20 border-b border-brand-200 bg-brand-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-serif font-bold text-brand-900 mb-4">Four interchangeable modules</h2>
          <p className="text-brand-600 max-w-2xl mx-auto">
            Each release drops the treat into a different module. Lock‑states rotate between sessions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {MODULES.map((m) => (
            <div key={m.name} className="p-6 rounded-2xl border border-brand-200 bg-white hover:border-brand-400 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-brand-100 flex items-center justify-center text-brand-600 text-2xl mb-4">
                {m.icon}
              </div>
              <h3 className="font-bold text-brand-900 mb-2">{m.name}</h3>
              <p className="text-sm text-brand-600 leading-relaxed">{m.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col lg:flex-row gap-8 items-center">
          <div className="lg:w-1/2">
            <h3 className="text-2xl font-serif font-bold text-brand-900 mb-3">Chew‑proof, tip‑proof base</h3>
            <ul className="space-y-3 text-brand-700 text-sm">
              <li className="flex items-start gap-3">
                <span className="text-brand-600 mt-0.5">✓</span>
                Weighted low‑center‑of‑gravity base resists tipping.
              </li>
              <li className="flex items-start gap-3">
                <span className="text-brand-600 mt-0.5">✓</span>
                Suction / non‑slip feet stay put on hard floors.
              </li>
              <li className="flex items-start gap-3">
                <span className="text-brand-600 mt-0.5">✓</span>
                Dishwasher‑safe food‑grade parts.
              </li>
              <li className="flex items-start gap-3">
                <span className="text-brand-600 mt-0.5">✓</span>
                Sealed internal carousel keeps treats fresh.
              </li>
            </ul>
          </div>
          <div className="lg:w-1/2 bg-brand-900 p-8 rounded-2xl text-white">
            <h4 className="font-bold text-amber-200 mb-4">No subscriptions. No screens.</h4>
            <p className="text-sage-200 text-sm mb-6 leading-relaxed">
              Just the unit, its scent cartridges, and your dog's nose. Nothing to break, nothing to
              recharge daily, nothing to pay monthly.
            </p>
            <div className="flex items-center gap-2 text-sm font-medium text-brand-100">
              <span className="w-2 h-2 rounded-full bg-sage-400"></span>
              Works offline, out of the box
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
