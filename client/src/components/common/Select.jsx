import React, { forwardRef } from 'react';

export const Select = forwardRef(
  ({ label, options = [], error, className = '', id, ...props }, ref) => {
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={selectId}
            className="block text-xs uppercase tracking-wider font-medium text-evergreen-700 mb-1.5"
          >
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          className={`w-full bg-milkglass-300 text-charcoal border ${
            error ? 'border-error' : 'border-driftwood-base'
          } px-4 py-3 text-sm transition-colors duration-200 focus:outline-none focus:border-mahogany-base focus:ring-1 focus:ring-mahogany-base cursor-pointer ${className}`}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && <p className="mt-1 text-xs text-error">{error}</p>}
      </div>
    );
  }
);

Select.displayName = 'Select';
