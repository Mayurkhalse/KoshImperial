import Coupon from '../models/Coupon.js';
import { ApiResponse } from '../utils/apiResponse.js';

export const getCoupons = async (req, res) => {
  const coupons = await Coupon.find().sort({ createdAt: -1 });
  return ApiResponse.success(res, coupons);
};

export const createCoupon = async (req, res) => {
  const coupon = await Coupon.create({
    ...req.body,
    code: req.body.code.toUpperCase(),
  });
  return ApiResponse.success(res, coupon, 'Coupon created', 201);
};

export const updateCoupon = async (req, res) => {
  const { id } = req.params;
  const coupon = await Coupon.findByIdAndUpdate(
    id,
    {
      ...req.body,
      ...(req.body.code && { code: req.body.code.toUpperCase() }),
    },
    { new: true }
  );
  if (!coupon) return ApiResponse.error(res, 'Coupon not found', 404);
  return ApiResponse.success(res, coupon, 'Coupon updated');
};

export const deleteCoupon = async (req, res) => {
  const { id } = req.params;
  await Coupon.findByIdAndDelete(id);
  return ApiResponse.success(res, null, 'Coupon deleted');
};

export const validateCoupon = async (req, res) => {
  const { code, orderAmount = 0 } = req.body;
  if (!code) return ApiResponse.error(res, 'Code required', 400);

  const coupon = await Coupon.findOne({ code: code.toUpperCase(), isActive: true });
  if (!coupon) return ApiResponse.error(res, 'Invalid coupon code', 400);

  if (coupon.expiresAt && new Date() > coupon.expiresAt) {
    return ApiResponse.error(res, 'Coupon expired', 400);
  }

  if (orderAmount < coupon.minOrderValue) {
    return ApiResponse.error(res, `Minimum order amount of ₹${coupon.minOrderValue} required`, 400);
  }

  const discount =
    coupon.type === 'percentage'
      ? (Number(orderAmount) * coupon.value) / 100
      : coupon.value;

  return ApiResponse.success(res, {
    coupon,
    discount,
  });
};
