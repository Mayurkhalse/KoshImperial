import React from 'react';

export const IconButton = ({
  icon: Icon,
  label,
  onClick,
  className = '',
  badge = null,
  variant = 'ghost', // 'ghost' | 'filled'
  ...props
}) => {
  const styles =
    variant === 'filled'
      ? 'bg-milkglass-300 text-evergreen-700 hover:bg-driftwood-300'
      : 'text-evergreen-700 hover:text-mahogany-base';

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`relative p-2 rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mahogany-base ${styles} ${className}`}
      {...props}
    >
      {Icon && <Icon className="w-5 h-5 stroke-[1.5]" />}
      {badge !== null && badge > 0 && (
        <span className="absolute -top-1 -right-1 bg-mahogany-base text-milkglass-base text-[10px] font-semibold w-4 h-4 rounded-full flex items-center justify-center">
          {badge}
        </span>
      )}
    </button>
  );
};
