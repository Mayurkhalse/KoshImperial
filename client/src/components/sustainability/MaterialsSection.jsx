import React from 'react';
import { SectionHeading } from '../shared/SectionHeading.jsx';
import { Sprout, Feather, Leaf, Shield, ArrowRight, RefreshCw, Sun, Droplets } from 'lucide-react';

export const MaterialsSection = () => {
  const materials = [
    {
      icon: Leaf,
      tag: '01 · BIOMATERIAL',
      title: 'Regenerative Cactus Bio-Leather',
      description:
        'Harvested sustainably from mature Mexican nopal cactus leaves without irrigation or pesticides. Supple, water-resistant, and completely cruelty-free.',
    },
    {
      icon: Sprout,
      tag: '02 · EMBEDDED SEEDS',
      title: 'Living Botanical Seed Paper',
      description:
        'Interlining hand-poured from post-consumer cotton rag and embedded with non-GMO marigold, daisy, and sweet basil seeds ready to sprout.',
    },
    {
      icon: Feather,
      tag: '03 · REVERENT STITCHING',
      title: 'Unbleached Organic Cotton Thread',
      description:
        'Every seam is bound using certified GOTS organic cotton thread fortified with raw natural beeswax rather than petroleum nylon threads.',
    },
    {
      icon: Shield,
      tag: '04 · PURE COLOR',
      title: 'Zero Toxic Chrome Tanning',
      description:
        'Artisanal shades achieved exclusively with botanical tannins from walnut hulls, chestnut bark, and natural indigo — zero synthetic polymers.',
    },
  ];

  const lifecycleSteps = [
    { step: '01', title: 'Cultivation', desc: 'Solar-grown nopal & cork harvested with zero irrigation.', icon: Sun },
    { step: '02', title: 'Artisanal Assembly', desc: 'Handcrafted by generational leather artisans in India.', icon: Feather },
    { step: '03', title: 'Decades of Carry', desc: 'Develops a rich heirloom patina unique to your journey.', icon: Shield },
    { step: '04', title: 'Return to Soil', desc: 'Moisten, bury under soil, and watch wildflowers bloom.', icon: Droplets },
  ];

  return (
    <section className="py-24 md:py-32 bg-gradient-to-b from-evergreen-900 via-[#18271D] to-evergreen-900 text-milkglass-base border-b border-evergreen-700 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-emerald-900/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-mahogany-base/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-container mx-auto px-4 md:px-8 relative z-10">
        <SectionHeading
          eyebrow="MATERIAL INTEGRITY & CIRCULARITY"
          title="Born in the soil,"
          accent="crafted for the hand."
          subtitle="We eliminate toxic tanning chemicals and petroleum plastics, replacing them with agricultural marvels engineered to return to the earth."
          centered
          dark
        />

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {materials.map((mat, idx) => {
            const Icon = mat.icon;
            return (
              <div
                key={idx}
                className="p-8 rounded-xl bg-evergreen-700/30 border border-evergreen-500/40 hover:border-evergreen-200/60 transition-all duration-300 backdrop-blur-md hover:-translate-y-1 shadow-luxury flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-evergreen-200 font-semibold">
                      {mat.tag}
                    </span>
                    <div className="p-2.5 rounded-lg bg-evergreen-900/60 border border-evergreen-500/30 group-hover:border-evergreen-200/50 transition-colors">
                      <Icon className="w-5 h-5 text-evergreen-200 stroke-[1.5]" />
                    </div>
                  </div>

                  <h3 className="font-serif text-xl mb-3 text-milkglass-base font-normal group-hover:text-evergreen-200 transition-colors">
                    {mat.title}
                  </h3>

                  <p className="text-xs md:text-sm leading-relaxed text-driftwood-base/90 font-sans">
                    {mat.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-evergreen-500/30 flex items-center gap-1.5 text-[11px] text-evergreen-200 uppercase tracking-widest font-semibold">
                  <span>100% Plant Sourced</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* The Lifecycle Journey Bar */}
        <div className="p-8 md:p-10 rounded-2xl bg-evergreen-900/80 border border-evergreen-500/50 backdrop-blur-md">
          <div className="text-center mb-8">
            <span className="text-xs uppercase font-mono tracking-[0.25em] text-evergreen-200 font-semibold block mb-1">
              THE SEED-TO-BLOOM CYCLE
            </span>
            <h3 className="font-serif text-2xl md:text-3xl text-milkglass-base">
              How Your Kosh Imperial Piece Closes The Loop
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {lifecycleSteps.map((step, idx) => {
              const StepIcon = step.icon;
              return (
                <div key={idx} className="relative space-y-2.5 bg-evergreen-700/20 p-5 rounded-xl border border-evergreen-500/20">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-mahogany-300">
                      Phase {step.step}
                    </span>
                    <StepIcon className="w-4 h-4 text-evergreen-200" />
                  </div>
                  <h4 className="font-serif text-base text-milkglass-base font-medium">
                    {step.title}
                  </h4>
                  <p className="text-xs text-driftwood-base/80 leading-relaxed font-sans">
                    {step.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
