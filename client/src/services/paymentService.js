import api from './api.js';

export const paymentService = {
  getMethods: async () => {
    const res = await api.get('/payments/methods');
    return res.data;
  },
  initiatePayment: async (orderId, gateway) => {
    const res = await api.post('/payments/initiate', { orderId, gateway });
    return res.data;
  },
  getPaymentStatus: async (merchantTransactionId) => {
    const res = await api.get(`/payments/status/${merchantTransactionId}`);
    return res.data;
  },
};
