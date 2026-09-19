import React from 'react';
import { X, MapPin, CreditCard, Package } from 'lucide-react';

export const OrderDetailPanel = ({ order, onClose }) => {
  if (!order) return null;

  const addr = order.shippingAddress || {};

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      <div className="fixed inset-0 bg-evergreen-900/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-lg bg-milkglass-100 h-full shadow-2xl z-10 p-8 overflow-y-auto space-y-8 border-l border-driftwood-300">
        <div className="flex items-center justify-between pb-4 border-b border-driftwood-300">
          <div>
            <h3 className="font-serif text-2xl text-evergreen-700 font-normal">
              Order {order.orderNumber}
            </h3>
            <p className="text-xs text-muted-brown">
              Recorded on {new Date(order.createdAt).toLocaleString('en-IN')}
            </p>
          </div>
          <button type="button" onClick={onClose} className="p-1 text-muted-brown hover:text-charcoal">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Customer & Shipping */}
        <div className="p-5 bg-milkglass-300 border border-driftwood-300 space-y-2 text-sm">
          <div className="flex items-center gap-2 font-serif text-base text-evergreen-700 font-medium">
            <MapPin className="w-4 h-4 text-mahogany-base" />
            <span>Shipping Destination</span>
          </div>
          <p className="font-semibold text-charcoal">{addr.fullName}</p>
          <p className="text-xs text-charcoal/80">{addr.line1}</p>
          {addr.line2 && <p className="text-xs text-charcoal/80">{addr.line2}</p>}
          <p className="text-xs text-charcoal/80">
            {addr.city}, {addr.state} — {addr.pincode}
          </p>
          <p className="text-xs text-charcoal/80">Phone: {addr.phone}</p>
        </div>

        {/* Items */}
        <div>
          <h4 className="font-serif text-lg text-evergreen-700 mb-3">Order Items</h4>
          <div className="divide-y divide-driftwood-300 border-t border-b border-driftwood-300">
            {order.items?.map((item, idx) => (
              <div key={idx} className="py-3 flex justify-between items-center text-sm">
                <div>
                  <p className="font-serif text-sm text-evergreen-700 font-medium">{item.name}</p>
                  <p className="text-xs text-muted-brown">Qty: {item.quantity}</p>
                </div>
                <p className="font-sans font-semibold text-mahogany-base">
                  ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Financials */}
        <div className="p-5 bg-milkglass-300 border border-driftwood-300 space-y-2 text-sm">
          <div className="flex justify-between text-xs text-charcoal/80">
            <span>Subtotal</span>
            <span>₹{order.subtotal.toLocaleString('en-IN')}</span>
          </div>
          {order.discount > 0 && (
            <div className="flex justify-between text-xs text-success font-medium">
              <span>Discount</span>
              <span>-₹{order.discount.toLocaleString('en-IN')}</span>
            </div>
          )}
          <div className="flex justify-between text-xs text-charcoal/80">
            <span>Shipping</span>
            <span>{order.shippingFee === 0 ? 'Complimentary' : `₹${order.shippingFee}`}</span>
          </div>
          <div className="flex justify-between font-serif text-lg text-evergreen-700 font-semibold pt-2 border-t border-driftwood-300">
            <span>Grand Total</span>
            <span className="font-sans text-mahogany-base">₹{order.total.toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
