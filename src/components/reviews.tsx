const REVIEWS = [
  {
    name: 'Maya R.',
    dog: 'Luna, Border Collie (35 lb)',
    stars: 5,
    text:
      'Finally something that outlasts the workday. Luna used to destroy puzzle toys in minutes; now she hunts all day and naps by 5.',
    location: 'Portland, OR',
  },
  {
    name: 'Diego T.',
    dog: 'Bruno, Labrador (75 lb)',
    stars: 5,
    text:
      'Power chewer approved. The Large base is solid, the modules actually rotate, and he’s genuinely tired by dinner.',
    location: 'Austin, TX',
  },
  {
    name: 'Priya S.',
    dog: 'Milo, French Bulldog (24 lb)',
    stars: 4,
    text:
      'Cute, quiet, and the scent cartridges are a nice touch. Setup took two minutes. Milo loves the wobble chamber.',
    location: 'Seattle, WA',
  },
];

export function Reviews() {
  return (
    <section id="reviews" className="py-20 border-b border-brand-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-serif font-bold text-brand-900 mb-4">What dogs (and owners) say</h2>
          <p className="text-brand-600 max-w-2xl mx-auto">Real reviews from real workdays.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((r) => (
            <div key={r.name} className="p-6 rounded-2xl border border-brand-200 bg-brand-50 flex flex-col">
              <div className="flex items-center gap-1 text-amber-500 mb-3">
                {[...Array(r.stars)].map((_, i) => (
                  <span key={i} className="text-xs" aria-hidden="true">
                    ★
                  </span>
                ))}
              </div>
              <p className="text-brand-700 text-sm leading-relaxed mb-4 italic">
                "{r.text}"
              </p>
              <div className="mt-auto pt-4 border-t border-brand-200">
                <p className="font-semibold text-brand-900 text-sm">{r.name}</p>
                <p className="text-xs text-brand-500">{r.dog}</p>
                <p className="text-xs text-brand-400">{r.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
