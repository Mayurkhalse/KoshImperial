import { Router } from 'express';
import { verifyJWT } from '../middleware/auth.middleware.js';
import { isAdmin } from '../middleware/isAdmin.middleware.js';
import { getAllOrders, updateOrderStatus } from '../controllers/order.controller.js';
import { getAllUsers } from '../controllers/user.controller.js';
import {
  getCoupons,
  createCoupon,
  updateCoupon,
  deleteCoupon,
} from '../controllers/coupon.controller.js';
import { updatePageContent } from '../controllers/content.controller.js';
import { getDashboardAnalytics } from '../services/analytics.service.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = Router();

// Enforce admin auth on all routes in this router
router.use(verifyJWT, isAdmin);

// Analytics
router.get(
  '/analytics',
  asyncHandler(async (req, res) => {
    const data = await getDashboardAnalytics();
    return ApiResponse.success(res, data);
  })
);

// Orders
router.get('/orders', asyncHandler(getAllOrders));
router.patch('/orders/:id/status', asyncHandler(updateOrderStatus));

// Users
router.get('/users', asyncHandler(getAllUsers));

// Coupons
router.get('/coupons', asyncHandler(getCoupons));
router.post('/coupons', asyncHandler(createCoupon));
router.put('/coupons/:id', asyncHandler(updateCoupon));
router.delete('/coupons/:id', asyncHandler(deleteCoupon));

// Content (CMS)
router.put('/content/:pageKey', asyncHandler(updatePageContent));

export default router;
