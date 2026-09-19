import Payment from '../models/Payment.js';
import Order from '../models/Order.js';
import Cart from '../models/Cart.js';
import { paymentFactory } from '../services/payment/paymentFactory.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { deductStock } from '../services/inventory.service.js';
import { emailService } from '../services/email.service.js';

export const getPaymentMethods = async (req, res) => {
  const methods = paymentFactory.getAvailableMethods();
  return ApiResponse.success(res, methods);
};

export const initiatePayment = async (req, res) => {
  const { orderId, gateway: chosenGateway } = req.body;

  const order = await Order.findById(orderId).populate('user', 'email name phone');
  if (!order) {
    return ApiResponse.error(res, 'Order not found', 404);
  }

  const gatewayAdapter = paymentFactory.getGateway(chosenGateway);

  const initResult = await gatewayAdapter.initiate({
    amount: order.total,
    orderId: order._id.toString(),
    userId: order.user._id.toString(),
    userPhone: order.user.phone,
  });

  const payment = await Payment.create({
    order: order._id,
    gateway: initResult.gateway,
    merchantTransactionId: initResult.merchantTransactionId,
    amount: order.total,
    currency: 'INR',
    status: 'initiated',
    rawResponse: initResult.raw,
  });

  order.payment = payment._id;
  await order.save();

  return ApiResponse.success(res, {
    paymentId: payment._id,
    merchantTransactionId: initResult.merchantTransactionId,
    redirectUrl: initResult.redirectUrl,
    gateway: initResult.gateway,
  });
};

export const handleWebhook = async (req, res) => {
  const { gateway: gatewayName } = req.params;
  const gatewayAdapter = paymentFactory.getGateway(gatewayName);

  const verification = await gatewayAdapter.verifyCallback(req.body, req.headers);

  const payment = await Payment.findOne({
    merchantTransactionId: verification.merchantTransactionId,
  });

  if (!payment) {
    return ApiResponse.error(res, 'Payment transaction record not found', 404);
  }

  payment.status = verification.success ? 'success' : 'failed';
  if (verification.gatewayTransactionId) {
    payment.gatewayTransactionId = verification.gatewayTransactionId;
  }
  payment.rawResponse = verification.raw;
  await payment.save();

  const order = await Order.findById(payment.order).populate('user');
  if (order && verification.success) {
    order.status = 'confirmed';
    order.statusHistory.push({ status: 'confirmed', at: new Date() });
    await order.save();

    // Deduct stock and clear user cart
    await deductStock(order.items);
    await Cart.findOneAndUpdate({ user: order.user._id }, { items: [], couponApplied: null });
    await emailService.sendOrderConfirmation(order, order.user);
  }

  return ApiResponse.success(res, { verified: verification.success });
};

export const getPaymentStatus = async (req, res) => {
  const { merchantTransactionId } = req.params;

  const payment = await Payment.findOne({ merchantTransactionId }).populate('order');
  if (!payment) {
    return ApiResponse.error(res, 'Payment record not found', 404);
  }

  const gatewayAdapter = paymentFactory.getGateway(payment.gateway);
  const statusCheck = await gatewayAdapter.checkStatus(merchantTransactionId);

  if (statusCheck.status && statusCheck.status !== payment.status) {
    payment.status = statusCheck.status;
    if (statusCheck.gatewayTransactionId) {
      payment.gatewayTransactionId = statusCheck.gatewayTransactionId;
    }
    await payment.save();

    if (payment.status === 'success' && payment.order) {
      const order = await Order.findById(payment.order._id).populate('user');
      if (order && order.status === 'pending') {
        order.status = 'confirmed';
        order.statusHistory.push({ status: 'confirmed', at: new Date() });
        await order.save();
        await deductStock(order.items);
        await Cart.findOneAndUpdate({ user: order.user._id }, { items: [], couponApplied: null });
        await emailService.sendOrderConfirmation(order, order.user);
      }
    }
  }

  return ApiResponse.success(res, {
    status: payment.status,
    merchantTransactionId,
    gatewayTransactionId: payment.gatewayTransactionId,
    amount: payment.amount,
    order: payment.order,
  });
};
