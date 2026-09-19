import { Router } from 'express';
import {
  createOrder,
  getMyOrders,
  getOrderById,
} from '../controllers/order.controller.js';
import { verifyJWT } from '../middleware/auth.middleware.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = Router();

router.use(verifyJWT);

router.post('/', asyncHandler(createOrder));
router.get('/my', asyncHandler(getMyOrders));
router.get('/:id', asyncHandler(getOrderById));

export default router;
