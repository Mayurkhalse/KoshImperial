import React from 'react';
import { formatCurrency } from '../../utils/formatCurrency.js';
import { Sprout } from 'lucide-react';

export const OrderSummary = ({ items = [], summary = {} }) => {
  const subtotal = summary.subtotal || 0;
  const discount = summary.discount || 0;
  const shippingFee = summary.shippingFee || 0;
  const total = summary.total || 0;

  return (
    <div className="bg-milkglass-100 border border-driftwood-300 p-6 md:p-8 space-y-6 shadow-luxury">
      <h3 className="font-serif text-xl text-evergreen-700 font-medium pb-4 border-b border-driftwood-300">
        Order Summary
      </h3>

      {/* Item thumbnails */}
      <div className="space-y-4 max-h-72 overflow-y-auto pr-1">
        {items.map((item, idx) => {
          const prod = item.product || {};
          const img =
            prod.images?.[0]?.url ||
            'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=200';

          return (
            <div key={idx} className="flex items-center gap-4 text-sm">
              <div className="relative w-14 h-16 bg-driftwood-300/30 overflow-hidden border border-driftwood-300 shrink-0">
                <img src={img} alt={prod.name} className="w-full h-full object-cover" />
                <span className="absolute -top-1.5 -right-1.5 bg-evergreen-700 text-milkglass-base text-[10px] font-semibold w-4 h-4 rounded-full flex items-center justify-center">
                  {item.quantity}
                </span>
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-serif text-sm text-evergreen-700 truncate">{prod.name || item.name}</p>
                {item.variant && (
                  <p className="text-[11px] text-muted-brown">{item.variant.option}</p>
                )}
              </div>

              <p className="font-sans font-semibold text-mahogany-base text-sm">
                {formatCurrency((prod.price || item.priceAtAdd) * item.quantity)}
              </p>
            </div>
          );
        })}
      </div>

      {/* Price breakdown */}
      <div className="space-y-2 pt-4 border-t border-driftwood-300 text-sm">
        <div className="flex justify-between text-charcoal/80">
          <span>Subtotal</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-success font-medium">
            <span>Conscious Discount</span>
            <span>-{formatCurrency(discount)}</span>
          </div>
        )}

        <div className="flex justify-between text-charcoal/80">
          <span>Express Delivery</span>
          <span>{shippingFee === 0 ? 'Complimentary' : formatCurrency(shippingFee)}</span>
        </div>

        <div className="pt-3 border-t border-driftwood-300 flex justify-between font-serif text-xl text-evergreen-700 font-medium">
          <span>Total</span>
          <span className="font-sans font-semibold text-mahogany-base">{formatCurrency(total)}</span>
        </div>
      </div>

      {/* Eco impact badge */}
      <div className="p-3 bg-milkglass-300 border border-driftwood-300 text-xs text-evergreen-700 flex items-center gap-2">
        <Sprout className="w-4 h-4 text-mahogany-base shrink-0" />
        <span>Your order initiates the planting of native wildflowers.</span>
      </div>
    </div>
  );
};
