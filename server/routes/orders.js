import { Router } from 'express';
import { dbOrders } from '../db.js';

const router = Router();

// ---------------------------------------------------------------------------
// POST /api/orders/checkout
// Creates a new confirmed order in SQLite database
// ---------------------------------------------------------------------------
router.post('/checkout', (req, res) => {
  try {
    const {
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
    } = req.body;

    if (!customerEmail || !customerName || !shippingAddress || !items || !items.length) {
      return res.status(400).json({ error: 'Missing required checkout information or cart items.' });
    }

    // Generate permanent unique Order ID (e.g. NX-849201)
    const orderId = 'NX-' + Math.floor(100000 + Math.random() * 900000);
    const userId = req.session?.userId || null;

    dbOrders.createOrder({
      id: orderId,
      userId,
      customerName,
      customerEmail,
      shippingAddress,
      city: city || 'San Francisco',
      state: state || 'CA',
      zipCode: zipCode || '94102',
      paymentMethod: paymentMethod || 'card',
      subtotal: Number(subtotal) || 0,
      discount: Number(discount) || 0,
      shippingCost: Number(shippingCost) || 0,
      total: Number(total) || 0,
      currency: currency || 'USD',
      items
    });

    console.log(`🛒 [orders] Order #${orderId} created successfully for ${customerEmail} ($${total})`);

    const createdOrder = dbOrders.getOrderById(orderId);

    return res.status(201).json({
      success: true,
      message: 'Order created successfully!',
      order: createdOrder
    });
  } catch (err) {
    console.error('[orders] Checkout error:', err);
    return res.status(500).json({ error: 'Failed to process order. Please try again.' });
  }
});

// ---------------------------------------------------------------------------
// GET /api/orders
// Returns order history for current logged-in session user or by email query
// ---------------------------------------------------------------------------
router.get('/', (req, res) => {
  try {
    const email = req.query.email || req.session?.userEmail;
    if (!email) {
      return res.status(400).json({ error: 'Email parameter or active session required.' });
    }

    const orders = dbOrders.getOrdersByUserEmail(email);
    return res.json({ success: true, count: orders.length, orders });
  } catch (err) {
    console.error('[orders] Get orders error:', err);
    return res.status(500).json({ error: 'Failed to fetch orders.' });
  }
});

// ---------------------------------------------------------------------------
// GET /api/orders/:id
// Returns single order details by Order ID
// ---------------------------------------------------------------------------
router.get('/:id', (req, res) => {
  try {
    const order = dbOrders.getOrderById(req.params.id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found.' });
    }
    return res.json({ success: true, order });
  } catch (err) {
    console.error('[orders] Get order by ID error:', err);
    return res.status(500).json({ error: 'Failed to fetch order.' });
  }
});

export default router;
