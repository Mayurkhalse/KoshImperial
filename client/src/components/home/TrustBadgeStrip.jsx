import React from 'react';
import { Sprout, ShieldCheck, Sparkles } from 'lucide-react';

export const TrustBadgeStrip = ({ className = '' }) => {
  const badges = [
    { icon: Sprout, label: 'Plantable Seed Paper Lining' },
    { icon: ShieldCheck, label: '10-Year Craft Guarantee' },
    { icon: Sparkles, label: 'Zero Toxic Tanning' },
  ];

  return (
    <div className={`flex flex-wrap gap-2.5 ${className}`}>
      {badges.map((b, idx) => {
        const Icon = b.icon;
        return (
          <div
            key={idx}
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-milkglass-base/90 backdrop-blur-md border border-driftwood-300 text-evergreen-700 text-xs tracking-wider font-medium shadow-sm"
          >
            <Icon className="w-3.5 h-3.5 text-mahogany-base shrink-0" />
            <span>{b.label}</span>
          </div>
        );
      })}
    </div>
  );
};
