import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProductDetail } from '../hooks/useProducts.js';
import { ProductGallery } from '../components/product/ProductGallery.jsx';
import { ProductInfoPanel } from '../components/product/ProductInfoPanel.jsx';
import { ReviewSection } from '../components/product/ReviewSection.jsx';
import { Breadcrumbs } from '../components/common/Breadcrumbs.jsx';
import { Loader } from '../components/common/Loader.jsx';

export const ProductDetail = () => {
  const { slug } = useParams();
  const { data: productData, isLoading, error } = useProductDetail(slug);

  if (isLoading) {
    return (
      <div className="py-32 flex justify-center">
        <Loader label="Opening artisan archive..." size="lg" />
      </div>
    );
  }

  const product = productData?.data?.product || productData?.data || productData;

  if (error || !product) {
    return (
      <div className="py-32 text-center space-y-4">
        <p className="font-serif text-3xl text-evergreen-700">Piece Not Found</p>
        <p className="text-sm text-muted-brown">
          The requested item is either retired or does not exist.
        </p>
        <Link
          to="/shop"
          className="inline-block text-xs uppercase tracking-widest text-mahogany-base font-semibold underline"
        >
          Return to All Collections
        </Link>
      </div>
    );
  }

  return (
    <div className="py-6 sm:py-12 md:py-20 bg-milkglass-base min-h-screen">
      <div className="max-w-container mx-auto px-3.5 sm:px-6 md:px-8 space-y-10 sm:space-y-16">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: 'Shop', href: '/shop' },
            { label: product.name },
          ]}
        />

        {/* Product Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-7">
            <ProductGallery images={product.images} />
          </div>

          <div className="lg:col-span-5">
            <ProductInfoPanel product={product} />
          </div>
        </div>

        {/* Detailed Material Description */}
        <div className="pt-10 sm:pt-16 border-t border-driftwood-300 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <div className="space-y-2">
            <h3 className="font-serif text-xl text-evergreen-700 font-medium">Heirloom Construction</h3>
            <p className="text-sm text-charcoal/80 leading-relaxed font-sans">
              Hand-cut and assembled by multi-generational leather artisans who have transitioned their
              revered skills to cruelty-free bio-leather matrices.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-serif text-xl text-evergreen-700 font-medium">Viable Seeds Embedded</h3>
            <p className="text-sm text-charcoal/80 leading-relaxed font-sans">
              Contains organic wildflower seeds sheltered within non-acidic cotton paper fibers that
              stay dormant for over a decade in your pocket.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-serif text-xl text-evergreen-700 font-medium">Natural Botanical Dye</h3>
            <p className="text-sm text-charcoal/80 leading-relaxed font-sans">
              Finished with unbleached organic beeswax and steeped in botanical tannin baths derived from
              wild tree bark and tea leaves.
            </p>
          </div>
        </div>

        {/* Reviews */}
        <ReviewSection productId={product._id} />
      </div>
    </div>
  );
};
