import React from 'react';

export const TopProductsList = ({ products = [] }) => {
  return (
    <div className="bg-milkglass-100 border border-driftwood-300 p-6 space-y-4 shadow-sm">
      <h3 className="font-serif text-xl text-evergreen-700 font-normal pb-4 border-b border-driftwood-300">
        Top Performing Pieces
      </h3>

      <div className="space-y-3">
        {products.map((prod, idx) => (
          <div key={prod._id || idx} className="flex items-center justify-between text-xs py-2 border-b border-driftwood-300/40 last:border-0">
            <div className="flex items-center gap-3">
              <span className="w-5 font-mono text-muted-brown">0{idx + 1}</span>
              <span className="font-serif text-sm text-evergreen-700 font-medium truncate max-w-[180px]">
                {prod.name}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-muted-brown">★ {prod.ratingsAverage || 5.0}</span>
              <span className="font-sans font-semibold text-mahogany-base">
                ₹{(prod.price || 0).toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
