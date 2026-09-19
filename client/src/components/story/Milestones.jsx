import React from 'react';
import { SectionHeading } from '../shared/SectionHeading.jsx';

export const Milestones = () => {
  const milestones = [
    {
      year: '2023',
      title: 'The Seed Paper Innovation',
      desc: 'Developed our proprietary flex-tested seed interlining capable of withstanding 100,000 pocket bends without premature germination.',
    },
    {
      year: '2024',
      title: 'First Collection Debut',
      desc: 'Launched The Evergreen Bi-Fold and The Sprout Cardholder, completely selling out the inaugural 500-piece artisan batch.',
    },
    {
      year: '2025',
      title: 'Circular Restoration Metric',
      desc: 'Surpassed 10,000 plantable wallets distributed and documented our first blooming customer gardens nationwide.',
    },
    {
      year: '2026',
      title: 'The Atelier Expands',
      desc: 'Introduced cactus bio-leather travel companions and launched our open-access regenerative craft manifesto.',
    },
  ];

  return (
    <section className="py-24 md:py-32 bg-milkglass-base">
      <div className="max-w-container mx-auto px-4 md:px-8">
        <SectionHeading
          eyebrow="CHRONICLES OF REGENERATION"
          title="Milestones in our journey"
          accent="forward."
          centered
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {milestones.map((m, idx) => (
            <div key={idx} className="p-8 bg-milkglass-100 border border-driftwood-300 space-y-4 shadow-luxury">
              <span className="font-serif text-3xl text-mahogany-base font-normal block">{m.year}</span>
              <h3 className="font-serif text-lg text-evergreen-700 font-medium">{m.title}</h3>
              <p className="text-xs sm:text-sm text-charcoal/80 leading-relaxed font-sans">{m.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
