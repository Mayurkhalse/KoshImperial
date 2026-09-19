import React, { useState } from 'react';

export const ProductForm = ({ product, categories = [], onSave, onCancel, isLoading }) => {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    price: product?.price || '',
    compareAtPrice: product?.compareAtPrice || '',
    stock: product?.stock !== undefined ? product.stock : 25,
    category: product?.category?._id || product?.category || categories[0]?._id || '',
    shortDescription: product?.shortDescription || '',
    description: product?.description || '',
    materials: product?.materials ? product.materials.join(', ') : 'Organic Cactus Leather, Plantable Wildflower Seed Paper',
    sustainabilityTags: product?.sustainabilityTags ? product.sustainabilityTags.join(', ') : '100% Biodegradable, Vegan Certified',
    sku: product?.sku || '',
    isFeatured: product?.isFeatured || false,
    imageUrl: product?.images?.[0]?.url || '',
  });

  const handleChange = (field, val) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      price: Number(formData.price),
      compareAtPrice: formData.compareAtPrice ? Number(formData.compareAtPrice) : undefined,
      stock: Number(formData.stock),
      materials: formData.materials.split(',').map((s) => s.trim()).filter(Boolean),
      sustainabilityTags: formData.sustainabilityTags.split(',').map((s) => s.trim()).filter(Boolean),
      images: formData.imageUrl ? [{ url: formData.imageUrl, alt: formData.name }] : undefined,
    };

    onSave(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs uppercase tracking-wider font-semibold text-evergreen-700 mb-1">
            Product Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            required
            placeholder="e.g. The Evergreen Plantable Bi-Fold"
            className="w-full bg-milkglass-300 border border-driftwood-base p-2.5 text-xs focus:outline-none focus:border-mahogany-base"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider font-semibold text-evergreen-700 mb-1">
            Category
          </label>
          <select
            value={formData.category}
            onChange={(e) => handleChange('category', e.target.value)}
            required
            className="w-full bg-milkglass-300 border border-driftwood-base p-2.5 text-xs focus:outline-none focus:border-mahogany-base"
          >
            <option value="">Select Category</option>
            {categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs uppercase tracking-wider font-semibold text-evergreen-700 mb-1">
            Price (₹)
          </label>
          <input
            type="number"
            value={formData.price}
            onChange={(e) => handleChange('price', e.target.value)}
            required
            min="0"
            className="w-full bg-milkglass-300 border border-driftwood-base p-2.5 text-xs focus:outline-none focus:border-mahogany-base"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider font-semibold text-evergreen-700 mb-1">
            Compare Price (₹)
          </label>
          <input
            type="number"
            value={formData.compareAtPrice}
            onChange={(e) => handleChange('compareAtPrice', e.target.value)}
            min="0"
            className="w-full bg-milkglass-300 border border-driftwood-base p-2.5 text-xs focus:outline-none focus:border-mahogany-base"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider font-semibold text-evergreen-700 mb-1">
            Stock Units
          </label>
          <input
            type="number"
            value={formData.stock}
            onChange={(e) => handleChange('stock', e.target.value)}
            required
            min="0"
            className="w-full bg-milkglass-300 border border-driftwood-base p-2.5 text-xs focus:outline-none focus:border-mahogany-base"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs uppercase tracking-wider font-semibold text-evergreen-700 mb-1">
          Product Image URL
        </label>
        <input
          type="url"
          value={formData.imageUrl}
          onChange={(e) => handleChange('imageUrl', e.target.value)}
          placeholder="https://images.unsplash.com/..."
          className="w-full bg-milkglass-300 border border-driftwood-base p-2.5 text-xs focus:outline-none focus:border-mahogany-base"
        />
      </div>

      <div>
        <label className="block text-xs uppercase tracking-wider font-semibold text-evergreen-700 mb-1">
          Short Description
        </label>
        <input
          type="text"
          value={formData.shortDescription}
          onChange={(e) => handleChange('shortDescription', e.target.value)}
          placeholder="One-line summary for cards"
          className="w-full bg-milkglass-300 border border-driftwood-base p-2.5 text-xs focus:outline-none focus:border-mahogany-base"
        />
      </div>

      <div>
        <label className="block text-xs uppercase tracking-wider font-semibold text-evergreen-700 mb-1">
          Full Detailed Description
        </label>
        <textarea
          rows={3}
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          required
          className="w-full bg-milkglass-300 border border-driftwood-base p-2.5 text-xs focus:outline-none focus:border-mahogany-base"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs uppercase tracking-wider font-semibold text-evergreen-700 mb-1">
            Materials (Comma-separated)
          </label>
          <input
            type="text"
            value={formData.materials}
            onChange={(e) => handleChange('materials', e.target.value)}
            className="w-full bg-milkglass-300 border border-driftwood-base p-2.5 text-xs focus:outline-none focus:border-mahogany-base"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider font-semibold text-evergreen-700 mb-1">
            Sustainability Tags (Comma-separated)
          </label>
          <input
            type="text"
            value={formData.sustainabilityTags}
            onChange={(e) => handleChange('sustainabilityTags', e.target.value)}
            className="w-full bg-milkglass-300 border border-driftwood-base p-2.5 text-xs focus:outline-none focus:border-mahogany-base"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 pt-2">
        <input
          type="checkbox"
          id="isFeatured"
          checked={formData.isFeatured}
          onChange={(e) => handleChange('isFeatured', e.target.checked)}
          className="h-4 w-4 text-evergreen-700 focus:ring-mahogany-base"
        />
        <label htmlFor="isFeatured" className="text-xs font-semibold text-evergreen-700 uppercase tracking-wider">
          Feature on Storefront Homepage
        </label>
      </div>

      <div className="flex items-center justify-end gap-3 pt-6 border-t border-driftwood-300">
        <button
          type="button"
          onClick={onCancel}
          className="px-5 py-2.5 text-xs uppercase tracking-wider border border-driftwood-base hover:bg-driftwood-300 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-2.5 bg-evergreen-700 text-milkglass-base hover:bg-mahogany-base text-xs uppercase tracking-wider font-semibold transition-colors disabled:opacity-50"
        >
          {isLoading ? 'Saving...' : 'Save Product'}
        </button>
      </div>
    </form>
  );
};
