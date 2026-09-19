import React, { useState } from 'react';

export const StatusUpdater = ({ currentStatus, onUpdateStatus, isLoading }) => {
  const [status, setStatus] = useState(currentStatus);

  const statuses = [
    'pending',
    'confirmed',
    'processing',
    'shipped',
    'delivered',
    'cancelled',
    'refunded',
  ];

  const handleSelect = (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    onUpdateStatus(newStatus);
  };

  return (
    <select
      value={status}
      disabled={isLoading}
      onChange={handleSelect}
      className="bg-milkglass-300 border border-driftwood-base text-xs px-2.5 py-1 text-charcoal uppercase tracking-wider font-semibold focus:outline-none focus:border-mahogany-base cursor-pointer"
    >
      {statuses.map((st) => (
        <option key={st} value={st}>
          {st}
        </option>
      ))}
    </select>
  );
};
