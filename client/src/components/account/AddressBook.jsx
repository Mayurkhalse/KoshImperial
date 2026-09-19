import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../services/api.js';
import { Button } from '../common/Button.jsx';
import { AddressForm } from '../checkout/AddressForm.jsx';
import { Modal } from '../common/Modal.jsx';
import { useUIStore } from '../../store/uiStore.js';
import { Plus, Trash2, MapPin } from 'lucide-react';

export const AddressBook = () => {
  const queryClient = useQueryClient();
  const { addToast } = useUIStore();
  const [isAddOpen, setIsAddOpen] = useState(false);

  const { data: addressData, isLoading } = useQuery({
    queryKey: ['addresses'],
    queryFn: async () => {
      const res = await api.get('/users/me/addresses');
      return res.data?.data || [];
    },
  });

  const addresses = addressData || [];

  const addMutation = useMutation({
    mutationFn: (newAddr) => api.post('/users/me/addresses', newAddr),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
      addToast('Address added successfully', 'success');
      setIsAddOpen(false);
    },
    onError: (err) => {
      addToast(err.response?.data?.message || 'Failed to add address', 'error');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => api.delete(`/users/me/addresses/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
      addToast('Address removed', 'info');
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-serif text-2xl text-evergreen-700 font-normal">Saved Addresses</h3>
        <Button variant="secondary" size="sm" onClick={() => setIsAddOpen(true)}>
          <Plus className="w-3.5 h-3.5 mr-1.5" />
          Add Address
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {addresses.map((addr) => (
          <div
            key={addr._id}
            className="p-6 bg-milkglass-100 border border-driftwood-300 relative space-y-2 text-sm shadow-luxury"
          >
            <div className="flex items-center justify-between">
              <span className="font-serif text-base text-evergreen-700 font-medium">
                {addr.fullName}
              </span>
              <button
                type="button"
                onClick={() => deleteMutation.mutate(addr._id)}
                className="text-muted-brown hover:text-error p-1"
                title="Delete address"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-charcoal/80">{addr.line1}</p>
            {addr.line2 && <p className="text-xs text-charcoal/80">{addr.line2}</p>}
            <p className="text-xs text-charcoal/80">
              {addr.city}, {addr.state} — {addr.pincode}
            </p>
            <p className="text-xs text-charcoal/80">Phone: {addr.phone}</p>
          </div>
        ))}
      </div>

      <Modal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} title="New Delivery Address">
        <AddressForm onSubmit={(data) => addMutation.mutate(data)} isLoading={addMutation.isPending} />
      </Modal>
    </div>
  );
};
