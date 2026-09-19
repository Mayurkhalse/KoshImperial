import React from 'react';
import { Sparkles } from 'lucide-react';

export const AnnouncementBar = () => {
  return (
    <div className="bg-evergreen-700 text-milkglass-base py-2 px-4 text-center text-xs tracking-widest uppercase font-medium flex items-center justify-center gap-2">
      <Sparkles className="w-3.5 h-3.5 text-driftwood-base" />
      <span>Complimentary express shipping across India on orders above ₹2,000</span>
      <Sparkles className="w-3.5 h-3.5 text-driftwood-base" />
    </div>
  );
};
