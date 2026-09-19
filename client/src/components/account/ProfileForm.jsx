import React, { useState } from 'react';
import { Input } from '../common/Input.jsx';
import { Button } from '../common/Button.jsx';
import { useAuthStore } from '../../store/authStore.js';
import { useUIStore } from '../../store/uiStore.js';
import api from '../../services/api.js';

export const ProfileForm = () => {
  const { user, setAuth } = useAuthStore();
  const { addToast } = useUIStore();

  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await api.put('/users/me', { name, phone });
      setAuth(res.data.data, localStorage.getItem('ki_access_token'));
      addToast('Profile updated successfully', 'success');
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to update profile', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 bg-milkglass-100 border border-driftwood-300 space-y-6 shadow-luxury">
      <h3 className="font-serif text-2xl text-evergreen-700 font-normal">Personal Information</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Input
          label="Email Address"
          value={user?.email || ''}
          disabled
          helperText="Email address cannot be modified"
        />
        <Input
          label="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+91 98765 43210"
        />
      </div>

      <Button type="submit" variant="primary" isLoading={isLoading}>
        Save Changes
      </Button>
    </form>
  );
};
