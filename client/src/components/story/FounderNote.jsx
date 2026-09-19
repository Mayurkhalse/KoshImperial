import React from 'react';

export const FounderNote = ({
  quote = 'We set out to prove that the most luxurious leather goods on earth need not take anything from it.',
  author = 'Founders of Kosh Imperial',
}) => {
  return (
    <section className="py-20 md:py-28 bg-milkglass-300 border-t border-b border-driftwood-300">
      <div className="max-w-3xl mx-auto px-4 text-center space-y-6">
        <p className="text-xs uppercase tracking-[0.2em] font-sans font-semibold text-mahogany-base">
          FOUNDERS' CONVICTION
        </p>
        <blockquote className="font-serif text-2xl sm:text-3xl md:text-4xl text-evergreen-700 italic font-normal leading-relaxed">
          "{quote}"
        </blockquote>
        <p className="text-xs font-sans tracking-[0.2em] uppercase text-muted-brown pt-2">
          — {author}
        </p>
      </div>
    </section>
  );
};
