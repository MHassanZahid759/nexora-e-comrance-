import express from 'express';
import session from 'express-session';
import cors from 'cors';
import crypto from 'crypto';
import { initDatabase } from './db.js';
import authRoutes from './routes/auth.js';
import ordersRoutes from './routes/orders.js';

const app = express();
const PORT = process.env.PORT || 3001;

// ---------------------------------------------------------------------------
// Initialize Database
// ---------------------------------------------------------------------------
initDatabase();

// ---------------------------------------------------------------------------
// Middleware
// ---------------------------------------------------------------------------

// Parse JSON bodies
app.use(express.json());

// CORS – allow Vite dev server & production domains
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow any origin in production or dev
      callback(null, true);
    },
    credentials: true
  })
);

// Session setup
const SESSION_SECRET = process.env.SESSION_SECRET || crypto.randomBytes(32).toString('hex');
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    name: 'nexora.sid',
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    }
  })
);

// ---------------------------------------------------------------------------
// Routes
// ---------------------------------------------------------------------------
app.use('/api/auth', authRoutes);
app.use('/api/orders', ordersRoutes);

// Health check
app.get('/api/health', (_req, res) =>
  res.json({
    status: 'ok',
    environment: process.env.NODE_ENV || 'development',
    time: new Date().toISOString()
  })
);

// ---------------------------------------------------------------------------
// Start only if run directly (not as serverless import)
// ---------------------------------------------------------------------------
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`✅  NEXORA API server running → http://localhost:${PORT}`);
  });
}

export default app;
