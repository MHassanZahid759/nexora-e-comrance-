import path from 'path';
import fs from 'fs';
import os from 'os';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Determine database path based on environment (Vercel has read-only filesystem except /tmp)
let dbPath;
const isVercel = Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME);

if (isVercel) {
  dbPath = path.join(os.tmpdir(), 'nexora.sqlite');
} else {
  dbPath = path.resolve(__dirname, 'nexora.sqlite');
}

let db = null;
let isInMemoryFallback = false;

// In-memory collections as universal fallback
const memoryStore = {
  users: new Map(),
  orders: new Map(),
  orderItems: []
};

try {
  const DatabaseModule = await import('better-sqlite3');
  const Database = DatabaseModule.default || DatabaseModule;
  db = new Database(dbPath);
  db.pragma('journal_mode = WAL');
  db.pragma('foreign_keys = ON');
} catch (err) {
  console.warn('⚠️ SQLite native module not available in this environment. Using in-memory fallback store:', err.message);
  isInMemoryFallback = true;
}

// ---------------------------------------------------------------------------
// Database Schema Initialization
// ---------------------------------------------------------------------------
export function initDatabase() {
  if (isInMemoryFallback || !db) {
    console.log('📦 In-memory store ready for serverless runtime');
    return;
  }

  try {
    // 1. Users Table
    db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        google_sub TEXT UNIQUE,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password_hash TEXT,
        avatar TEXT,
        provider TEXT DEFAULT 'local',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    const userColumns = db.prepare('PRAGMA table_info(users)').all();
    if (!userColumns.some((column) => column.name === 'password_hash')) {
      db.exec('ALTER TABLE users ADD COLUMN password_hash TEXT');
    }

    // 2. Orders Table
    db.exec(`
      CREATE TABLE IF NOT EXISTS orders (
        id TEXT PRIMARY KEY,
        user_id TEXT,
        customer_name TEXT NOT NULL,
        customer_email TEXT NOT NULL,
        shipping_address TEXT NOT NULL,
        city TEXT NOT NULL,
        state TEXT NOT NULL,
        zip_code TEXT NOT NULL,
        payment_method TEXT NOT NULL,
        subtotal REAL NOT NULL,
        discount REAL DEFAULT 0,
        shipping_cost REAL DEFAULT 0,
        total REAL NOT NULL,
        currency TEXT DEFAULT 'USD',
        status TEXT DEFAULT 'confirmed',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
      );
    `);

    // 3. Order Items Table
    db.exec(`
      CREATE TABLE IF NOT EXISTS order_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        order_id TEXT NOT NULL,
        product_id TEXT NOT NULL,
        product_name TEXT NOT NULL,
        product_image TEXT,
        price REAL NOT NULL,
        quantity INTEGER NOT NULL,
        selected_color TEXT,
        FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
      );
    `);

    console.log('📦 SQLite Database initialized successfully at:', dbPath);
  } catch (e) {
    console.warn('⚠️ SQLite init encountered an issue, falling back to memory store:', e.message);
    isInMemoryFallback = true;
  }
}

// ---------------------------------------------------------------------------
// Database Helper Operations
// ---------------------------------------------------------------------------

