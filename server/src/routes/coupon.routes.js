import { Router } from 'express';
import { validateCoupon } from '../controllers/coupon.controller.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = Router();

router.post('/validate', asyncHandler(validateCoupon));

export default router;
