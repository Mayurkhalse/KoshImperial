import React from 'react';

export const Loader = ({ label = 'Loading...', size = 'md' }) => {
  const sizes = {
    sm: 'w-5 h-5 border-2',
    md: 'w-8 h-8 border-2',
    lg: 'w-12 h-12 border-3',
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 gap-3">
      <div
        className={`${sizes[size]} rounded-full border-driftwood-300 border-t-evergreen-700 animate-spin`}
      />
      {label && <p className="text-xs uppercase tracking-widest text-muted-brown">{label}</p>}
    </div>
  );
};
