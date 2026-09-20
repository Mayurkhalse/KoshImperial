import React from 'react';
import { Quote } from 'lucide-react';

export const BrandStatement = () => {
  return (
    <section className="py-20 md:py-28 bg-[#EDE8D8] border-b border-driftwood-300 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
        <Quote className="w-96 h-96 text-evergreen-900" />
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-8 text-center space-y-6 relative z-10">
        {/* Emblem Crest */}
        <div className="flex justify-center -mb-1">
          <div
            style={{ width: '60px', height: '60px', minWidth: '60px', minHeight: '60px' }}
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border border-driftwood-400/80 shadow-md bg-[#EDE8D8] p-0.5 flex items-center justify-center transform hover:scale-105 transition-transform duration-300"
          >
            <img
              src="/vulture-logo-circle.png"
              alt="Kosh Imperial Royal Crest"
              className="h-full w-full object-cover rounded-full"
            />
          </div>
        </div>

        <div className="flex items-center justify-center gap-3">
          <span className="h-px w-10 bg-driftwood-600/60" />
          <p className="text-[11px] uppercase tracking-[0.25em] font-sans font-semibold text-mahogany-base">
            THE ATELIER PHILOSOPHY
          </p>
          <span className="h-px w-10 bg-driftwood-600/60" />
        </div>

        <blockquote className="font-serif text-2xl sm:text-3xl md:text-[38px] text-evergreen-700 leading-snug font-normal">
          "We craft for those who understand that true luxury does not shout. It endures in the pocket,
          refines with age, and eventually returns to the earth without leaving a trace."
        </blockquote>

        <div className="pt-2 flex flex-col items-center gap-1">
          <span className="font-serif italic text-base text-evergreen-500">
            Kosh Imperial Atelier
          </span>
          <span className="text-[10px] font-sans tracking-[0.2em] uppercase text-muted-brown">
            Handcrafted with Reverence · Circa 2024
          </span>
        </div>
      </div>
    </section>
  );
};
