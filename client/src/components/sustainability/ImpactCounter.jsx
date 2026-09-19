import React, { useState, useEffect } from 'react';

export const ImpactCounter = ({ endValue = 1000, duration = 1200, label, icon: Icon, dark = false }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    const numericEnd = typeof endValue === 'number' ? endValue : parseInt(endValue.replace(/\D/g, ''), 10) || 1000;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * numericEnd));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [endValue, duration]);

  return (
    <div className="space-y-2 text-center p-6">
      {Icon && (
        <Icon
          className={`w-7 h-7 mx-auto mb-2 stroke-[1.5] ${
            dark ? 'text-evergreen-200' : 'text-mahogany-base'
          }`}
        />
      )}
      <p
        className={`font-serif text-4xl sm:text-5xl font-normal tracking-tight ${
          dark ? 'text-milkglass-base' : 'text-evergreen-700'
        }`}
      >
        {count.toLocaleString('en-IN')}
      </p>
      {label && (
        <p
          className={`text-xs uppercase tracking-widest font-medium ${
            dark ? 'text-driftwood-base' : 'text-muted-brown'
          }`}
        >
          {label}
        </p>
      )}
    </div>
  );
};
