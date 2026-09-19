import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sprout, Heart, Shield } from 'lucide-react';
import { useUIStore } from '../../store/uiStore.js';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const { addToast } = useUIStore();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    addToast('Thank you for joining the conscious inner circle.', 'success');
    setEmail('');
  };

  return (
    <footer className="bg-evergreen-900 text-milkglass-base pt-16 pb-12 border-t border-evergreen-700">
      <div className="max-w-container mx-auto px-4 md:px-8">
        {/* Brand & Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-evergreen-500/40">
          {/* Brand Column (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block font-serif text-3xl tracking-wider text-milkglass-base font-normal hover:text-evergreen-200 transition-colors">
              KOSH IMPERIAL
            </Link>
            <p className="text-driftwood-base text-sm leading-relaxed max-w-sm pt-2">
              Quiet luxury with a conscience. Handcrafting biodegradable plant-fiber wallets embedded
              with dormant wildflower seeds that nourish the soil when returned to earth.
            </p>
            <div className="flex items-center gap-6 pt-4 text-xs tracking-widest uppercase text-driftwood-base/80">
              <span className="flex items-center gap-1.5">
                <Sprout className="w-4 h-4 text-evergreen-200" /> Plantable
              </span>
              <span className="flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-evergreen-200" /> Zero Toxic Tanning
              </span>
              <span className="flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-evergreen-200" /> Heirloom Lifetime
              </span>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="font-serif text-base text-milkglass-base mb-5 tracking-wide">
              Explore
            </h4>
            <ul className="space-y-3 text-sm text-driftwood-base">
              <li>
                <Link to="/" className="hover:text-milkglass-base transition-colors font-medium text-evergreen-200">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-milkglass-base transition-colors">
                  All Wallets
                </Link>
              </li>
              <li>
                <Link to="/shop?category=plantable-bi-folds" className="hover:text-milkglass-base transition-colors">
                  Plantable Bi-Folds
                </Link>
              </li>
              <li>
                <Link to="/shop?category=minimalist-cardholders" className="hover:text-milkglass-base transition-colors">
                  Cactus Cardholders
                </Link>
              </li>
              <li>
                <Link to="/shop?category=eco-travel-passport-wallets" className="hover:text-milkglass-base transition-colors">
                  Passport Sleeves
                </Link>
              </li>
            </ul>
          </div>

          {/* Philosophy */}
          <div>
            <h4 className="font-serif text-base text-milkglass-base mb-5 tracking-wide">
              Philosophy
            </h4>
            <ul className="space-y-3 text-sm text-driftwood-base">
              <li>
                <Link to="/story" className="hover:text-milkglass-base transition-colors">
                  Our Heritage
                </Link>
              </li>
              <li>
                <Link to="/sustainability" className="hover:text-milkglass-base transition-colors">
                  Materials & Circularity
                </Link>
              </li>
              <li>
                <Link to="/impact" className="hover:text-milkglass-base transition-colors">
                  Ecological Impact
                </Link>
              </li>
              <li>
                <Link to="/why-kosh" className="hover:text-milkglass-base transition-colors">
                  Why Kosh Imperial
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-serif text-base text-milkglass-base mb-5 tracking-wide">
              The Journal
            </h4>
            <p className="text-xs text-driftwood-base mb-4 leading-relaxed">
              Occasional dispatches on sustainable living, craft traditions, and seasonal seed releases.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
              <div className="relative flex items-center">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full bg-milkglass-300 text-charcoal px-4 py-2.5 text-xs pr-10 border border-driftwood-base focus:outline-none focus:border-mahogany-base"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="absolute right-1 bg-mahogany-base text-milkglass-base p-1.5 hover:bg-mahogany-700 transition-colors"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-driftwood-600 gap-4">
          <p>© {new Date().getFullYear()} Kosh Imperial. Handcrafted with reverence for nature.</p>
          <div className="flex items-center gap-6">
            <Link to="/faq" className="hover:text-driftwood-base transition-colors">
              Care & Planting Guide
            </Link>
            <Link to="/contact" className="hover:text-driftwood-base transition-colors">
              Client Concierge
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
