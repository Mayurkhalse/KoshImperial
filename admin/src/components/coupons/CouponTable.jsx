import React from 'react';
import { Trash2 } from 'lucide-react';

export const CouponTable = ({ coupons = [], onDelete }) => {
  return (
    <div className="bg-white border border-driftwood-300 overflow-x-auto shadow-sm">
      <table className="w-full text-left text-sm">
        <thead className="bg-driftwood-300 text-evergreen-700 text-xs uppercase tracking-wider font-semibold border-b border-driftwood-300">
          <tr>
            <th className="p-4">Code</th>
            <th className="p-4">Discount Type</th>
            <th className="p-4">Value</th>
            <th className="p-4">Min Order</th>
            <th className="p-4">Uses</th>
            <th className="p-4">Status</th>
            <th className="p-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-driftwood-300 text-charcoal">
          {coupons.map((c) => (
            <tr key={c._id} className="hover:bg-milkglass-300 transition-colors">
              <td className="p-4 font-mono text-xs font-semibold text-mahogany-base">
                {c.code}
              </td>
              <td className="p-4 text-xs capitalize">{c.type}</td>
              <td className="p-4 font-sans font-semibold text-sm">
                {c.type === 'percentage' ? `${c.value}%` : `₹${c.value}`}
              </td>
              <td className="p-4 text-xs">₹{c.minOrderValue}</td>
              <td className="p-4 text-xs text-muted-brown">
                {c.usedCount} {c.maxUses ? `/ ${c.maxUses}` : ''}
              </td>
              <td className="p-4">
                <span
                  className={`text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 ${
                    c.isActive
                      ? 'bg-success/15 text-success border border-success/30'
                      : 'bg-error/15 text-error border border-error/30'
                  }`}
                >
                  {c.isActive ? 'Active' : 'Inactive'}
                </span>
              </td>
              <td className="p-4 text-right">
                <button
                  type="button"
                  onClick={() => onDelete(c._id)}
                  className="p-1.5 text-muted-brown hover:text-error transition-colors"
                  title="Delete coupon"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
