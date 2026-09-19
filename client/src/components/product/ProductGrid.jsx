import React from 'react';
import { ProductCard } from './ProductCard.jsx';
import { Loader } from '../common/Loader.jsx';

export const ProductGrid = ({ products = [], isLoading = false, onQuickView }) => {
  if (isLoading) {
    return <Loader label="Curating sustainable collection..." size="lg" />;
  }

  if (products.length === 0) {
    return (
      <div className="py-20 text-center space-y-3">
        <p className="font-serif text-2xl text-evergreen-700">No items match your selection</p>
        <p className="text-sm text-muted-brown">Try resetting your filters or exploring our other sustainable pieces.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6 md:gap-8">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} onQuickView={onQuickView} />
      ))}
    </div>
  );
};
