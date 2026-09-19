import React, { forwardRef } from 'react';

export const Input = forwardRef(
  ({ label, error, helperText, className = '', type = 'text', id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs uppercase tracking-wider font-medium text-evergreen-700 mb-1.5"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          type={type}
          className={`w-full bg-milkglass-300 text-charcoal border ${
            error ? 'border-error' : 'border-driftwood-base'
          } px-4 py-3 text-sm transition-all duration-200 placeholder:text-muted-brown/60 focus:outline-none focus:border-mahogany-base focus:ring-1 focus:ring-mahogany-base ${className}`}
          {...props}
        />
        {error && <p className="mt-1 text-xs text-error">{error}</p>}
        {!error && helperText && (
          <p className="mt-1 text-xs text-muted-brown">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
