import React from 'react';
import { SectionHeading } from '../shared/SectionHeading.jsx';

export const StoryHero = () => {
  return (
    <section className="py-20 md:py-28 bg-milkglass-base border-b border-driftwood-300">
      <div className="max-w-container mx-auto px-4 md:px-8 space-y-24">
        {/* Row 1: Text Left, Image Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <SectionHeading
              eyebrow="OUR ORIGINS"
              title="A return to reverence in an era of"
              accent="rapid discard."
              className="!mb-6"
            />
            <p className="text-base sm:text-lg text-charcoal/85 leading-relaxed font-sans">
              Kosh Imperial began with a quiet observation: the traditional luxury leather industry
              relied on heavy chemical tanning and non-biodegradable synthetic laminates, while green
              alternatives often felt like cheap novelties.
            </p>
            <p className="text-sm sm:text-base text-charcoal/80 leading-relaxed font-sans">
              We set out to build an heirloom accessories house that uncompromisingly champions quiet
              luxury aesthetics while ensuring that every single material can return to fertile soil.
            </p>
          </div>

          <div className="lg:col-span-6">
            <div className="aspect-[4/3] rounded-xl bg-driftwood-300 overflow-hidden shadow-luxury border border-driftwood-300">
              <img
                src="/images/products/kosh-artisan-duo-hero.jpg"
                alt="Kosh Imperial artisanal vegan leather wallets on workbench"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>
        </div>

        {/* Row 2: Image Left, Text Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="aspect-[4/3] rounded-xl bg-driftwood-300 overflow-hidden shadow-luxury border border-driftwood-300">
              <img
                src="/images/products/kosh-evergreen-open.jpg"
                alt="Plantable seed paper lining inside the accordion wallet"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
            <SectionHeading
              eyebrow="THE LIVING LINING"
              title="Embedded life inside every"
              accent="heirloom seam."
              className="!mb-6"
            />
            <p className="text-base sm:text-lg text-charcoal/85 leading-relaxed font-sans">
              Rather than synthetic polyester mesh or synthetic cardboard stiffeners, each Kosh
              Imperial wallet houses a structural core made from unbleached cotton seed paper.
            </p>
            <p className="text-sm sm:text-base text-charcoal/80 leading-relaxed font-sans">
              Embedded within this core are viable wildflower seeds. After a decade of trusted daily
              service, your wallet can be placed under earth and watered, turning memory into living
              blossoms.
            </p>
          </div>
        </div>

        {/* Row 3: Text Left, Emblem Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-8 border-t border-driftwood-300">
          <div className="lg:col-span-6 space-y-6">
            <SectionHeading
              eyebrow="THE IMPERIAL INSIGNIA"
              title="Guardian of the"
              accent="Sacred Kosh."
              className="!mb-6"
            />
            <p className="text-base sm:text-lg text-charcoal/85 leading-relaxed font-sans">
              In ancient Sanskrit lore, <em>Kosh</em> (कोष) signifies the treasury—the sacred repository
              of invaluable creations, heirloom treasures, and timeless wealth.
            </p>
            <p className="text-sm sm:text-base text-charcoal/80 leading-relaxed font-sans">
              Our emblem features the gilded sentinel perched resolutely above the royal coffer. As nature's
              quintessential steward of renewal, it embodies vigilance, soaring elevation, and cyclical rebirth—a
              fitting guardian for wallets designed to cherish what matters in this life and return cleanly to the earth.
            </p>
          </div>

          <div className="lg:col-span-6 flex justify-center">
            <div className="relative p-8 sm:p-12 rounded-2xl bg-[#EDE8D8] border border-driftwood-400 shadow-luxury max-w-md w-full flex items-center justify-center">
              <img
                src="/vulture.logo.of.kosh.png"
                alt="Kosh Imperial Royal Vulture Emblem"
                className="w-full max-h-96 object-contain mix-blend-multiply drop-shadow-md hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
