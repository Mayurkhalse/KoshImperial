import React from 'react';
import { Star } from 'lucide-react';

export const EditorialPress = () => {
  const reviews = [
    {
      quote:
        'A breathtaking marriage of generational Indian leatherwork and regenerative botanical science. The seed-paper lining is nothing short of pure poetry.',
      publication: 'VOGUE LIVING',
      edition: 'Special Design Issue',
    },
    {
      quote:
        'Kosh Imperial redefines quiet luxury by making decomposition the ultimate status symbol. It ages with pure distinction.',
      publication: 'CONSCIOUS DESIGN',
      edition: 'Global Innovation Award',
    },
    {
      quote:
        'The tactile suppleness of vintage Tuscan leather, yet grown quietly from arid nopal cactus pads with zero animal harm.',
      publication: 'ARCHITECTURAL DIGEST',
      edition: 'Material Discoveries',
    },
  ];

  return (
    <section className="py-20 md:py-24 bg-[#F5F2E6] border-b border-driftwood-300">
      <div className="max-w-container mx-auto px-4 md:px-8">
        <div className="text-center mb-14 space-y-2">
          <div className="flex items-center justify-center gap-1 text-warning mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-warning" />
            ))}
          </div>
          <span className="text-[11px] uppercase tracking-[0.25em] font-sans font-semibold text-mahogany-base block">
            CRITICAL ACCLAIM & PRESS
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-evergreen-700 font-normal">
            Recognized by purveyors of <span className="italic font-serif text-mahogany-base">conscious refinement.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="p-8 rounded-xl bg-milkglass-100 border border-driftwood-300/80 shadow-luxury flex flex-col justify-between"
            >
              <p className="font-serif text-base sm:text-lg text-charcoal/90 leading-relaxed italic mb-6">
                "{rev.quote}"
              </p>

              <div className="pt-4 border-t border-driftwood-300/60">
                <span className="font-mono text-xs uppercase tracking-widest font-bold text-evergreen-700 block">
                  {rev.publication}
                </span>
                <span className="text-[11px] text-muted-brown font-sans">
                  {rev.edition}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
