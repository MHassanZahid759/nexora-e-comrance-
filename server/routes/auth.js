import { Router } from 'express';
import { randomBytes, randomUUID, scrypt as scryptCallback, timingSafeEqual } from 'node:crypto';
import { promisify } from 'node:util';
import { OAuth2Client } from 'google-auth-library';
import { dbUsers } from '../db.js';

const router = Router();
const scrypt = promisify(scryptCallback);
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const hashPassword = async (password) => {
  const salt = randomBytes(16).toString('hex');
  const hash = await scrypt(password, salt, 64);
  return `${salt}:${hash.toString('hex')}`;
};

const verifyPassword = async (password, storedHash) => {
  if (!storedHash || typeof storedHash !== 'string') return false;
  const [salt, hashHex] = storedHash.split(':');
  if (!salt || !hashHex) return false;

  const storedKey = Buffer.from(hashHex, 'hex');
  if (storedKey.length !== 64) return false;

  const derivedKey = await scrypt(password, salt, storedKey.length);
  return timingSafeEqual(storedKey, derivedKey);
};

const establishSession = (req, user) => new Promise((resolve, reject) => {
  req.session.regenerate((regenerateError) => {
    if (regenerateError) return reject(regenerateError);

    req.session.userId = user.id;
    req.session.userEmail = user.email;
    req.session.save((saveError) => {
      if (saveError) return reject(saveError);
      resolve();
    });
  });
});

const publicUser = (user) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  avatar: user.avatar,
  provider: user.provider
});

router.post('/register', async (req, res) => {
  const name = typeof req.body.name === 'string' ? req.body.name.trim() : '';
  const email = typeof req.body.email === 'string' ? req.body.email.trim().toLowerCase() : '';
  const password = typeof req.body.password === 'string' ? req.body.password : '';

  if (!name || name.length > 100) {
    return res.status(400).json({ error: 'Enter a name up to 100 characters.' });
  }
  if (email.length > 254 || !EMAIL_PATTERN.test(email)) {
    return res.status(400).json({ error: 'Enter a valid email address.' });
  }
  if (password.length < 8 || password.length > 128) {
    return res.status(400).json({ error: 'Password must be between 8 and 128 characters.' });
  }

  try {
    if (dbUsers.getByEmail(email)) {
      return res.status(409).json({ error: 'An account with this email already exists.' });
    }

    const user = dbUsers.createLocalUser({
      id: `usr_${randomUUID()}`,
      name,
      email,
      passwordHash: await hashPassword(password)
    });
    await establishSession(req, user);
    return res.status(201).json({ success: true, user: publicUser(user) });
  } catch (error) {
    if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      return res.status(409).json({ error: 'An account with this email already exists.' });
    }
    console.error('[auth] Account registration failed:', error.message);
    return res.status(500).json({ error: 'Could not create the account. Please try again.' });
  }
});

router.post('/login', async (req, res) => {
  const email = typeof req.body.email === 'string' ? req.body.email.trim().toLowerCase() : '';
  const password = typeof req.body.password === 'string' ? req.body.password : '';

  if (email.length > 254 || !EMAIL_PATTERN.test(email)) {
    return res.status(400).json({ error: 'Enter a valid email address.' });
  }
  if (!password || password.length > 128) {
    return res.status(400).json({ error: 'Enter your password.' });
  }

  try {
    const user = dbUsers.getByEmail(email);
    if (!user || !(await verifyPassword(password, user.password_hash))) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    await establishSession(req, user);
    return res.json({ success: true, user: publicUser(user) });
  } catch (error) {
    console.error('[auth] Sign-in failed:', error.message);
    return res.status(500).json({ error: 'Could not sign in. Please try again.' });
  }
});

// ---------------------------------------------------------------------------
// Google OAuth2 Client ID
// ---------------------------------------------------------------------------
const GOOGLE_CLIENT_ID =
  process.env.GOOGLE_CLIENT_ID ||
  '633177782845-t6srrr00sdppiobgfv0oj74ubl8a019i.apps.googleusercontent.com';

const client = new OAuth2Client(GOOGLE_CLIENT_ID);

// ---------------------------------------------------------------------------
// POST /api/auth/google
//   Body: { credential: "<Google ID token>" }
//   Verifies the token, upserts the user in SQLite database, creates a session.
// ---------------------------------------------------------------------------
router.post('/google', async (req, res) => {
  const { credential } = req.body;

  if (!credential) {
    return res.status(400).json({ error: 'Missing credential (ID token).' });
  }

  try {
    // 1. Verify the token with Google's official library
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();

    // 2. Extract user info
    const googleSub = payload.sub;           // Stable user identifier
    const email     = payload.email;
    const name      = payload.name  || email.split('@')[0];
    const picture   = payload.picture || null;

    // 3. Upsert user in permanent SQLite database
    const user = dbUsers.upsertGoogleUser({
      id: `usr_g_${googleSub}`,
      googleSub,
      name,
      email,
      avatar: picture
    });

    console.log(`[auth] User authenticated via Google in SQLite DB: ${email}`);

    // 4. Create server-side session
    await establishSession(req, user);
    req.session.googleSub = googleSub;

    // 5. Return the user object (no sensitive data)
    return res.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        provider: user.provider
      }
    });
  } catch (err) {
    console.error('[auth] Google token verification failed:', err.message);
    return res.status(401).json({ error: 'Invalid or expired Google token.' });
  }
});

router.post('/google/access-token', async (req, res) => {
  const { accessToken } = req.body;
  if (typeof accessToken !== 'string' || !accessToken) {
    return res.status(400).json({ error: 'Missing Google access token.' });
  }

  try {
    const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    if (!response.ok) {
      return res.status(401).json({ error: 'Invalid or expired Google access token.' });
    }

    const profile = await response.json();
    if (!profile.sub || !profile.email || profile.email_verified !== true) {
      return res.status(401).json({ error: 'Google did not verify this email address.' });
    }

    const user = dbUsers.upsertGoogleUser({
      id: `usr_g_${profile.sub}`,
      googleSub: profile.sub,
      name: profile.name || profile.email.split('@')[0],
      email: profile.email,
      avatar: profile.picture || null
    });

    await establishSession(req, user);
    req.session.googleSub = profile.sub;
    return res.json({ success: true, user: publicUser(user) });
  } catch (error) {
    console.error('[auth] Google access-token verification failed:', error.message);
    return res.status(401).json({ error: 'Google sign-in could not be verified.' });
  }
});

// ---------------------------------------------------------------------------
// GET /api/auth/me
//   Returns the currently authenticated user from SQLite DB, or 401.
// ---------------------------------------------------------------------------
router.get('/me', (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: 'Not authenticated.' });
  }

  // Look up user from SQLite database
  const user = dbUsers.getById(req.session.userId);
  if (!user) {
    req.session.destroy(() => {});
    return res.status(401).json({ error: 'User not found in database. Session invalidated.' });
  }

  return res.json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      provider: user.provider
    }
  });
});

// ---------------------------------------------------------------------------
// POST /api/auth/logout
//   Destroys the server-side session.
// ---------------------------------------------------------------------------
router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('[auth] Session destroy error:', err);
      return res.status(500).json({ error: 'Failed to logout.' });
    }
    res.clearCookie('nexora.sid');
    return res.json({ success: true, message: 'Logged out successfully.' });
  });
});

export default router;

