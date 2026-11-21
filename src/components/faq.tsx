const FAQS = [
  {
    q: 'How long does one unit last on a full treat load?',
    a:
      'With micro‑releases of 1–2 pieces every 45–90 minutes across an 8‑hour day, a standard fill lasts roughly a full workday. Refill as needed.',
  },
  {
    q: 'Is it safe for power chewers?',
    a:
      'Yes. The Large / Power Chewer configuration uses extra‑tough nylon modules and a steel‑reinforced weighted base, all chew‑proof and tip‑proof.',
  },
  {
    q: 'Do I need an app or a subscription?',
    a:
      'No. ScentLoop works offline out of the box — no camera, no app, no monthly fee, and nothing to charge daily.',
  },
  {
    q: 'Are the parts dishwasher safe?',
    a:
      'Yes. All food‑grade parts that contact treats are dishwasher safe; the base wipes clean.',
  },
  {
    q: 'Can I use my own treats?',
    a:
      'Yes. The carousel accepts standard kibble and most dehydrated treats sized for small release. We also offer a starter treat pack.',
  },
  {
    q: 'How do scent cartridges work?',
    a:
      'Refillable cartridges cycle dried herb and game scents through airflow during active windows to stimulate olfactory foraging.',
  },
];

export function FAQ() {
  return (
    <section id="faq" className="py-20 border-b border-brand-200 bg-brand-50">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif font-bold text-brand-900 mb-4">Frequently asked questions</h2>
        </div>
        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <div key={i} className="border border-brand-200 rounded-xl overflow-hidden transition-colors hover:border-brand-400">
              <button className="w-full flex items-center justify-between px-6 py-4 bg-brand-50 text-brand-900 font-semibold text-left focus:outline-none">
                {faq.q}
                <span className="w-5 h-5 text-brand-500">+</span>
              </button>
              <div className="px-6 pb-4 text-brand-600 text-sm leading-relaxed">
                {faq.a}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
