import React from 'react';

export const RevenueCard = ({ title, value, change, icon: Icon }) => {
  return (
    <div className="bg-milkglass-100 border border-driftwood-300 p-6 space-y-3 shadow-sm">
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase tracking-widest text-muted-brown font-semibold">
          {title}
        </span>
        {Icon && <Icon className="w-5 h-5 text-evergreen-700 stroke-[1.5]" />}
      </div>
      <div className="flex items-baseline justify-between">
        <span className="font-serif text-3xl text-evergreen-700 font-normal">{value}</span>
        {change && (
          <span className="text-xs text-success font-medium bg-success/10 px-2 py-0.5 rounded-full">
            {change}
          </span>
        )}
      </div>
    </div>
  );
};
