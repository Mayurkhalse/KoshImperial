import React from 'react';
import { Search } from 'lucide-react';

export const ProductFilterBar = ({
  categories = [],
  activeCategory = '',
  onSelectCategory,
  sortBy = 'featured',
  onSelectSort,
  searchTerm = '',
  onSearchChange,
}) => {
  return (
    <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 sm:gap-4 py-4 md:py-6 mb-6 md:mb-8 border-b border-driftwood-300">
      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar touch-manipulation -mx-4 px-4 md:mx-0 md:px-0">
        <button
          type="button"
          onClick={() => onSelectCategory('')}
          className={`px-3.5 py-1.5 sm:px-4 sm:py-2 text-[11px] sm:text-xs uppercase tracking-wider whitespace-nowrap transition-colors border rounded-full md:rounded-none shrink-0 ${
            !activeCategory
              ? 'bg-evergreen-700 text-milkglass-base border-evergreen-700 font-medium shadow-sm'
              : 'bg-milkglass-100 text-charcoal border-driftwood-300 hover:border-evergreen-700'
          }`}
        >
          All Pieces
        </button>
        {categories.map((cat) => (
          <button
            key={cat._id || cat.slug}
            type="button"
            onClick={() => onSelectCategory(cat.slug)}
            className={`px-3.5 py-1.5 sm:px-4 sm:py-2 text-[11px] sm:text-xs uppercase tracking-wider whitespace-nowrap transition-colors border rounded-full md:rounded-none shrink-0 ${
              activeCategory === cat.slug
                ? 'bg-evergreen-700 text-milkglass-base border-evergreen-700 font-medium shadow-sm'
                : 'bg-milkglass-100 text-charcoal border-driftwood-300 hover:border-evergreen-700'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Search & Sort */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Search */}
        <div className="relative flex-1 md:w-56">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search material, craft..."
            className="w-full bg-milkglass-300 text-xs px-3 py-2 pl-8 border border-driftwood-base placeholder:text-muted-brown focus:outline-none focus:border-mahogany-base"
          />
          <Search className="w-3.5 h-3.5 text-muted-brown absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Sort */}
        <select
          value={sortBy}
          onChange={(e) => onSelectSort(e.target.value)}
          className="bg-milkglass-300 border border-driftwood-base text-xs px-2.5 sm:px-3 py-2 text-charcoal focus:outline-none focus:border-mahogany-base cursor-pointer uppercase tracking-wider shrink-0"
        >
          <option value="featured">Featured</option>
          <option value="price-low">Price: Low</option>
          <option value="price-high">Price: High</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>
    </div>
  );
};
