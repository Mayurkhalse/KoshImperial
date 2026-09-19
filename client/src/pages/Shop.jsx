import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts, useCategories } from '../hooks/useProducts.js';
import { ProductGrid } from '../components/product/ProductGrid.jsx';
import { ProductFilterBar } from '../components/product/ProductFilterBar.jsx';
import { Breadcrumbs } from '../components/common/Breadcrumbs.jsx';
import { SectionHeading } from '../components/shared/SectionHeading.jsx';
import { Modal } from '../components/common/Modal.jsx';
import { ProductInfoPanel } from '../components/product/ProductInfoPanel.jsx';
import { ProductGallery } from '../components/product/ProductGallery.jsx';
import { useDebounce } from '../hooks/useDebounce.js';
import { useUIStore } from '../store/uiStore.js';

export const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || '';
  const [activeCategory, setActiveCategory] = useState(categoryParam);
  const [sortBy, setSortBy] = useState('featured');
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 300);

  const { quickViewProduct, setQuickViewProduct } = useUIStore();

  const { data: categoriesData } = useCategories();
  const categories = categoriesData?.data || [];

  const { data: productsData, isLoading } = useProducts({
    category: activeCategory || undefined,
    sort: sortBy,
    search: debouncedSearch || undefined,
  });

  const products = productsData?.data?.products || [];

  const handleCategoryChange = (catSlug) => {
    setActiveCategory(catSlug);
    if (catSlug) {
      setSearchParams({ category: catSlug });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="py-6 md:py-20 bg-milkglass-base min-h-screen">
      <div className="max-w-container mx-auto px-3.5 sm:px-6 md:px-8 space-y-4 sm:space-y-6">
        <Breadcrumbs items={[{ label: 'Shop Catalog' }]} />

        <SectionHeading
          eyebrow="THE FULL CATALOG"
          title="Handcrafted plantable wallets &"
          accent="circular goods."
          subtitle="Explore our complete range of plant-fiber cardholders, bi-folds, and travel accessories engineered to biodegrade gracefully."
        />

        <ProductFilterBar
          categories={categories}
          activeCategory={activeCategory}
          onSelectCategory={handleCategoryChange}
          sortBy={sortBy}
          onSelectSort={setSortBy}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        <ProductGrid
          products={products}
          isLoading={isLoading}
          onQuickView={setQuickViewProduct}
        />

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
    </div>
  );
};
