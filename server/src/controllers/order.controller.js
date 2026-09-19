import Order from '../models/Order.js';
import Cart from '../models/Cart.js';
import Product from '../models/Product.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { deductStock } from '../services/inventory.service.js';
import { emailService } from '../services/email.service.js';

export const createOrder = async (req, res) => {
  const { shippingAddress, items: directItems } = req.body;

  if (!shippingAddress) {
    return ApiResponse.error(res, 'Shipping address is required', 400);
  }

  let orderItems = [];
  let subtotal = 0;
  let couponCode = '';
  let discount = 0;

  if (directItems && directItems.length > 0) {
    // Direct buy now
    for (const item of directItems) {
      const product = await Product.findById(item.productId);
      if (!product || !product.isActive) {
        return ApiResponse.error(res, `Product unavailable: ${item.productId}`, 400);
      }
      orderItems.push({
        product: product._id,
        name: product.name,
        variant: item.variant,
        price: product.price,
        quantity: item.quantity,
      });
      subtotal += product.price * item.quantity;
    }
  } else {
    // Create from cart
    const cart = await Cart.findOne({ user: req.user._id })
      .populate('items.product')
      .populate('couponApplied');

    if (!cart || cart.items.length === 0) {
      return ApiResponse.error(res, 'Your cart is empty', 400);
    }

    for (const item of cart.items) {
      if (!item.product || !item.product.isActive) {
        return ApiResponse.error(res, `Item no longer available: ${item.product?.name}`, 400);
      }
      orderItems.push({
        product: item.product._id,
        name: item.product.name,
        variant: item.variant,
        price: item.product.price,
        quantity: item.quantity,
      });
      subtotal += item.product.price * item.quantity;
    }

    if (cart.couponApplied) {
      couponCode = cart.couponApplied.code;
      discount =
        cart.couponApplied.type === 'percentage'
          ? (subtotal * cart.couponApplied.value) / 100
          : cart.couponApplied.value;
    }
  }

  const shippingFee = subtotal > 2000 ? 0 : 150;
  const total = Math.max(0, subtotal - discount + shippingFee);

  const orderNumber = `KI-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;

  const order = await Order.create({
    orderNumber,
    user: req.user._id,
    items: orderItems,
    shippingAddress,
    subtotal,
    discount,
    shippingFee,
    total,
    couponCode,
    status: 'pending',
    statusHistory: [{ status: 'pending', at: new Date() }],
  });

  return ApiResponse.success(res, order, 'Order created successfully', 201);
};

export const getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
    .populate('items.product', 'name images slug')
    .sort({ createdAt: -1 });

  return ApiResponse.success(res, orders);
};

export const getOrderById = async (req, res) => {
  const { id } = req.params;
  const order = await Order.findById(id)
    .populate('items.product', 'name images slug')
    .populate('payment')
    .populate('user', 'name email phone');

  if (!order) {
    return ApiResponse.error(res, 'Order not found', 404);
  }

  // Security check: only order owner or admin can view
  if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    return ApiResponse.error(res, 'Unauthorized to view this order', 403);
  }

  return ApiResponse.success(res, order);
};

export const getAllOrders = async (req, res) => {
  const { status, search, page = 1, limit = 20 } = req.query;
  const query = {};

  if (status) query.status = status;
  if (search) {
    query.$or = [{ orderNumber: { $regex: search, $options: 'i' } }];
  }

  const pageNum = parseInt(page, 10);
  const limitNum = parseInt(limit, 10);
  const skip = (pageNum - 1) * limitNum;

  const [orders, total] = await Promise.all([
    Order.find(query)
      .populate('user', 'name email phone')
      .populate('payment')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum),
    Order.countDocuments(query),
  ]);

  return ApiResponse.success(res, {
    orders,
    pagination: {
      total,
      page: pageNum,
      limit: limitNum,
      pages: Math.ceil(total / limitNum),
    },
  });
};

export const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status, trackingNumber, courierPartner } = req.body;

  const order = await Order.findById(id).populate('user', 'email name');
  if (!order) {
    return ApiResponse.error(res, 'Order not found', 404);
  }

  if (status) {
    order.status = status;
    order.statusHistory.push({ status, at: new Date() });
  }
  if (trackingNumber) order.trackingNumber = trackingNumber;
  if (courierPartner) order.courierPartner = courierPartner;

  await order.save();

  // If order transitioned to confirmed, deduct stock and trigger confirmation email
  if (status === 'confirmed') {
    await deductStock(order.items);
    await emailService.sendOrderConfirmation(order, order.user);
  }

  return ApiResponse.success(res, order, 'Order status updated');
};
