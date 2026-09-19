import api from './api.js';

export const cartService = {
  getCart: async () => {
    const res = await api.get('/cart');
    return res.data;
  },
  addItem: async (productId, variant, quantity = 1) => {
    const res = await api.post('/cart/items', { productId, variant, quantity });
    return res.data;
  },
  updateQuantity: async (itemId, quantity) => {
    const res = await api.put(`/cart/items/${itemId}`, { quantity });
    return res.data;
  },
  removeItem: async (itemId) => {
    const res = await api.delete(`/cart/items/${itemId}`);
    return res.data;
  },
  applyCoupon: async (code) => {
    const res = await api.post('/cart/apply-coupon', { code });
    return res.data;
  },
};
