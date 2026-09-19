import React from 'react';
import { InventoryBadge } from './InventoryBadge.jsx';
import { Edit2, Archive } from 'lucide-react';

export const ProductTable = ({ products = [], onEdit, onDelete }) => {
  return (
    <div className="bg-white border border-driftwood-300 overflow-x-auto shadow-sm">
      <table className="w-full text-left text-sm">
        <thead className="bg-driftwood-300 text-evergreen-700 text-xs uppercase tracking-wider font-semibold border-b border-driftwood-300">
          <tr>
            <th className="p-4">Product</th>
            <th className="p-4">SKU</th>
            <th className="p-4">Category</th>
            <th className="p-4">Price</th>
            <th className="p-4">Inventory</th>
            <th className="p-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-driftwood-300 text-charcoal">
          {products.map((p) => (
            <tr key={p._id} className="hover:bg-milkglass-300 transition-colors">
              <td className="p-4 flex items-center gap-3">
                <div className="w-10 h-12 bg-driftwood-300 overflow-hidden shrink-0">
                  {p.images?.[0]?.url && (
                    <img src={p.images[0].url} alt={p.name} className="w-full h-full object-cover" />
                  )}
                </div>
                <div>
                  <p className="font-serif text-sm font-medium text-evergreen-700">{p.name}</p>
                  <p className="text-[11px] text-muted-brown truncate max-w-xs">{p.shortDescription}</p>
                </div>
              </td>
              <td className="p-4 font-mono text-xs">{p.sku}</td>
              <td className="p-4 text-xs">{p.category?.name || 'Wallets'}</td>
              <td className="p-4 font-sans font-semibold text-mahogany-base text-sm">
                ₹{p.price.toLocaleString('en-IN')}
              </td>
              <td className="p-4">
                <InventoryBadge stock={p.stock} />
              </td>
              <td className="p-4 text-right space-x-2">
                <button
                  type="button"
                  onClick={() => onEdit(p)}
                  className="p-1.5 text-evergreen-700 hover:text-mahogany-base transition-colors"
                  title="Edit Product"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(p._id)}
                  className="p-1.5 text-muted-brown hover:text-error transition-colors"
                  title="Archive Product"
                >
                  <Archive className="w-4 h-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
