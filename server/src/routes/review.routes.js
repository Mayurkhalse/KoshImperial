import { Router } from 'express';
import {
  getProductReviews,
  createReview,
} from '../controllers/review.controller.js';
import { verifyJWT } from '../middleware/auth.middleware.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = Router({ mergeParams: true });

router.get('/', asyncHandler(getProductReviews));
router.post('/', verifyJWT, asyncHandler(createReview));

export default router;
