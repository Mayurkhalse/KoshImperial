import { Router } from 'express';
import passport from 'passport';
import {
  register,
  login,
  refresh,
  logout,
  getMe,
} from '../controllers/auth.controller.js';
import { verifyJWT } from '../middleware/auth.middleware.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { generateTokens } from '../utils/generateToken.js';
import { env } from '../config/env.js';

const router = Router();

router.post('/register', asyncHandler(register));
router.post('/login', asyncHandler(login));
router.post('/refresh', asyncHandler(refresh));
router.post('/logout', verifyJWT, asyncHandler(logout));
router.get('/me', verifyJWT, asyncHandler(getMe));

// Google OAuth
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: `${env.CLIENT_URL}/login?error=oauth_failed`,
    session: false,
  }),
  (req, res) => {
    const { accessToken, refreshToken } = generateTokens(req.user);
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.redirect(`${env.CLIENT_URL}/login?token=${accessToken}`);
  }
);

export default router;
