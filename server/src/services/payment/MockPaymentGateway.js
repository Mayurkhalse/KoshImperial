import { PaymentGateway } from './PaymentGateway.interface.js';
import { env } from '../../config/env.js';

export class MockPaymentGateway extends PaymentGateway {
  async initiate({ amount, orderId, userId }) {
    const merchantTransactionId = `MOCK-TXN-${Date.now()}-${Math.floor(Math.random() * 10000)}`;

    return {
      merchantTransactionId,
      redirectUrl: `${env.CLIENT_URL}/order-confirmation?txn=${merchantTransactionId}&orderId=${orderId}&status=success`,
      gateway: 'mock',
      raw: {
        amount,
        orderId,
        userId,
        simulatedAt: new Date().toISOString(),
        mode: 'MOCK_SANDBOX',
      },
    };
  }

  async verifyCallback(payload) {
    return {
      success: true,
      merchantTransactionId: payload?.merchantTransactionId || `MOCK-${Date.now()}`,
      gatewayTransactionId: `MOCK-GW-${Date.now()}`,
      raw: payload,
    };
  }

  async checkStatus(merchantTransactionId) {
    return {
      status: 'success',
      gatewayTransactionId: `MOCK-GW-${Date.now()}`,
      raw: {
        merchantTransactionId,
        verified: true,
        checkedAt: new Date().toISOString(),
      },
    };
  }
}
