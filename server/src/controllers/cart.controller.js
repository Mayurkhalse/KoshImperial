import Cart from '../models/Cart.js';
import Product from '../models/Product.js';
import Coupon from '../models/Coupon.js';
import { ApiResponse } from '../utils/apiResponse.js';

export const getCart = async (req, res) => {
  let cart = await Cart.findOne({ user: req.user._id })
    .populate('items.product', 'name slug price compareAtPrice images stock')
    .populate('couponApplied');

  if (!cart) {
    cart = await Cart.create({ user: req.user._id, items: [] });
  }

  // Calculate totals
  let subtotal = 0;
  cart.items.forEach((item) => {
    const price = item.product?.price || item.priceAtAdd || 0;
    subtotal += price * item.quantity;
  });

  let discount = 0;
  if (cart.couponApplied) {
    if (cart.couponApplied.type === 'percentage') {
      discount = (subtotal * cart.couponApplied.value) / 100;
    } else {
      discount = cart.couponApplied.value;
    }
  }

  const shippingFee = subtotal > 2000 || subtotal === 0 ? 0 : 150;
  const total = Math.max(0, subtotal - discount + shippingFee);

  return ApiResponse.success(res, {
    cart,
    summary: {
      subtotal,
      discount,
      shippingFee,
      total,
    },
  });
};

export const addItem = async (req, res) => {
  const { productId, variant, quantity = 1 } = req.body;

  const product = await Product.findById(productId);
  if (!product || !product.isActive) {
    return ApiResponse.error(res, 'Product not found or unavailable', 404);
  }

  if (product.stock < quantity) {
    return ApiResponse.error(res, `Only ${product.stock} items remaining in stock`, 400);
  }

  let cart = await Cart.findOne({ user: req.user._id });
  if (!cart) {
    cart = new Cart({ user: req.user._id, items: [] });
  }

  const existingItemIndex = cart.items.findIndex(
    (item) =>
      item.product.toString() === productId &&
      item.variant?.name === variant?.name &&
      item.variant?.option === variant?.option
  );

  if (existingItemIndex > -1) {
    cart.items[existingItemIndex].quantity += Number(quantity);
  } else {
    cart.items.push({
      product: productId,
      variant,
      quantity: Number(quantity),
      priceAtAdd: product.price,
    });
  }

  await cart.save();
  return getCart(req, res);
};

export const updateQuantity = async (req, res) => {
  const { itemId } = req.params;
  const { quantity } = req.body;

  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) return ApiResponse.error(res, 'Cart not found', 404);

  const item = cart.items.id(itemId);
  if (!item) return ApiResponse.error(res, 'Cart item not found', 404);

  if (Number(quantity) <= 0) {
    cart.items.pull(itemId);
  } else {
    item.quantity = Number(quantity);
  }

  await cart.save();
  return getCart(req, res);
};

export const removeItem = async (req, res) => {
  const { itemId } = req.params;

  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) return ApiResponse.error(res, 'Cart not found', 404);

  cart.items.pull(itemId);
  await cart.save();

  return getCart(req, res);
};

export const applyCoupon = async (req, res) => {
  const { code } = req.body;
  if (!code) return ApiResponse.error(res, 'Coupon code is required', 400);

  const coupon = await Coupon.findOne({
    code: code.toUpperCase(),
    isActive: true,
  });

  if (!coupon) {
    return ApiResponse.error(res, 'Invalid coupon code', 400);
  }

  if (coupon.expiresAt && new Date() > coupon.expiresAt) {
    return ApiResponse.error(res, 'This coupon has expired', 400);
  }

  const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
  if (!cart || cart.items.length === 0) {
    return ApiResponse.error(res, 'Cart is empty', 400);
  }

  const subtotal = cart.items.reduce((sum, item) => sum + (item.product?.price || 0) * item.quantity, 0);
  if (subtotal < coupon.minOrderValue) {
    return ApiResponse.error(res, `Minimum order value of ₹${coupon.minOrderValue} required for this coupon`, 400);
  }

  cart.couponApplied = coupon._id;
  await cart.save();

  return getCart(req, res);
};
