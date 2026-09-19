import { Router } from 'express';
import {
  getCart,
  addItem,
  updateQuantity,
  removeItem,
  applyCoupon,
} from '../controllers/cart.controller.js';
import { verifyJWT } from '../middleware/auth.middleware.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = Router();

router.use(verifyJWT);

router.get('/', asyncHandler(getCart));
router.post('/items', asyncHandler(addItem));
router.put('/items/:itemId', asyncHandler(updateQuantity));
router.delete('/items/:itemId', asyncHandler(removeItem));
router.post('/apply-coupon', asyncHandler(applyCoupon));

export default router;
