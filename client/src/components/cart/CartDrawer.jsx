import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../../store/cartStore.js';
import { useCart } from '../../hooks/useCart.js';
import { CartItem } from './CartItem.jsx';
import { CartSummary } from './CartSummary.jsx';
import { X, ShoppingBag } from 'lucide-react';
import { Button } from '../common/Button.jsx';

export const CartDrawer = () => {
  const navigate = useNavigate();
  const { isDrawerOpen, closeDrawer } = useCartStore();
  const { cart, summary, updateQuantity, removeItem, applyCoupon, isApplyingCoupon } = useCart();

  if (!isDrawerOpen) return null;

  const items = cart?.items || [];

  const handleCheckout = () => {
    closeDrawer();
    navigate('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-evergreen-900/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={closeDrawer}
      />

      {/* Slide-in Drawer */}
      <div className="relative w-full max-w-md bg-milkglass-100 h-full shadow-2xl z-10 flex flex-col justify-between border-l border-driftwood-300 animate-slide-in-right">
        {/* Header */}
        <div className="p-6 border-b border-driftwood-300 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-evergreen-700" />
            <h3 className="font-serif text-xl text-evergreen-700 font-medium">
              Your Selection ({items.reduce((s, i) => s + i.quantity, 0)})
            </h3>
          </div>
          <button
            type="button"
            onClick={closeDrawer}
            className="p-1 text-muted-brown hover:text-charcoal transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Item List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-2">
          {items.length === 0 ? (
            <div className="py-20 text-center space-y-4">
              <ShoppingBag className="w-12 h-12 text-driftwood-600 mx-auto stroke-[1]" />
              <p className="font-serif text-xl text-evergreen-700">Your collection is empty</p>
              <p className="text-xs text-muted-brown max-w-xs mx-auto">
                Explore our plantable wallets and handcrafted sustainable goods.
              </p>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  closeDrawer();
                  navigate('/shop');
                }}
              >
                Discover Collection
              </Button>
            </div>
          ) : (
            items.map((item) => (
              <CartItem
                key={item._id}
                item={item}
                onUpdateQuantity={updateQuantity}
                onRemove={removeItem}
              />
            ))
          )}
        </div>

        {/* Footer Summary */}
        {items.length > 0 && (
          <div className="p-6 bg-milkglass-base border-t border-driftwood-300">
            <CartSummary
              summary={summary}
              onApplyCoupon={applyCoupon}
              isApplyingCoupon={isApplyingCoupon}
              onCheckout={handleCheckout}
            />
          </div>
        )}
      </div>
    </div>
  );
};