// --- Users ---
export const dbUsers = {
  getByGoogleSub: (sub) => {
    if (isInMemoryFallback || !db) {
      for (const u of memoryStore.users.values()) {
        if (u.google_sub === sub) return u;
      }
      return null;
    }
    return db.prepare('SELECT * FROM users WHERE google_sub = ?').get(sub);
  },
  getByEmail: (email) => {
    const cleanEmail = (email || '').toLowerCase().trim();
    if (isInMemoryFallback || !db) {
      return memoryStore.users.get(cleanEmail) || null;
    }
    return db.prepare('SELECT * FROM users WHERE email = ?').get(cleanEmail);
  },
  getById: (id) => {
    if (isInMemoryFallback || !db) {
      for (const u of memoryStore.users.values()) {
        if (u.id === id) return u;
      }
      return null;
    }
    return db.prepare('SELECT * FROM users WHERE id = ?').get(id);
  },
  upsertGoogleUser: ({ id, googleSub, name, email, avatar }) => {
    const cleanEmail = (email || '').toLowerCase().trim();
    if (isInMemoryFallback || !db) {
      let existing = null;
      for (const u of memoryStore.users.values()) {
        if (u.google_sub === googleSub || u.email === cleanEmail) {
          existing = u;
          break;
        }
      }
      if (existing) {
        existing.name = name;
        existing.avatar = avatar;
        existing.google_sub = googleSub;
        existing.updated_at = new Date().toISOString();
        memoryStore.users.set(cleanEmail, existing);
        return existing;
      } else {
        const newUser = {
          id,
          google_sub: googleSub,
          name,
          email: cleanEmail,
          avatar,
          provider: 'google',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        memoryStore.users.set(cleanEmail, newUser);
        return newUser;
      }
    }

    const existing = db.prepare('SELECT * FROM users WHERE google_sub = ? OR email = ?').get(googleSub, cleanEmail);
    if (existing) {
      db.prepare(`
        UPDATE users 
        SET name = ?, avatar = ?, google_sub = ?, updated_at = CURRENT_TIMESTAMP 
        WHERE id = ?
      `).run(name, avatar, googleSub, existing.id);
      return db.prepare('SELECT * FROM users WHERE id = ?').get(existing.id);
    } else {
      db.prepare(`
        INSERT INTO users (id, google_sub, name, email, avatar, provider) 
        VALUES (?, ?, ?, ?, ?, 'google')
      `).run(id, googleSub, name, cleanEmail, avatar);
      return db.prepare('SELECT * FROM users WHERE id = ?').get(id);
    }
  },
  createLocalUser: ({ id, name, email, passwordHash }) => {
    const cleanEmail = (email || '').toLowerCase().trim();
    if (isInMemoryFallback || !db) {
      const newUser = {
        id,
        name,
        email: cleanEmail,
        password_hash: passwordHash,
        provider: 'local',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      memoryStore.users.set(cleanEmail, newUser);
      return newUser;
    }

    db.prepare(`
      INSERT INTO users (id, name, email, password_hash, provider)
      VALUES (?, ?, ?, ?, 'local')
    `).run(id, name, cleanEmail, passwordHash);
    return db.prepare('SELECT * FROM users WHERE id = ?').get(id);
  }
};

// --- Orders ---
export const dbOrders = {
  createOrder: ({
    id,
    userId,
    customerName,
    customerEmail,
    shippingAddress,
    city,
    state,
    zipCode,
    paymentMethod,
    subtotal,
    discount,
    shippingCost,
    total,
    currency,
    items
  }) => {
    if (isInMemoryFallback || !db) {
      const newOrder = {
        id,
        user_id: userId || null,
        customer_name: customerName,
        customer_email: customerEmail,
        shipping_address: shippingAddress,
        city,
        state,
        zip_code: zipCode,
        payment_method: paymentMethod,
        subtotal,
        discount: discount || 0,
        shipping_cost: shippingCost || 0,
        total,
        currency: currency || 'USD',
        status: 'confirmed',
        created_at: new Date().toISOString()
      };
      memoryStore.orders.set(id, newOrder);

      for (const item of items) {
        memoryStore.orderItems.push({
          id: memoryStore.orderItems.length + 1,
          order_id: id,
          product_id: String(item.product?.id || item.productId || ''),
          product_name: item.product?.name || item.name || '',
          product_image: item.product?.image || item.image || '',
          price: item.product?.price || item.price || 0,
          quantity: item.quantity || 1,
          selected_color: item.selectedColor || 'Standard'
        });
      }
      return id;
    }

    const createTx = db.transaction(() => {
      db.prepare(`
        INSERT INTO orders (
          id, user_id, customer_name, customer_email, shipping_address, 
          city, state, zip_code, payment_method, subtotal, discount, 
          shipping_cost, total, currency, status
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'confirmed')
      `).run(
        id,
        userId || null,
        customerName,
        customerEmail,
        shippingAddress,
        city,
        state,
        zipCode,
        paymentMethod,
        subtotal,
        discount || 0,
        shippingCost || 0,
        total,
        currency || 'USD'
      );

      const insertItem = db.prepare(`
        INSERT INTO order_items (
          order_id, product_id, product_name, product_image, price, quantity, selected_color
        ) VALUES (?, ?, ?, ?, ?, ?, ?)
      `);

      for (const item of items) {
        insertItem.run(
          id,
          String(item.product?.id || item.productId || ''),
          item.product?.name || item.name || '',
          item.product?.image || item.image || '',
          item.product?.price || item.price || 0,
          item.quantity || 1,
          item.selectedColor || 'Standard'
        );
      }

      return id;
    });

    return createTx();
  },

  getOrderById: (orderId) => {
    if (isInMemoryFallback || !db) {
      const order = memoryStore.orders.get(orderId);
      if (!order) return null;
      const items = memoryStore.orderItems.filter((it) => it.order_id === orderId);
      return { ...order, items };
    }

    const order = db.prepare('SELECT * FROM orders WHERE id = ?').get(orderId);
    if (!order) return null;
    const items = db.prepare('SELECT * FROM order_items WHERE order_id = ?').all(orderId);
    return { ...order, items };
  },

  getOrdersByUserEmail: (email) => {
    const cleanEmail = (email || '').toLowerCase().trim();
    if (isInMemoryFallback || !db) {
      const orders = [];
      for (const order of memoryStore.orders.values()) {
        if ((order.customer_email || '').toLowerCase() === cleanEmail) {
          const items = memoryStore.orderItems.filter((it) => it.order_id === order.id);
          orders.push({ ...order, items });
        }
      }
      return orders.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }

    const orders = db.prepare('SELECT * FROM orders WHERE customer_email = ? ORDER BY created_at DESC').all(cleanEmail);
    return orders.map((order) => {
      const items = db.prepare('SELECT * FROM order_items WHERE order_id = ?').all(order.id);
      return { ...order, items };
    });
  }
};

export default db;
