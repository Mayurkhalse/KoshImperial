import React from 'react';
import { Sprout, Flower2, Recycle, Award, CheckCircle } from 'lucide-react';

export const ImpactStrip = ({ data = {} }) => {
  const stats = [
    {
      value: data.walletsPlanted || '14,820',
      unit: 'heirlooms',
      label: 'Plantable Wallets Returned to Earth',
      subtext: 'Burying wallets to nurture topsoil instead of clogging landfills.',
      icon: Sprout,
    },
    {
      value: data.wildflowersBloomed || '88,000+',
      unit: 'blooms',
      label: 'Native Wildflowers & Herbs Bloomed',
      subtext: 'Supporting local bees, butterflies, and pollinator corridors.',
      icon: Flower2,
    },
    {
      value: data.wasteDivertedKg || '12,450 kg',
      unit: 'materials',
      label: 'Synthetic Leather & Plastic Diverted',
      subtext: 'Replaced PVC, polyurethane, and toxic chromium tanning.',
      icon: Recycle,
    },
  ];

  return (
    <section className="bg-evergreen-900 text-milkglass-base py-20 md:py-28 border-b border-evergreen-700 relative overflow-hidden">
      {/* Subtle Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-64 bg-emerald-800/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-container mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-evergreen-700/60 border border-evergreen-500/40 text-[11px] uppercase tracking-[0.2em] font-sans font-semibold text-evergreen-200">
            <Award className="w-3.5 h-3.5 text-evergreen-200" />
            <span>MEASURABLE ECOLOGICAL FOOTPRINT</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-milkglass-base font-normal tracking-tight">
            Heirloom craft with <span className="italic font-serif text-evergreen-200">measurable regeneration.</span>
          </h2>
          <p className="text-xs sm:text-sm text-driftwood-base max-w-lg mx-auto font-sans leading-relaxed">
            Every transaction funds regenerative agriculture and wildflower conservation initiatives across the Indian subcontinent.
          </p>
        </div>

        {/* 3 Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="p-8 rounded-2xl bg-evergreen-700/20 border border-evergreen-500/30 hover:border-evergreen-200/50 transition-all duration-300 text-center space-y-3 backdrop-blur-sm"
              >
                <div className="w-12 h-12 mx-auto rounded-xl bg-evergreen-700/50 border border-evergreen-500/40 flex items-center justify-center text-evergreen-200">
                  <Icon className="w-6 h-6 stroke-[1.5]" />
                </div>

                <p className="font-serif text-4xl sm:text-5xl text-milkglass-base font-normal tracking-tight">
                  {stat.value}
                </p>

                <p className="text-sm font-serif font-medium text-evergreen-200">
                  {stat.label}
                </p>

                <p className="text-xs font-sans text-driftwood-base/80 leading-relaxed max-w-xs mx-auto">
                  {stat.subtext}
                </p>
              </div>
            );
          })}
        </div>

        {/* Certification Ribbon */}
        <div className="mt-14 pt-8 border-t border-evergreen-700/60 flex flex-wrap items-center justify-center gap-8 text-xs text-driftwood-base/80 uppercase tracking-widest font-mono">
          <span className="flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-emerald-400" /> Non-GMO Seed Stock
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-emerald-400" /> GOTS Organic Cotton
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-emerald-400" /> PETA-Approved Vegan
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-emerald-400" /> Plastic-Free Certified
          </span>
        </div>
      </div>
    </section>
  );
};
