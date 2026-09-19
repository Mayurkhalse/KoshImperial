import React from 'react';
import { formatCurrency } from '../../utils/formatCurrency.js';
import { Badge } from '../common/Badge.jsx';
import { MapPin, Calendar, CreditCard, Package } from 'lucide-react';

export const OrderDetailCard = ({ order, onBack }) => {
  if (!order) return null;

  const addr = order.shippingAddress || {};

  return (
    <div className="bg-milkglass-100 border border-driftwood-300 p-6 md:p-8 space-y-8 shadow-luxury">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-driftwood-300 gap-4">
        <div>
          <button
            type="button"
            onClick={onBack}
            className="text-xs uppercase tracking-wider text-mahogany-base hover:underline font-semibold mb-2 block"
          >
            ← Back to All Orders
          </button>
          <h3 className="font-serif text-2xl text-evergreen-700 font-normal">
            Order {order.orderNumber}
          </h3>
          <p className="text-xs text-muted-brown flex items-center gap-1.5 mt-1">
            <Calendar className="w-3.5 h-3.5" /> Placed on{' '}
            {new Date(order.createdAt).toLocaleDateString('en-IN', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </p>
        </div>

        <div>
          <Badge variant="tag" className="!text-sm px-4 py-1.5 capitalize">
            Status: {order.status}
          </Badge>
        </div>
      </div>

      {/* Items list */}
      <div>
        <h4 className="font-serif text-lg text-evergreen-700 mb-4">Ordered Pieces</h4>
        <div className="divide-y divide-driftwood-300 border-t border-b border-driftwood-300">
          {order.items?.map((item, idx) => (
            <div key={idx} className="py-4 flex items-center justify-between gap-4">
              <div>
                <p className="font-serif text-base text-evergreen-700 font-medium">{item.name}</p>
                {item.variant && (
                  <p className="text-xs text-muted-brown">
                    {item.variant.name}: {item.variant.option}
                  </p>
                )}
                <p className="text-xs text-muted-brown mt-1">Quantity: {item.quantity}</p>
              </div>

              <p className="font-sans font-semibold text-mahogany-base text-base">
                {formatCurrency(item.price * item.quantity)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Grid: Shipping & Payment Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
        <div className="p-5 bg-milkglass-300 border border-driftwood-300 space-y-2 text-sm">
          <div className="flex items-center gap-2 font-serif text-base text-evergreen-700 font-medium mb-1">
            <MapPin className="w-4 h-4 text-mahogany-base" />
            <span>Shipping Destination</span>
          </div>
          <p className="font-semibold text-charcoal">{addr.fullName}</p>
          <p className="text-xs text-charcoal/80">{addr.line1}</p>
          {addr.line2 && <p className="text-xs text-charcoal/80">{addr.line2}</p>}
          <p className="text-xs text-charcoal/80">
            {addr.city}, {addr.state} - {addr.pincode}
          </p>
          <p className="text-xs text-charcoal/80">Phone: {addr.phone}</p>
        </div>

        <div className="p-5 bg-milkglass-300 border border-driftwood-300 space-y-2 text-sm">
          <div className="flex items-center gap-2 font-serif text-base text-evergreen-700 font-medium mb-1">
            <CreditCard className="w-4 h-4 text-mahogany-base" />
            <span>Order Financials</span>
          </div>
          <div className="flex justify-between text-xs text-charcoal/80">
            <span>Subtotal</span>
            <span>{formatCurrency(order.subtotal)}</span>
          </div>
          {order.discount > 0 && (
            <div className="flex justify-between text-xs text-success">
              <span>Discount ({order.couponCode || 'Promo'})</span>
              <span>-{formatCurrency(order.discount)}</span>
            </div>
          )}
          <div className="flex justify-between text-xs text-charcoal/80">
            <span>Delivery Fee</span>
            <span>{order.shippingFee === 0 ? 'Free' : formatCurrency(order.shippingFee)}</span>
          </div>
          <div className="flex justify-between font-serif text-base text-evergreen-700 pt-2 border-t border-driftwood-300">
            <span>Total Paid</span>
            <span className="font-sans font-semibold text-mahogany-base">{formatCurrency(order.total)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
