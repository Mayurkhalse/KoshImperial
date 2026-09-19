import { Router } from 'express';
import {
  getProfile,
  updateProfile,
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
} from '../controllers/user.controller.js';
import { verifyJWT } from '../middleware/auth.middleware.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = Router();

router.use(verifyJWT);

router.get('/me', asyncHandler(getProfile));
router.put('/me', asyncHandler(updateProfile));
router.get('/me/addresses', asyncHandler(getAddresses));
router.post('/me/addresses', asyncHandler(addAddress));
router.put('/me/addresses/:id', asyncHandler(updateAddress));
router.delete('/me/addresses/:id', asyncHandler(deleteAddress));

export default router;
