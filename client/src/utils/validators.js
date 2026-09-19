import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const registerSchema = z.object({
  name: z.string().min(2, 'Full name is required'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  phone: z.string().optional(),
});

export const addressSchema = z.object({
  fullName: z.string().min(2, 'Recipient name is required'),
  phone: z.string().min(10, 'Valid 10-digit phone number is required'),
  line1: z.string().min(5, 'Street address line 1 is required'),
  line2: z.string().optional(),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  pincode: z.string().min(6, 'Valid 6-digit postal code required'),
  country: z.string().default('India'),
  isDefault: z.boolean().default(false),
});
