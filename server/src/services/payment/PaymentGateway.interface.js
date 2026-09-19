/**
 * PaymentGateway Base Interface
 * Defines the contract that all payment gateway adapters (PhonePe, Razorpay, Mock) must satisfy.
 */
export class PaymentGateway {
  /**
   * Initiate payment with the gateway
   * @param {Object} params
   * @param {number} params.amount - in rupees
   * @param {string} params.orderId - Kosh Imperial Order ID
   * @param {string} params.userId - User ID
   * @param {string} params.userPhone - User Phone number
   * @returns {Promise<{ merchantTransactionId: string, redirectUrl: string, gateway: string }>}
   */
  async initiate(params) {
    throw new Error('Method initiate() must be implemented');
  }

  /**
   * Verify callback payload & signature from gateway webhook/redirect
   * @param {Object} payload
   * @param {Object} headers
   * @returns {Promise<{ success: boolean, merchantTransactionId: string, gatewayTransactionId?: string, raw: any }>}
   */
  async verifyCallback(payload, headers) {
    throw new Error('Method verifyCallback() must be implemented');
  }

  /**
   * Poll status of a transaction
   * @param {string} merchantTransactionId
   * @returns {Promise<{ status: 'initiated'|'pending'|'success'|'failed', gatewayTransactionId?: string, raw: any }>}
   */
  async checkStatus(merchantTransactionId) {
    throw new Error('Method checkStatus() must be implemented');
  }
}
