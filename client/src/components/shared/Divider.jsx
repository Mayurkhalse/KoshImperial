import React from 'react';

export const Divider = ({ className = '', dark = false }) => {
  return (
    <hr
      className={`border-t ${
        dark ? 'border-evergreen-500/40' : 'border-driftwood-300'
      } my-12 md:my-16 ${className}`}
    />
  );
};
