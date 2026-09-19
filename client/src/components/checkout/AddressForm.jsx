import React, { useState } from 'react';
import { Input } from '../common/Input.jsx';
import { Button } from '../common/Button.jsx';

export const AddressForm = ({ initialData = {}, onSubmit, isLoading = false }) => {
  const [formData, setFormData] = useState({
    fullName: initialData.fullName || '',
    phone: initialData.phone || '',
    line1: initialData.line1 || '',
    line2: initialData.line2 || '',
    city: initialData.city || '',
    state: initialData.state || '',
    pincode: initialData.pincode || '',
    country: initialData.country || 'India',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field, val) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.phone.trim() || formData.phone.length < 10)
      newErrors.phone = 'Valid 10-digit phone is required';
    if (!formData.line1.trim()) newErrors.line1 = 'Address line 1 is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.pincode.trim() || formData.pincode.length < 6)
      newErrors.pincode = 'Valid 6-digit pincode is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Recipient Full Name"
          value={formData.fullName}
          onChange={(e) => handleChange('fullName', e.target.value)}
          error={errors.fullName}
          placeholder="e.g. Aarav Sharma"
          required
        />
        <Input
          label="Phone Number (for Courier updates)"
          value={formData.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
          error={errors.phone}
          placeholder="e.g. 9876543210"
          type="tel"
          required
        />
      </div>

      <Input
        label="Street Address / Building"
        value={formData.line1}
        onChange={(e) => handleChange('line1', e.target.value)}
        error={errors.line1}
        placeholder="Flat 402, Green Meadows, MG Road"
        required
      />

      <Input
        label="Apartment, Suite, Landmark (Optional)"
        value={formData.line2}
        onChange={(e) => handleChange('line2', e.target.value)}
        placeholder="Near Eco Park"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input
          label="City"
          value={formData.city}
          onChange={(e) => handleChange('city', e.target.value)}
          error={errors.city}
          placeholder="Bangalore"
          required
        />
        <Input
          label="State"
          value={formData.state}
          onChange={(e) => handleChange('state', e.target.value)}
          error={errors.state}
          placeholder="Karnataka"
          required
        />
        <Input
          label="PIN Code"
          value={formData.pincode}
          onChange={(e) => handleChange('pincode', e.target.value)}
          error={errors.pincode}
          placeholder="560001"
          required
        />
      </div>

      <div className="pt-4">
        <Button type="submit" variant="primary" size="lg" isLoading={isLoading} className="w-full sm:w-auto">
          Continue to Payment
        </Button>
      </div>
    </form>
  );
};
