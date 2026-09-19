import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SectionHeading } from '../shared/SectionHeading.jsx';
import { ProductGrid } from '../product/ProductGrid.jsx';
import { ArrowRight, Sparkles } from 'lucide-react';

export const FeaturedCollection = ({ products = [], isLoading = false, onQuickView }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Heirlooms' },
    { id: 'plantable-bi-folds', label: 'Plantable Bi-Folds' },
    { id: 'minimalist-cardholders', label: 'Cardholders' },
    { id: 'eco-travel-passport-wallets', label: 'Passport & Travel' },
  ];

  const filteredProducts =
    selectedCategory === 'all'
      ? products
      : products.filter((p) => p.category?.slug === selectedCategory);

  return (
    <section className="py-12 sm:py-20 md:py-28 bg-[#FAF9F5] border-b border-driftwood-300">
      <div className="max-w-container mx-auto px-3.5 sm:px-6 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4 sm:gap-6">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] uppercase text-mahogany-base mb-2">
              <Sparkles className="w-3.5 h-3.5 text-mahogany-base" />
              <span>SIGNATURE COLLECTION</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl text-evergreen-700 font-normal tracking-tight">
              Conscious pieces crafted for{' '}
              <span className="italic font-serif text-mahogany-base">a lifetime.</span>
            </h2>
            <p className="text-xs sm:text-base text-charcoal/80 font-sans mt-2 max-w-xl">
              Each piece is stitched by master artisans from plant bio-leathers, concealing dormant non-GMO seeds inside its lining.
            </p>
          </div>

          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-mahogany-base hover:text-mahogany-700 transition-colors group pb-2"
          >
            <span>Explore Complete Catalog</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 sm:pb-4 mb-6 sm:mb-8 no-scrollbar touch-manipulation -mx-3.5 px-3.5 sm:mx-0 sm:px-0">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 sm:px-4 sm:py-2 text-[11px] sm:text-xs uppercase tracking-wider font-medium rounded-full transition-all duration-200 whitespace-nowrap shrink-0 ${
                selectedCategory === cat.id
                  ? 'bg-evergreen-700 text-milkglass-base shadow-sm'
                  : 'bg-milkglass-base text-charcoal/80 border border-driftwood-300 hover:border-evergreen-500/50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <ProductGrid
          products={filteredProducts.slice(0, 4)}
          isLoading={isLoading}
          onQuickView={onQuickView}
        />
      </div>
    </section>
  );
};
