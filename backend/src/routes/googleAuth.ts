import express from 'express';
import passport from 'passport';
import { frontend_config } from '../config';

const router = express.Router();

// 🔹 Start Google Authentication
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// 🔹 Google OAuth Callback
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login', session: true }),
  (req, res) => {
    res.redirect(`${frontend_config}/dashboard`); // Redirect user after login
  }
);

export default router;
