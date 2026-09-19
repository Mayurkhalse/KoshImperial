import { PaymentGateway } from './PaymentGateway.interface.js';

export class RazorpayGateway extends PaymentGateway {
  async initiate({ amount, orderId, userId }) {
    const merchantTransactionId = `RZP-ORD-${Date.now()}`;
    return {
      merchantTransactionId,
      redirectUrl: `/checkout?gateway=razorpay&orderId=${orderId}`,
      gateway: 'razorpay',
      raw: { note: 'Razorpay gateway adapter placeholder' },
    };
  }

  async verifyCallback(payload) {
    return {
      success: true,
      merchantTransactionId: payload?.razorpay_order_id,
      gatewayTransactionId: payload?.razorpay_payment_id,
      raw: payload,
    };
  }

  async checkStatus(merchantTransactionId) {
    return {
      status: 'success',
      gatewayTransactionId: `RZP-PAY-${Date.now()}`,
      raw: { merchantTransactionId },
    };
  }
}
