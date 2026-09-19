import React, { useState } from 'react';

export const ProductGallery = ({ images = [] }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const imageList =
    images.length > 0
      ? images
      : [
          {
            url: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=1000',
            alt: 'Plantable Wallet',
          },
        ];

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4 items-start w-full">
      {/* Thumbnail Rail */}
      {imageList.length > 1 && (
        <div className="flex md:flex-col items-center gap-2.5 sm:gap-3 overflow-x-auto md:overflow-y-auto max-h-[620px] pb-2 md:pb-0 shrink-0 w-full md:w-auto no-scrollbar touch-manipulation">
          {imageList.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedIndex(idx)}
              aria-label={`View image ${idx + 1}`}
              className={`relative w-20 h-24 shrink-0 bg-driftwood-300/30 overflow-hidden border transition-all ${
                selectedIndex === idx
                  ? 'border-mahogany-base ring-2 ring-mahogany-base opacity-100 shadow-md'
                  : 'border-driftwood-300 hover:border-evergreen-700 opacity-70 hover:opacity-100'
              }`}
            >
              <img
                src={img.url}
                alt={img.alt || `Thumbnail ${idx + 1}`}
                className="w-full h-full object-cover object-center"
              />
            </button>
          ))}
        </div>
      )}

      {/* Main Image View */}
      <div className="relative flex-1 aspect-[4/5] bg-driftwood-300/40 overflow-hidden border border-driftwood-300 shadow-luxury w-full">
        <img
          src={imageList[selectedIndex]?.url}
          alt={imageList[selectedIndex]?.alt || 'Product Image'}
          className="w-full h-full object-cover object-center transition-all duration-300"
        />
      </div>
    </div>
  );
};
