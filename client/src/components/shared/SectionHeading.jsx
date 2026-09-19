import React from 'react';

export const SectionHeading = ({
  eyebrow,
  title,
  accent,
  subtitle,
  centered = false,
  dark = false,
  className = '',
}) => {
  return (
    <div className={`mb-12 md:mb-16 ${centered ? 'text-center' : ''} ${className}`}>
      {eyebrow && (
        <p
          className={`text-xs md:text-[13px] font-sans font-semibold tracking-[0.1em] uppercase mb-3 ${
            dark ? 'text-evergreen-200' : 'text-mahogany-base'
          }`}
        >
          {eyebrow}
        </p>
      )}

      <h2
        className={`font-serif text-3xl sm:text-4xl md:text-[44px] leading-[1.15] font-normal tracking-tight ${
          dark ? 'text-milkglass-base' : 'text-evergreen-700'
        }`}
      >
        {title}{' '}
        {accent && (
          <span
            className={`italic font-serif font-normal ${
              dark ? 'text-evergreen-200' : 'text-mahogany-base'
            }`}
          >
            {accent}
          </span>
        )}
      </h2>

      {subtitle && (
        <p
          className={`mt-4 text-base md:text-lg leading-relaxed max-w-2xl font-sans ${
            centered ? 'mx-auto' : ''
          } ${dark ? 'text-driftwood-base' : 'text-charcoal/80'}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};
