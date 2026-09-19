import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../../utils/formatCurrency.js';
import { ShoppingBag, Eye, Star, Sprout } from 'lucide-react';
import { useCart } from '../../hooks/useCart.js';
import { useUIStore } from '../../store/uiStore.js';

const FALLBACK_IMAGE = '/images/products/evergreen-bifold.jpg';

export const ProductCard = ({ product, onQuickView }) => {
  const { addItem, isAdding } = useCart();
  const { setQuickViewProduct } = useUIStore();
  const [imgSrc, setImgSrc] = useState(
    product?.images?.[0]?.url || FALLBACK_IMAGE
  );
  const [isHovered, setIsHovered] = useState(false);

  if (!product) return null;

  const secondaryImage = product.images?.[1]?.url;

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const defaultVariant = product.variants?.[0]
      ? { name: product.variants[0].name, option: product.variants[0].options?.[0] }
      : undefined;
    addItem({ productId: product._id, variant: defaultVariant, quantity: 1 });
  };

  const handleQuickViewClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onQuickView) {
      onQuickView(product);
    } else {
      setQuickViewProduct(product);
    }
  };

  const discountPercent =
    product.compareAtPrice && product.compareAtPrice > product.price
      ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
      : null;

  return (
    <div
      className="group relative bg-[#FDFCF7] border border-driftwood-300/80 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-luxury-hover hover:border-evergreen-500/40 hover:-translate-y-1 flex flex-col h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Area */}
      <div className="relative aspect-[4/5] bg-driftwood-300/30 overflow-hidden block">
        {/* Link wraps only the image */}
        <Link
          to={`/product/${product.slug}`}
          className="absolute inset-0 z-0 block focus:outline-none"
          aria-label={`View details for ${product.name}`}
        >
          <img
            src={isHovered && secondaryImage ? secondaryImage : imgSrc}
            alt={product.name}
            onError={() => setImgSrc(FALLBACK_IMAGE)}
            className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />

          {/* Ambient Subtle Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-evergreen-900/20 via-transparent to-black/5 opacity-40 group-hover:opacity-60 transition-opacity" />
        </Link>

        {/* Badges (Non-interactive overlay) */}
        <div className="absolute top-2 left-2 sm:top-3 sm:left-3 flex flex-col items-start gap-1 sm:gap-1.5 z-10 pointer-events-none">
          {product.sustainabilityTags?.[0] && (
            <span className="inline-flex items-center gap-1 backdrop-blur-md bg-milkglass-base/95 text-evergreen-700 border border-driftwood-300/80 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-semibold tracking-wider uppercase shadow-sm">
              <Sprout className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-evergreen-500" />
              <span className="truncate max-w-[85px] sm:max-w-none">{product.sustainabilityTags[0]}</span>
            </span>
          )}
          {discountPercent && (
            <span className="backdrop-blur-md bg-mahogany-base/90 text-milkglass-base px-2 py-0.5 sm:px-2.5 sm:py-0.5 rounded-full text-[9px] sm:text-[10px] font-semibold tracking-wider uppercase shadow-sm">
              Save {discountPercent}%
            </span>
          )}
        </div>

        {/* Desktop Quick Action Overlay on Hover (hidden on mobile, visible on md+) */}
        <div className="hidden md:flex absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-evergreen-900/85 via-evergreen-900/45 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out items-center gap-2 z-20">
          <button
            type="button"
            onClick={handleQuickViewClick}
            className="p-2.5 bg-milkglass-base/95 hover:bg-milkglass-base text-evergreen-700 hover:text-mahogany-base rounded-lg transition-colors shadow-md touch-manipulation"
            title="Quick View"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleQuickAdd}
            disabled={isAdding || product.stock <= 0}
            className="flex-1 py-2.5 px-3 bg-evergreen-700 hover:bg-mahogany-base text-milkglass-base rounded-lg transition-colors text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 shadow-md disabled:opacity-50 touch-manipulation"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>{product.stock > 0 ? (isAdding ? 'Adding...' : 'Quick Add') : 'Out of Stock'}</span>
          </button>
        </div>
      </div>

      {/* Card Information */}
      <div className="p-3 sm:p-5 flex flex-col flex-1 justify-between bg-[#FDFCF7]">
        <div>
          <div className="flex items-center justify-between gap-1 mb-1 sm:mb-1.5">
            <span className="text-[10px] sm:text-[11px] uppercase tracking-wider sm:tracking-widest text-muted-brown font-semibold truncate">
              {product.category?.name || 'Plantable Leather'}
            </span>
            {product.ratingsAverage > 0 && (
              <span className="text-[10px] sm:text-xs text-charcoal/80 flex items-center gap-0.5 sm:gap-1 font-medium shrink-0">
                <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-warning text-warning" />
                <span>{product.ratingsAverage.toFixed(1)}</span>
                <span className="text-[9px] sm:text-[10px] text-muted-brown">({product.ratingsCount})</span>
              </span>
            )}
          </div>

          <Link to={`/product/${product.slug}`} className="group/title block">
            <h3 className="font-serif text-sm sm:text-base md:text-lg text-evergreen-700 font-medium leading-snug group-hover/title:text-mahogany-base transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>

          {product.shortDescription && (
            <p className="hidden sm:block text-xs text-charcoal/70 line-clamp-2 mt-1.5 leading-relaxed font-sans">
              {product.shortDescription}
            </p>
          )}
        </div>

        {/* Pricing & Stock Status */}
        <div className="mt-2.5 sm:mt-4 pt-2 sm:pt-3.5 border-t border-driftwood-300/70">
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-1.5 sm:gap-2">
              <span className="font-sans font-bold text-mahogany-base text-sm sm:text-base">
                {formatCurrency(product.price)}
              </span>
              {product.compareAtPrice && product.compareAtPrice > product.price && (
                <span className="text-[10px] sm:text-xs text-muted-brown line-through">
                  {formatCurrency(product.compareAtPrice)}
                </span>
              )}
            </div>

            <span className="text-[10px] sm:text-[11px] font-medium tracking-wide text-evergreen-500 uppercase">
              {product.stock > 0 ? 'In Stock' : 'Sold Out'}
            </span>
          </div>

          {/* VISIBLE MOBILE QUICK ADD BUTTON */}
          <button
            type="button"
            onClick={handleQuickAdd}
            disabled={isAdding || product.stock <= 0}
            className="mt-2.5 w-full py-2 px-2.5 bg-evergreen-700 active:bg-mahogany-base hover:bg-evergreen-900 text-milkglass-base rounded-lg text-[11px] sm:text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-sm transition-all active:scale-[0.98] disabled:opacity-50 touch-manipulation md:hidden"
            aria-label={`Quick add ${product.name} to cart`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>{product.stock > 0 ? (isAdding ? 'Adding...' : 'Quick Add') : 'Sold Out'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
