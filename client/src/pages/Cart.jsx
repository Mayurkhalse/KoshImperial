import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart.js';
import { CartItem } from '../components/cart/CartItem.jsx';
import { CartSummary } from '../components/cart/CartSummary.jsx';
import { Breadcrumbs } from '../components/common/Breadcrumbs.jsx';
import { SectionHeading } from '../components/shared/SectionHeading.jsx';
import { Button } from '../components/common/Button.jsx';
import { ShoppingBag } from 'lucide-react';

export const Cart = () => {
  const navigate = useNavigate();
  const { cart, summary, updateQuantity, removeItem, applyCoupon, isApplyingCoupon } = useCart();
  const items = cart?.items || [];

  return (
    <div className="py-12 md:py-20 bg-milkglass-base min-h-screen">
      <div className="max-w-container mx-auto px-4 md:px-8 space-y-6">
        <Breadcrumbs items={[{ label: 'Shopping Bag' }]} />

        <SectionHeading
          eyebrow="YOUR BAG"
          title="Conscious choices ready to"
          accent="journey home."
        />

        {items.length === 0 ? (
          <div className="py-24 text-center bg-milkglass-100 border border-driftwood-300 space-y-4 shadow-luxury">
            <ShoppingBag className="w-12 h-12 text-driftwood-600 mx-auto stroke-[1]" />
            <p className="font-serif text-2xl text-evergreen-700">Your selection is empty</p>
            <p className="text-sm text-muted-brown max-w-sm mx-auto">
              Explore our plantable bi-folds and cardholders to start your sustainable legacy.
            </p>
            <Link to="/shop" className="inline-block pt-2">
              <Button variant="primary" size="md">
                Explore Collection
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-8">
            <div className="lg:col-span-8 bg-milkglass-100 border border-driftwood-300 p-6 md:p-8 shadow-luxury divide-y divide-driftwood-300">
              {items.map((item) => (
                <CartItem
                  key={item._id}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeItem}
                />
              ))}
            </div>

            <div className="lg:col-span-4 bg-milkglass-100 border border-driftwood-300 p-6 md:p-8 shadow-luxury">
              <h3 className="font-serif text-xl text-evergreen-700 pb-4 border-b border-driftwood-300 font-medium">
                Summary
              </h3>
              <CartSummary
                summary={summary}
                onApplyCoupon={applyCoupon}
                isApplyingCoupon={isApplyingCoupon}
                onCheckout={() => navigate('/checkout')}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
