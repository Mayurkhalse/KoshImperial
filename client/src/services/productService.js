import api from './api.js';

export const productService = {
  getProducts: async (params = {}) => {
    const res = await api.get('/products', { params });
    return res.data;
  },
  getProductBySlug: async (slug) => {
    const res = await api.get(`/products/${slug}`);
    return res.data;
  },
  getCategories: async () => {
    const res = await api.get('/categories');
    return res.data;
  },
  getProductReviews: async (productId) => {
    const res = await api.get(`/products/${productId}/reviews`);
    return res.data;
  },
  submitReview: async (productId, reviewData) => {
    const res = await api.post(`/products/${productId}/reviews`, reviewData);
    return res.data;
  },
};
