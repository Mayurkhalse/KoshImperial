import { Router } from 'express';
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../controllers/category.controller.js';
import { verifyJWT } from '../middleware/auth.middleware.js';
import { isAdmin } from '../middleware/isAdmin.middleware.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = Router();

router.get('/', asyncHandler(getCategories));
router.post('/', verifyJWT, isAdmin, asyncHandler(createCategory));
router.put('/:id', verifyJWT, isAdmin, asyncHandler(updateCategory));
router.delete('/:id', verifyJWT, isAdmin, asyncHandler(deleteCategory));

export default router;
