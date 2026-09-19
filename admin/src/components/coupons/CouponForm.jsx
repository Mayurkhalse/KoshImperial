import React, { useState } from 'react';

export const CouponForm = ({ onSave, onCancel, isLoading }) => {
  const [formData, setFormData] = useState({
    code: '',
    type: 'percentage',
    value: 15,
    minOrderValue: 2000,
    maxUses: 100,
    isActive: true,
  });

  const handleChange = (field, val) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      code: formData.code.toUpperCase(),
      value: Number(formData.value),
      minOrderValue: Number(formData.minOrderValue),
      maxUses: formData.maxUses ? Number(formData.maxUses) : undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-xs uppercase tracking-wider font-semibold text-evergreen-700 mb-1">
          Coupon Code
        </label>
        <input
          type="text"
          value={formData.code}
          onChange={(e) => handleChange('code', e.target.value.toUpperCase())}
          required
          placeholder="e.g. SOIL20"
          className="w-full bg-milkglass-300 border border-driftwood-base p-2.5 text-xs uppercase font-mono focus:outline-none focus:border-mahogany-base"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs uppercase tracking-wider font-semibold text-evergreen-700 mb-1">
            Type
          </label>
          <select
            value={formData.type}
            onChange={(e) => handleChange('type', e.target.value)}
            className="w-full bg-milkglass-300 border border-driftwood-base p-2.5 text-xs focus:outline-none focus:border-mahogany-base"
          >
            <option value="percentage">Percentage (%)</option>
            <option value="flat">Flat Amount (₹)</option>
          </select>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider font-semibold text-evergreen-700 mb-1">
            Value ({formData.type === 'percentage' ? '%' : '₹'})
          </label>
          <input
            type="number"
            value={formData.value}
            onChange={(e) => handleChange('value', e.target.value)}
            required
            min="1"
            className="w-full bg-milkglass-300 border border-driftwood-base p-2.5 text-xs focus:outline-none focus:border-mahogany-base"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs uppercase tracking-wider font-semibold text-evergreen-700 mb-1">
            Min Order Value (₹)
          </label>
          <input
            type="number"
            value={formData.minOrderValue}
            onChange={(e) => handleChange('minOrderValue', e.target.value)}
            min="0"
            className="w-full bg-milkglass-300 border border-driftwood-base p-2.5 text-xs focus:outline-none focus:border-mahogany-base"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider font-semibold text-evergreen-700 mb-1">
            Max Redemptions
          </label>
          <input
            type="number"
            value={formData.maxUses}
            onChange={(e) => handleChange('maxUses', e.target.value)}
            min="1"
            className="w-full bg-milkglass-300 border border-driftwood-base p-2.5 text-xs focus:outline-none focus:border-mahogany-base"
          />
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 pt-4 border-t border-driftwood-300">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-xs uppercase tracking-wider border border-driftwood-base hover:bg-driftwood-300"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="px-5 py-2 bg-evergreen-700 text-milkglass-base hover:bg-mahogany-base text-xs uppercase tracking-wider font-semibold disabled:opacity-50"
        >
          Create Coupon
        </button>
      </div>
    </form>
  );
};
