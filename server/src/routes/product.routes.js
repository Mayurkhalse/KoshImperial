import { Router } from 'express';
import {
  getProducts,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/product.controller.js';
import { verifyJWT } from '../middleware/auth.middleware.js';
import { isAdmin } from '../middleware/isAdmin.middleware.js';
import { upload } from '../middleware/upload.middleware.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = Router();

router.get('/', asyncHandler(getProducts));
router.get('/:slug', asyncHandler(getProductBySlug));
router.post('/', verifyJWT, isAdmin, upload.array('images', 6), asyncHandler(createProduct));
router.put('/:id', verifyJWT, isAdmin, upload.array('images', 6), asyncHandler(updateProduct));
router.delete('/:id', verifyJWT, isAdmin, asyncHandler(deleteProduct));

export default router;
