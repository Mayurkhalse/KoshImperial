import React, { useState, useEffect } from 'react';
import api from '../services/api.js';
import { CouponTable } from '../components/coupons/CouponTable.jsx';
import { CouponForm } from '../components/coupons/CouponForm.jsx';
import { Plus } from 'lucide-react';

export const Coupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const fetchCoupons = () => {
    setIsLoading(true);
    api
      .get('/admin/coupons')
      .then((res) => {
        setCoupons(res.data?.data || []);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const handleCreateCoupon = async (formData) => {
    setIsSaving(true);
    try {
      await api.post('/admin/coupons', formData);
      setIsModalOpen(false);
      fetchCoupons();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to create coupon');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteCoupon = async (id) => {
    if (!window.confirm('Delete this coupon?')) return;
    try {
      await api.delete(`/admin/coupons/${id}`);
      fetchCoupons();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete coupon');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs uppercase tracking-[0.2em] text-mahogany-base font-semibold">
            PROMOTIONS & CODES
          </span>
          <h1 className="font-serif text-3xl text-evergreen-700 font-normal mt-1">
            Discount Coupons
          </h1>
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-evergreen-700 text-milkglass-base hover:bg-mahogany-base text-xs uppercase tracking-wider font-semibold transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>New Coupon</span>
        </button>
      </div>

      {isLoading ? (
        <p className="text-xs uppercase tracking-widest text-muted-brown">Loading coupons...</p>
      ) : (
        <CouponTable coupons={coupons} onDelete={handleDeleteCoupon} />
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-evergreen-900/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="relative w-full max-w-md bg-white border border-driftwood-300 p-8 shadow-2xl z-10">
            <h3 className="font-serif text-2xl text-evergreen-700 pb-4 mb-6 border-b border-driftwood-300 font-normal">
              Create Promotional Code
            </h3>
            <CouponForm
              onSave={handleCreateCoupon}
              onCancel={() => setIsModalOpen(false)}
              isLoading={isSaving}
            />
          </div>
        </div>
      )}
    </div>
  );
};
