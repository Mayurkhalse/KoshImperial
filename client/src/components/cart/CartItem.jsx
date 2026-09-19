import React from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../../utils/formatCurrency.js';
import { Trash2, Plus, Minus } from 'lucide-react';

export const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const product = item.product || {};
  const image =
    product.images?.[0]?.url ||
    'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=300';

  return (
    <div className="py-4 flex gap-4 items-start border-b border-driftwood-300 last:border-b-0">
      {/* Thumbnail */}
      <Link
        to={`/product/${product.slug}`}
        className="relative w-20 h-24 shrink-0 bg-driftwood-300/30 overflow-hidden border border-driftwood-300"
      >
        <img src={image} alt={product.name || 'Item'} className="w-full h-full object-cover object-center" />
      </Link>

      {/* Details */}
      <div className="flex-1 min-w-0 space-y-1">
        <Link
          to={`/product/${product.slug}`}
          className="font-serif text-base text-evergreen-700 hover:text-mahogany-base font-normal truncate block"
        >
          {product.name || item.name}
        </Link>

        {item.variant && (
          <p className="text-xs text-muted-brown">
            {item.variant.name}: {item.variant.option}
          </p>
        )}

        <p className="font-sans text-sm font-semibold text-mahogany-base pt-1">
          {formatCurrency(product.price || item.priceAtAdd)}
        </p>

        {/* Stepper & Remove */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center border border-driftwood-base bg-milkglass-300">
            <button
              type="button"
              onClick={() => onUpdateQuantity(item._id, item.quantity - 1)}
              className="p-1.5 text-evergreen-700 hover:text-mahogany-base"
              aria-label="Decrease"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="px-3 text-xs font-semibold text-charcoal">{item.quantity}</span>
            <button
              type="button"
              onClick={() => onUpdateQuantity(item._id, item.quantity + 1)}
              className="p-1.5 text-evergreen-700 hover:text-mahogany-base"
              aria-label="Increase"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>

          <button
            type="button"
            onClick={() => onRemove(item._id)}
            className="text-muted-brown hover:text-mahogany-base transition-colors p-1"
            title="Remove item"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
