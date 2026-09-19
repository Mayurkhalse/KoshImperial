import api from './api.js';

export const orderService = {
  createOrder: async (orderPayload) => {
    const res = await api.post('/orders', orderPayload);
    return res.data;
  },
  getMyOrders: async () => {
    const res = await api.get('/orders/my');
    return res.data;
  },
  getOrderById: async (id) => {
    const res = await api.get(`/orders/${id}`);
    return res.data;
  },
};
