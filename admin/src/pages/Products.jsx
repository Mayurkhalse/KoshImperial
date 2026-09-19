import React, { useState, useEffect } from 'react';
import api from '../services/api.js';
import { ProductTable } from '../components/products/ProductTable.jsx';
import { ProductForm } from '../components/products/ProductForm.jsx';
import { Plus } from 'lucide-react';

export const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const fetchProducts = () => {
    setIsLoading(true);
    api
      .get('/products?limit=50')
      .then((res) => {
        setProducts(res.data?.data?.products || []);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts();
    api.get('/categories').then((res) => setCategories(res.data?.data || []));
  }, []);

  const handleCreateOrUpdate = async (formData) => {
    setIsSaving(true);
    try {
      if (editingProduct) {
        await api.put(`/products/${editingProduct._id}`, formData);
      } else {
        await api.post('/products', formData);
      }
      setIsModalOpen(false);
      setEditingProduct(null);
      fetchProducts();
    } catch (err) {
      alert(err.response?.data?.message || 'Error saving product');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to archive this product?')) return;
    try {
      await api.delete(`/products/${id}`);
      fetchProducts();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to archive');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs uppercase tracking-[0.2em] text-mahogany-base font-semibold">
            CATALOG MANAGEMENT
          </span>
          <h1 className="font-serif text-3xl text-evergreen-700 font-normal mt-1">
            Plantable Wallets & Goods
          </h1>
        </div>

        <button
          type="button"
          onClick={() => {
            setEditingProduct(null);
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 px-5 py-2.5 bg-evergreen-700 text-milkglass-base hover:bg-mahogany-base text-xs uppercase tracking-wider font-semibold transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>New Product</span>
        </button>
      </div>

      {isLoading ? (
        <p className="text-xs uppercase tracking-widest text-muted-brown">Loading collection...</p>
      ) : (
        <ProductTable
          products={products}
          onEdit={(p) => {
            setEditingProduct(p);
            setIsModalOpen(true);
          }}
          onDelete={handleDelete}
        />
      )}

      {/* Modal for Create/Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-evergreen-900/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="relative w-full max-w-2xl bg-white border border-driftwood-300 p-8 shadow-2xl z-10 max-h-[90vh] overflow-y-auto">
            <h3 className="font-serif text-2xl text-evergreen-700 pb-4 mb-6 border-b border-driftwood-300 font-normal">
              {editingProduct ? 'Edit Artisan Piece' : 'Create New Artisan Piece'}
            </h3>
            <ProductForm
              product={editingProduct}
              categories={categories}
              onSave={handleCreateOrUpdate}
              onCancel={() => setIsModalOpen(false)}
              isLoading={isSaving}
            />
          </div>
        </div>
      )}
    </div>
  );
};
