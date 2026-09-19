import React from 'react';

export const Badge = ({
  children,
  variant = 'tag', // 'tag' | 'success' | 'warning' | 'error' | 'pill'
  className = '',
}) => {
  const variants = {
    tag: 'bg-driftwood-300 text-evergreen-700 font-medium',
    pill: 'bg-milkglass-base/90 backdrop-blur-sm text-evergreen-700 shadow-sm border border-driftwood-300',
    success: 'bg-success/15 text-success border border-success/30 font-medium',
    warning: 'bg-warning/15 text-warning border border-warning/30 font-medium',
    error: 'bg-error/15 text-error border border-error/30 font-medium',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 text-xs tracking-wider uppercase rounded-full ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
