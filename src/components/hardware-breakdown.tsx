const MODULES = [
  {
    name: 'Slide‑bolt',
    body: 'Treat slides behind a bolt the dog must nose aside — builds persistence.',
    icon: '⬌',
    color: 'from-brand-100 to-brand-200',
    text: 'text-brand-600',
  },
  {
    name: 'Rotating dial',
    body: 'Spin the dial to align the treat chamber — a rotating memory challenge.',
    icon: '🔄',
    color: 'from-sage-100 to-sage-200',
    text: 'text-sage-600',
  },
  {
    name: 'Weighted wobble',
    body: 'The chamber wobbles as the dog works it, releasing kibble gradually.',
    icon: '⚖️',
    color: 'from-forest-900/20 to-forest-900/40',
    text: 'text-forest-900',
  },
  {
    name: 'Scent‑snuffle tray',
    body: 'Hide treats in textured ridges for pure olfactory foraging.',
    icon: '👃',
    color: 'from-amber-100 to-amber-200',
    text: 'text-amber-600',
  },
];

export function HardwareBreakdown() {
  return (
    <section id="hardware" className="py-24 border-b border-brand-100 bg-gradient-cream">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-[3rem] md:text-[4rem] font-serif font-bold text-brand-900 mb-6 tracking-tight">
            Four interchangeable modules
          </h2>
          <p className="text-brand-600 max-w-2xl mx-auto text-lg">
            Each release drops the treat into a different module. Lock‑states rotate between sessions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {MODULES.map((m) => (
            <div
              key={m.name}
              className="p-8 rounded-3xl border border-brand-100 bg-white hover:border-brand-300 hover:shadow-premium transition-all duration-300 group flex flex-col items-center text-center"
            >
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-300" style={{ background: m.color }}>
                <span>{m.icon}</span>
              </div>
              <h3 className="font-serif font-bold text-brand-900 mb-3 text-lg">{m.name}</h3>
              <p className="text-brand-600 text-sm leading-relaxed">{m.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-20 flex flex-col lg:flex-row gap-12 items-center">
          <div className="lg:w-1/2">
            <h3 className="text-3xl font-serif font-bold text-brand-900 mb-6">Chew‑proof, tip‑proof base</h3>
            <div className="space-y-5">
              {['Weighted low‑center‑of‑gravity base resists tipping.', 'Suction / non‑slip feet stay put on hard floors.', 'Dishwasher‑safe food‑grade parts.', 'Sealed internal carousel keeps treats fresh.'].map((feature, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-brand-50 flex items-center justify-center text-brand-600 font-bold text-xs mt-0.5 shrink-0">
                    ✓
                  </div>
                  <p className="text-brand-700 leading-relaxed">{feature}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:w-1/2 bg-gradient-brand p-10 rounded-3xl text-white shadow-glow relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-brand-700/30 rounded-full blur-[80px] -mt-10 -mr-10"></div>
            <h4 className="font-serif font-bold text-amber-100 mb-4 text-xl">No subscriptions. No screens.</h4>
            <p className="text-brand-100 text-sm leading-relaxed mb-8">
              Just the unit, its scent cartridges, and your dog's nose. Nothing to break, nothing to
              recharge daily, nothing to pay monthly.
            </p>
            <div className="flex items-center gap-3 text-sm font-medium text-brand-200">
              <span className="w-2 h-2 rounded-full bg-sage-400"></span>
              Works offline, out of the box
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
