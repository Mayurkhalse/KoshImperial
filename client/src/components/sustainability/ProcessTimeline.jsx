import React from 'react';
import { SectionHeading } from '../shared/SectionHeading.jsx';

export const ProcessTimeline = () => {
  const steps = [
    {
      step: '01',
      title: 'Agricultural Harvest',
      desc: 'Organic cactus leaves and wild seeds are gathered without clearing native woodlands.',
    },
    {
      step: '02',
      title: 'Solar Curing & Bio-Leather',
      desc: 'Plant fibers are sun-dried and combined with natural bio-resins over 72 hours.',
    },
    {
      step: '03',
      title: 'Hand-Setting & Seed Infusion',
      desc: 'Artisans hand-stitch the seed paper lining into place with beeswaxed organic thread.',
    },
    {
      step: '04',
      title: 'Decades of Use & Soil Return',
      desc: 'Carried with pride for years, then planted under soil to bloom into daisies and herbs.',
    },
  ];

  return (
    <section className="py-24 md:py-32 bg-milkglass-base border-b border-driftwood-300">
      <div className="max-w-container mx-auto px-4 md:px-8">
        <SectionHeading
          eyebrow="THE CIRCULAR JOURNEY"
          title="From dormant seed to"
          accent="blooming earth."
          subtitle="Every wallet follows a closed-loop lifecycle where obsolescence is a rebirth rather than landfill waste."
          centered
        />

        <div className="relative mt-16">
          {/* Connecting line on desktop */}
          <div className="hidden lg:block absolute top-7 left-12 right-12 h-[1px] bg-driftwood-base z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((item, idx) => (
              <div key={idx} className="space-y-4 text-center lg:text-left">
                <div className="w-14 h-14 bg-milkglass-100 border border-driftwood-base text-evergreen-700 font-serif text-lg font-medium flex items-center justify-center mx-auto lg:mx-0 shadow-sm">
                  {item.step}
                </div>
                <h3 className="font-serif text-xl text-evergreen-700 font-medium">{item.title}</h3>
                <p className="text-xs sm:text-sm text-charcoal/80 leading-relaxed font-sans">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
