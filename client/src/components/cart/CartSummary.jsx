import React, { useState } from 'react';
import { formatCurrency } from '../../utils/formatCurrency.js';
import { Button } from '../common/Button.jsx';
import { Tag } from 'lucide-react';

export const CartSummary = ({ summary, onApplyCoupon, isApplyingCoupon, onCheckout }) => {
  const [couponInput, setCouponInput] = useState('');

  const handleApply = (e) => {
    e.preventDefault();
    if (!couponInput) return;
    onApplyCoupon(couponInput);
    setCouponInput('');
  };

  const subtotal = summary?.subtotal || 0;
  const discount = summary?.discount || 0;
  const shippingFee = summary?.shippingFee || 0;
  const total = summary?.total || 0;

  return (
    <div className="space-y-4 pt-4 border-t border-driftwood-300">
      {/* Coupon form */}
      {onApplyCoupon && (
        <form onSubmit={handleApply} className="flex gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={couponInput}
              onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
              placeholder="Coupon Code"
              className="w-full bg-milkglass-300 uppercase text-xs px-3 py-2.5 pl-8 border border-driftwood-base placeholder:normal-case placeholder:text-muted-brown focus:outline-none focus:border-mahogany-base"
            />
            <Tag className="w-3.5 h-3.5 text-muted-brown absolute left-2.5 top-1/2 -translate-y-1/2" />
          </div>
          <Button type="submit" variant="secondary" size="sm" isLoading={isApplyingCoupon}>
            Apply
          </Button>
        </form>
      )}

      {/* Breakdown */}
      <div className="space-y-2 text-sm">
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

        <div className="pt-2 border-t border-driftwood-300 flex justify-between font-serif text-lg text-evergreen-700 font-medium">
          <span>Total</span>
          <span className="font-sans font-semibold text-mahogany-base">{formatCurrency(total)}</span>
        </div>
      </div>

      {/* Checkout CTA */}
      <Button variant="primary" size="lg" onClick={onCheckout} className="w-full">
        Proceed to Checkout
      </Button>

      {subtotal < 2000 && (
        <p className="text-[11px] text-center text-muted-brown">
          Add {formatCurrency(2000 - subtotal)} more for complimentary express delivery.
        </p>
      )}
    </div>
  );
};
