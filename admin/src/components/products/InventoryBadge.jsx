import React from 'react';

export const InventoryBadge = ({ stock }) => {
  if (stock <= 0) {
    return (
      <span className="inline-flex items-center px-2 py-0.5 text-[10px] uppercase tracking-wider font-semibold bg-error/15 text-error border border-error/30">
        Out of Stock
      </span>
    );
  }
  if (stock <= 5) {
    return (
      <span className="inline-flex items-center px-2 py-0.5 text-[10px] uppercase tracking-wider font-semibold bg-warning/15 text-warning border border-warning/30">
        Low Stock ({stock})
      </span>
    );
  }
  return (
    <span className="inline-flex items-center px-2 py-0.5 text-[10px] uppercase tracking-wider font-semibold bg-success/15 text-success border border-success/30">
      In Stock ({stock})
    </span>
  );
};
