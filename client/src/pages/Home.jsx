import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Hero } from '../components/home/Hero.jsx';
import { BrandStatement } from '../components/home/BrandStatement.jsx';
import { FeaturedCollection } from '../components/home/FeaturedCollection.jsx';
import { ImpactStrip } from '../components/home/ImpactStrip.jsx';
import { EditorialPress } from '../components/home/EditorialPress.jsx';
import { MaterialsSection } from '../components/sustainability/MaterialsSection.jsx';
import { productService } from '../services/productService.js';
import { contentService } from '../services/contentService.js';
import { Modal } from '../components/common/Modal.jsx';
import { ProductInfoPanel } from '../components/product/ProductInfoPanel.jsx';
import { ProductGallery } from '../components/product/ProductGallery.jsx';
import { useUIStore } from '../store/uiStore.js';

export const Home = () => {
  const { quickViewProduct, setQuickViewProduct } = useUIStore();

  const { data: heroContent } = useQuery({
    queryKey: ['content', 'home-hero'],
    queryFn: () => contentService.getPageContent('home-hero'),
  });

  const { data: impactContent } = useQuery({
    queryKey: ['content', 'impact'],
    queryFn: () => contentService.getPageContent('impact'),
  });

  const { data: productsData, isLoading: isProductsLoading } = useQuery({
    queryKey: ['featured-products'],
    queryFn: () => productService.getProducts({ limit: 8 }),
  });

  const products = productsData?.data?.products || [];

  return (
    <div>
      <Hero content={heroContent || {}} />
      <BrandStatement />
      <FeaturedCollection products={products} isLoading={isProductsLoading} onQuickView={setQuickViewProduct} />
      <MaterialsSection />
      <EditorialPress />
      <ImpactStrip data={impactContent || {}} />

      {/* Quick View Modal */}
      <Modal
        isOpen={Boolean(quickViewProduct)}
        onClose={() => setQuickViewProduct(null)}
        maxWidth="max-w-4xl"
      >
        {quickViewProduct && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <ProductGallery images={quickViewProduct.images} />
            <ProductInfoPanel product={quickViewProduct} />
          </div>
        )}
      </Modal>
    </div>
  );
};
