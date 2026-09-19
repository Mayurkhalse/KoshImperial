import React from 'react';

export const IconTextCard = ({ icon: Icon, title, description, dark = false }) => {
  return (
    <div
      className={`p-8 border transition-all duration-300 ${
        dark
          ? 'bg-evergreen-900/40 border-evergreen-500/40 hover:border-evergreen-200/60'
          : 'bg-milkglass-100 border-driftwood-300 hover:shadow-luxury'
      }`}
    >
      <div className="mb-5 inline-flex p-3 rounded-none">
        {Icon && (
          <Icon
            className={`w-7 h-7 stroke-[1.5] ${
              dark ? 'text-milkglass-base' : 'text-evergreen-700'
            }`}
          />
        )}
      </div>

      <h3
        className={`font-serif text-xl mb-3 font-normal ${
          dark ? 'text-milkglass-base' : 'text-evergreen-700'
        }`}
      >
        {title}
      </h3>

      <p
        className={`text-sm leading-relaxed font-sans ${
          dark ? 'text-driftwood-base' : 'text-charcoal/80'
        }`}
      >
        {description}
      </p>
    </div>
  );
};
