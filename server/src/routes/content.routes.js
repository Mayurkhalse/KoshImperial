import { Router } from 'express';
import { getPageContent, updatePageContent } from '../controllers/content.controller.js';
import { verifyJWT } from '../middleware/auth.middleware.js';
import { isAdmin } from '../middleware/isAdmin.middleware.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = Router();

router.get('/:pageKey', asyncHandler(getPageContent));
router.put('/:pageKey', verifyJWT, isAdmin, asyncHandler(updatePageContent));

export default router;
