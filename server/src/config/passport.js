import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { env } from './env.js';
import User from '../models/User.js';

export const configurePassport = () => {
  if (env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET) {
    passport.use(
      new GoogleStrategy(
        {
          clientID: env.GOOGLE_CLIENT_ID,
          clientSecret: env.GOOGLE_CLIENT_SECRET,
          callbackURL: env.GOOGLE_CALLBACK_URL,
        },
        async (accessToken, refreshToken, profile, done) => {
          try {
            const email = profile.emails?.[0]?.value;
            if (!email) {
              return done(new Error('No email found in Google profile'), null);
            }

            let user = await User.findOne({ googleId: profile.id });
            if (!user) {
              user = await User.findOne({ email });
              if (user) {
                user.googleId = profile.id;
                user.authProvider = 'google';
                if (!user.avatarUrl && profile.photos?.[0]?.value) {
                  user.avatarUrl = profile.photos[0].value;
                }
                await user.save();
              } else {
                user = await User.create({
                  name: profile.displayName || 'Google User',
                  email,
                  googleId: profile.id,
                  authProvider: 'google',
                  role: 'customer',
                  avatarUrl: profile.photos?.[0]?.value,
                  isEmailVerified: true,
                });
              }
            }
            return done(null, user);
          } catch (err) {
            return done(err, null);
          }
        }
      )
    );
    console.log('[Passport] Google OAuth strategy registered');
  } else {
    console.log('[Passport] Google OAuth credentials omitted — local auth active');
  }
};
