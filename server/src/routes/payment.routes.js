import { Router } from 'express';
import {
  getPaymentMethods,
  initiatePayment,
  handleWebhook,
  getPaymentStatus,
} from '../controllers/payment.controller.js';
import { verifyJWT } from '../middleware/auth.middleware.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = Router();

router.get('/methods', asyncHandler(getPaymentMethods));
router.post('/initiate', verifyJWT, asyncHandler(initiatePayment));
router.post('/webhook/:gateway', asyncHandler(handleWebhook));
router.get('/status/:merchantTransactionId', verifyJWT, asyncHandler(getPaymentStatus));

export default router;
