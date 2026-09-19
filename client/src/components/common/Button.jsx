import React from 'react';

export const Button = ({
  children,
  variant = 'primary', // 'primary' | 'secondary' | 'ghost' | 'destructive'
  size = 'md', // 'sm' | 'md' | 'lg'
  className = '',
  disabled = false,
  isLoading = false,
  type = 'button',
  onClick,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-sans font-medium transition-colors duration-200 focus-visible:outline-none disabled:opacity-50 disabled:cursor-not-allowed select-none tracking-wide';

  const sizes = {
    sm: 'px-4 py-2 text-xs uppercase tracking-wider',
    md: 'px-6 py-3 text-sm uppercase tracking-wider',
    lg: 'px-8 py-4 text-base tracking-wider',
  };

  const variants = {
    primary:
      'bg-evergreen-700 text-milkglass-base hover:bg-mahogany-base focus-visible:ring-2 focus-visible:ring-mahogany-base',
    secondary:
      'bg-transparent text-evergreen-700 border border-evergreen-700 hover:bg-driftwood-300 focus-visible:ring-2 focus-visible:ring-evergreen-700',
    ghost:
      'bg-transparent text-mahogany-base hover:text-mahogany-700 underline underline-offset-4 p-0',
    destructive:
      'bg-transparent text-error border border-error hover:bg-error/10',
    darkOnLight:
      'bg-milkglass-base text-evergreen-700 hover:bg-driftwood-300 border border-transparent',
  };

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`${baseStyles} ${sizes[size]} ${variants[variant]} ${className}`}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-4 w-4 text-current" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
          </svg>
          Processing...
        </span>
      ) : (
        children
      )}
    </button>
  );
};
