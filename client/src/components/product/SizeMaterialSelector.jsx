import React from 'react';

export const SizeMaterialSelector = ({ variants = [], selectedVariant, onSelectVariant }) => {
  if (!variants || variants.length === 0) return null;

  return (
    <div className="space-y-4 pt-2">
      {variants.map((v, vIdx) => (
        <div key={vIdx} className="space-y-2">
          <div className="flex items-center justify-between text-xs uppercase tracking-wider font-medium text-evergreen-700">
            <span>{v.name}:</span>
            <span className="text-mahogany-base font-semibold">
              {selectedVariant?.option || v.options?.[0]}
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {v.options?.map((opt, oIdx) => {
              const isSelected =
                (selectedVariant?.name === v.name && selectedVariant?.option === opt) ||
                (!selectedVariant && oIdx === 0);

              return (
                <button
                  key={oIdx}
                  type="button"
                  onClick={() => onSelectVariant({ name: v.name, option: opt })}
                  className={`px-4 py-2 text-xs uppercase tracking-wider border transition-all ${
                    isSelected
                      ? 'bg-evergreen-700 text-milkglass-base border-evergreen-700 font-medium'
                      : 'bg-milkglass-100 text-charcoal border-driftwood-300 hover:border-evergreen-700'
                  }`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};
