import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../common/Button.jsx';
import { Sprout, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';

export const Hero = ({ content = {} }) => {
  const eyebrow = content.eyebrow || 'KOSH IMPERIAL — QUIET LUXURY WITH A CONSCIENCE';
  const heading = content.heading || 'Wallets crafted with quiet luxury';
  const accentWord = content.accentWord || 'that can return.';
  const subtext =
    content.subtext ||
    'Meticulously handcrafted from regenerative plant fibers and infused with living wildflower seeds. Designed to age with distinction for decades, and nurture the soil when planted.';
  const ctaLabel = content.ctaLabel || 'Explore The Collection';
  const ctaHref = content.ctaHref || '/shop';
  const image = content.image || '/images/products/kosh-artisan-duo-hero.jpg';

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F9F8F2] via-milkglass-base to-milkglass-300/40 pt-6 pb-12 sm:pt-10 sm:pb-20 md:pt-16 md:pb-28 border-b border-driftwood-300">
      {/* Ambient Radial Highlights */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-driftwood-300/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-evergreen-200/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-container mx-auto px-3.5 sm:px-6 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column (7 cols) Editorial Narrative */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-7 lg:pr-6">
            {/* Pill Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-milkglass-100 border border-driftwood-300 shadow-sm text-[10px] sm:text-[11px] font-semibold tracking-[0.15em] sm:tracking-[0.2em] uppercase text-evergreen-700">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse shrink-0" />
              <span className="truncate">{eyebrow}</span>
            </div>

            {/* Display Headline */}
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-[62px] leading-[1.14] text-evergreen-700 font-normal tracking-tight">
              {heading}{' '}
              <span className="italic font-serif text-mahogany-base font-normal block sm:inline">
                {accentWord}
              </span>
            </h1>

            {/* Body Description */}
            <p className="text-base sm:text-lg text-charcoal/85 leading-relaxed font-sans max-w-xl">
              {subtext}
            </p>

            {/* CTA Button Group */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link to={ctaHref}>
                <Button variant="primary" size="lg" className="w-full sm:w-auto shadow-md">
                  <span>{ctaLabel}</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/story">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto bg-milkglass-100 hover:bg-milkglass-base border-driftwood-base">
                  Our Heritage & Craft
                </Button>
              </Link>
            </div>

            {/* Trust Micro-Indicators */}
            <div className="pt-4 border-t border-driftwood-300/80 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-2.5 text-xs text-charcoal/80 font-medium">
                <div className="p-1.5 rounded-full bg-evergreen-700/10 text-evergreen-700 shrink-0">
                  <Sprout className="w-4 h-4 text-evergreen-700" />
                </div>
                <span>Living Wildflower Seed Liner</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-charcoal/80 font-medium">
                <div className="p-1.5 rounded-full bg-mahogany-base/10 text-mahogany-base shrink-0">
                  <ShieldCheck className="w-4 h-4 text-mahogany-base" />
                </div>
                <span>10-Year Craft Guarantee</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-charcoal/80 font-medium">
                <div className="p-1.5 rounded-full bg-evergreen-500/10 text-evergreen-500 shrink-0">
                  <Sparkles className="w-4 h-4 text-evergreen-500" />
                </div>
                <span>Zero Toxic Chromium Tanning</span>
              </div>
            </div>
          </div>

          {/* Right Column (5 cols) Luxury Framed Editorial Photo */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer Luxury Decorative Frame */}
              <div className="relative rounded-2xl p-3 bg-gradient-to-br from-milkglass-100 via-driftwood-300/40 to-milkglass-base border border-driftwood-300 shadow-2xl shadow-evergreen-900/15">
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-driftwood-300/40">
                  <img
                    src={image}
                    alt="Kosh Imperial Handcrafted Artisanal Plantable Wallets"
                    className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-evergreen-900/40 via-transparent to-black/20 pointer-events-none" />

                  {/* Top-Left Editorial Typography Overlay (Fully visible, never cut off) */}
                  <div className="absolute top-5 left-5 pointer-events-none select-none z-10">
                    <span className="text-[10px] tracking-[0.25em] uppercase font-sans font-semibold text-milkglass-100/90 block drop-shadow mb-0.5">
                      Atelier Edition
                    </span>
                    <h2 className="font-serif text-2xl sm:text-3xl lg:text-[32px] text-milkglass-base font-normal leading-[1.08] tracking-wider drop-shadow-lg text-white">
                      ARTISANAL<br />
                      VEGAN<br />
                      LUXURY
                    </h2>
                  </div>

                  {/* Floating Capsule Badge */}
                  <div className="absolute bottom-4 inset-x-4 backdrop-blur-md bg-milkglass-base/95 border border-driftwood-300/90 rounded-xl p-3.5 shadow-luxury flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-muted-brown font-semibold block">
                        Signature Atelier Duo
                      </span>
                      <span className="font-serif text-sm font-semibold text-evergreen-700">
                        Accordion & Croc Tri-Fold
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] uppercase tracking-wider text-mahogany-base font-semibold block">
                        Botanical Seed Liners
                      </span>
                      <span className="text-xs font-bold text-evergreen-900">
                        100% Plantable
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
