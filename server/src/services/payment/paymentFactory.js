import { PhonePeGateway } from './PhonePeGateway.js';
import { MockPaymentGateway } from './MockPaymentGateway.js';
import { RazorpayGateway } from './RazorpayGateway.js';
import { env } from '../../config/env.js';

class PaymentFactory {
  constructor() {
    this.gateways = {
      phonepe: new PhonePeGateway(),
      mock: new MockPaymentGateway(),
      razorpay: new RazorpayGateway(),
    };
  }

  getGateway(name) {
    const gatewayName = (name || env.ACTIVE_PAYMENT_GATEWAY || 'mock').toLowerCase();
    const gateway = this.gateways[gatewayName];
    if (!gateway) {
      console.warn(`[PaymentFactory] Gateway "${gatewayName}" not found. Falling back to mock.`);
      return this.gateways.mock;
    }
    return gateway;
  }

  getAvailableMethods() {
    return [
      {
        id: 'phonepe',
        name: 'PhonePe UPI & Cards',
        description: 'Pay securely via UPI, credit/debit cards, or net banking',
        badge: 'Recommended',
        icon: 'phonepe',
        isActive: true,
      },
      {
        id: 'mock',
        name: 'Simulated Sandbox Payment',
        description: 'Instant zero-cost test checkout for evaluation and demonstrations',
        badge: 'Test Mode',
        icon: 'credit-card',
        isActive: true,
      },
    ];
  }
}

export const paymentFactory = new PaymentFactory();
