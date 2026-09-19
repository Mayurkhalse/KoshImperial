import React, { useState } from 'react';
import { formatCurrency } from '../../utils/formatCurrency.js';
import { Button } from '../common/Button.jsx';
import { Badge } from '../common/Badge.jsx';
import { SizeMaterialSelector } from './SizeMaterialSelector.jsx';
import { useCart } from '../../hooks/useCart.js';
import { Sprout, ShieldCheck, Truck, Plus, Minus } from 'lucide-react';

export const ProductInfoPanel = ({ product }) => {
  const { addItem, isAdding } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants?.[0]
      ? { name: product.variants[0].name, option: product.variants[0].options?.[0] }
      : null
  );

  const handleAddToCart = () => {
    addItem({
      productId: product._id,
      variant: selectedVariant,
      quantity,
    });
  };

  return (
    <div className="space-y-6 lg:pl-6">
      {/* Category & Tags */}
      <div>
        <p className="text-xs uppercase tracking-[0.15em] font-sans font-semibold text-mahogany-base mb-2">
          {product.category?.name || 'Sustainable Lifestyle'}
        </p>
        <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl text-evergreen-700 font-normal leading-tight">
          {product.name}
        </h1>
      </div>

      {/* Pricing */}
      <div className="flex items-center gap-3 pt-1">
        <span className="font-sans text-2xl sm:text-3xl font-semibold text-mahogany-base">
          {formatCurrency(product.price)}
        </span>
        {product.compareAtPrice && product.compareAtPrice > product.price && (
          <>
            <span className="text-base text-muted-brown line-through font-sans">
              {formatCurrency(product.compareAtPrice)}
            </span>
            <Badge variant="pill" className="!text-[11px] !text-mahogany-base">
              Save {Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)}%
            </Badge>
          </>
        )}
      </div>

      {/* Description */}
      <p className="text-sm md:text-base text-charcoal/85 leading-relaxed font-sans pt-1">
        {product.shortDescription || product.description}
      </p>

      {/* Sustainability & Material Badges */}
      <div className="flex flex-wrap gap-2 pt-2">
        {product.sustainabilityTags?.map((tag, idx) => (
          <Badge key={idx} variant="tag">
            {tag}
          </Badge>
        ))}
      </div>

      {/* Variant Selector */}
      <SizeMaterialSelector
        variants={product.variants}
        selectedVariant={selectedVariant}
        onSelectVariant={setSelectedVariant}
      />

      {/* Quantity & CTA */}
      <div className="pt-4 space-y-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center border border-driftwood-base bg-milkglass-300">
            <button
              type="button"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-3 text-evergreen-700 hover:text-mahogany-base"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="px-4 text-sm font-semibold text-charcoal select-none">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity(quantity + 1)}
              className="p-3 text-evergreen-700 hover:text-mahogany-base"
              aria-label="Increase quantity"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          <Button
            variant="primary"
            size="lg"
            onClick={handleAddToCart}
            isLoading={isAdding}
            disabled={product.stock <= 0}
            className="flex-1"
          >
            {product.stock > 0 ? 'Add to Collection' : 'Currently Retired'}
          </Button>
        </div>

        {product.stock <= 5 && product.stock > 0 && (
          <p className="text-xs text-warning font-medium">
            Only {product.stock} pieces remaining in this artisan batch.
          </p>
        )}
      </div>

      {/* Plantable Instructions Feature Card */}
      <div className="mt-8 p-5 bg-milkglass-300 border border-driftwood-300 space-y-3">
        <div className="flex items-center gap-2 text-evergreen-700 font-serif text-base font-medium">
          <Sprout className="w-5 h-5 text-mahogany-base shrink-0" />
          <span>The Plantable Promise</span>
        </div>
        <p className="text-xs text-charcoal/80 leading-relaxed font-sans">
          This piece features structural seed paper infused with non-GMO wildflower seeds. When you
          choose to retire this wallet, moisten it, plant it under potting soil, and nurture it with sunlight.
        </p>
      </div>

      {/* Value props */}
      <div className="pt-4 border-t border-driftwood-300 grid grid-cols-2 gap-4 text-xs text-muted-brown">
        <div className="flex items-center gap-2">
          <Truck className="w-4 h-4 text-evergreen-700 shrink-0" />
          <span>Complimentary express delivery</span>
        </div>
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-evergreen-700 shrink-0" />
          <span>Artisan craft guarantee</span>
        </div>
      </div>
    </div>
  );
};
