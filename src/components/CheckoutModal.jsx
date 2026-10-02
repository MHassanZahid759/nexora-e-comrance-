import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { useShop } from '../context/ShopContext';

export const CheckoutModal = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    user,
    cart,
    cartSubtotal,
    discountAmount,
    shippingCost,
    cartTotal,
    currency,
    formatPrice,
    clearCart,
    showToast
  } = useShop();

  const [step, setStep] = useState('details'); // 'details' | 'success'
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '742 Evergreen Terrace',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94102',
    paymentMethod: 'card',
    cardNumber: '•••• •••• •••• 4242',
    expiry: '08/28',
    cvv: '921'
  });
  const [orderId, setOrderId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Auto-fill user information when modal opens or user logs in
  React.useEffect(() => {
    if (user) {
      const parts = (user.name || '').trim().split(' ');
      setFormData((prev) => ({
        ...prev,
        firstName: prev.firstName || parts[0] || '',
        lastName: prev.lastName || parts.slice(1).join(' ') || 'Customer',
        email: prev.email || user.email || ''
      }));
    }
  }, [user, isCheckoutOpen]);

  if (!isCheckoutOpen) return null;

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    if (!cart.length) {
      showToast('Your cart is empty!', 'error');
      return;
    }

    setIsProcessing(true);

    try {
      const res = await fetch('/api/orders/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          customerName: `${formData.firstName} ${formData.lastName}`.trim(),
          customerEmail: formData.email,
          shippingAddress: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          paymentMethod: formData.paymentMethod,
          subtotal: cartSubtotal,
          discount: discountAmount,
          shippingCost: shippingCost,
          total: cartTotal,
          currency: currency,
          items: cart
        })
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to place order.');
      }

      setOrderId(data.order.id);
      setIsProcessing(false);
      setStep('success');
      clearCart();
      showToast(`Order #${data.order.id} placed & saved to SQL Database!`);
    } catch (err) {
      console.error('Checkout error:', err);
      setIsProcessing(false);
      showToast(err.message || 'Error processing order.', 'error');
    }
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setStep('details');
  };

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={handleClose}
      />

      <div className="relative bg-neutral-950 text-white rounded-2xl shadow-2xl max-w-2xl w-full h-[90vh] max-h-[760px] flex flex-col overflow-hidden border border-neutral-800 z-10 animate-fade-in">
        {step === 'details' ? (
          <div className="flex min-h-0 flex-1 flex-col">
            {/* Header */}
            <div className="p-6 border-b border-neutral-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[24px] text-red-500">lock</span>
                <h3 className="font-headline-sm text-headline-sm font-bold text-white">Secure Checkout</h3>
              </div>
              <button
                onClick={handleClose}
                className="p-2 rounded-full hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
                aria-label="Close checkout"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmitOrder} className="flex min-h-0 flex-1 flex-col overflow-hidden">
              <div className="flex-1 min-h-0 overflow-y-auto p-6 md:p-8 space-y-6">
              {/* Order summary pill */}
              <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-between">
                <div>
                  <p className="text-xs text-neutral-400 uppercase font-semibold">Your Order</p>
                  <p className="font-bold text-white text-sm">
                    {cart.reduce((s, i) => s + i.quantity, 0)} Items in Cart
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-neutral-400 uppercase font-semibold">Total Price</p>
                  <p className="font-mono font-bold text-lg text-red-500">{formatPrice(cartTotal)}</p>
                </div>
              </div>

              {/* Contact & Shipping */}
              <div className="space-y-4">
                <h4 className="font-label-uppercase text-xs text-red-500 uppercase font-bold tracking-wider">
                  1. Shipping Address
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="h-11 px-3.5 rounded-lg bg-neutral-900 border border-neutral-700 text-white text-sm focus:outline-none focus:border-red-600"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="h-11 px-3.5 rounded-lg bg-neutral-900 border border-neutral-700 text-white text-sm focus:outline-none focus:border-red-600"
                  />
                </div>
                <input
                  type="email"
                  required
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full h-11 px-3.5 rounded-lg bg-neutral-900 border border-neutral-700 text-white text-sm focus:outline-none focus:border-red-600"
                />
                <input
                  type="text"
                  required
                  placeholder="Street Address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full h-11 px-3.5 rounded-lg bg-neutral-900 border border-neutral-700 text-white text-sm focus:outline-none focus:border-red-600"
                />
                <div className="grid grid-cols-3 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="City"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="h-11 px-3.5 rounded-lg bg-neutral-900 border border-neutral-700 text-white text-sm focus:outline-none focus:border-red-600"
                  />
                  <input
                    type="text"
                    required
                    placeholder="State"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="h-11 px-3.5 rounded-lg bg-neutral-900 border border-neutral-700 text-white text-sm focus:outline-none focus:border-red-600"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Zip Code"
                    value={formData.zipCode}
                    onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                    className="h-11 px-3.5 rounded-lg bg-neutral-900 border border-neutral-700 text-white text-sm focus:outline-none focus:border-red-600"
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div className="space-y-4">
                <h4 className="font-label-uppercase text-xs text-red-500 uppercase font-bold tracking-wider">
                  2. Choose Payment
                </h4>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMethod: 'card' })}
                    className={`py-3 px-2 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition-all ${
                      formData.paymentMethod === 'card'
                        ? 'border-red-600 bg-red-600/20 text-white shadow-sm'
                        : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:bg-neutral-800'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[20px]">credit_card</span>
                    <span>Credit Card</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMethod: 'apple' })}
                    className={`py-3 px-2 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition-all ${
                      formData.paymentMethod === 'apple'
                        ? 'border-red-600 bg-red-600/20 text-white shadow-sm'
                        : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:bg-neutral-800'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[20px]">phone_iphone</span>
                    <span>Apple Pay</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMethod: 'paypal' })}
                    className={`py-3 px-2 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition-all ${
                      formData.paymentMethod === 'paypal'
                        ? 'border-red-600 bg-red-600/20 text-white shadow-sm'
                        : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:bg-neutral-800'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[20px]">account_balance_wallet</span>
                    <span>PayPal</span>
                  </button>
                </div>

                {formData.paymentMethod === 'card' && (
                  <div className="space-y-3 pt-2">
                    <input
                      type="text"
                      required
                      placeholder="Card Number"
                      value={formData.cardNumber}
                      onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                      className="w-full h-11 px-3.5 rounded-lg bg-neutral-900 border border-neutral-700 text-white text-sm focus:outline-none focus:border-red-600 font-mono"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        required
                        placeholder="MM/YY"
                        value={formData.expiry}
                        onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
                        className="h-11 px-3.5 rounded-lg bg-neutral-900 border border-neutral-700 text-white text-sm focus:outline-none focus:border-red-600 font-mono"
                      />
                      <input
                        type="text"
                        required
                        placeholder="CVV"
                        value={formData.cvv}
                        onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                        className="h-11 px-3.5 rounded-lg bg-neutral-900 border border-neutral-700 text-white text-sm focus:outline-none focus:border-red-600 font-mono"
                      />
                    </div>
                  </div>
                )}
              </div>
              </div>

              {/* Submit Button */}
              <div className="shrink-0 px-6 md:px-8 pt-4 pb-6 md:pb-8 border-t border-neutral-800 bg-neutral-950">
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 rounded-full bg-red-600 hover:bg-red-700 text-white font-label-md text-sm font-bold shadow-lg shadow-red-600/30 transition-all active:scale-98 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>
                    <span>Processing Payment...</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[18px]">verified</span>
                    <span>Pay {formatPrice(cartTotal)} Now</span>
                  </>
                )}
              </button>
              </div>
            </form>
          </div>
        ) : (
          /* Confirmation / Success Screen */
          <div className="p-8 md:p-12 text-center flex flex-col items-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-400 flex items-center justify-center shadow-inner">
              <span className="material-symbols-outlined text-[48px]">check_circle</span>
            </div>
            
            <div className="space-y-2">
              <span className="font-label-uppercase text-xs text-emerald-400 font-bold uppercase tracking-widest">
                Payment Received
              </span>
              <h3 className="font-headline-xl text-3xl font-bold text-white">
                Thank You for Your Order!
              </h3>
              <p className="font-body-md text-sm text-neutral-300 max-w-md mx-auto">
                Your order is confirmed. We are getting your package ready. A receipt has been sent to <strong>{formData.email}</strong>.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 w-full max-w-md text-left space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-neutral-400 font-medium">Order ID:</span>
                <span className="font-mono font-bold text-white">{orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400 font-medium">Estimated Delivery:</span>
                <span className="font-medium text-white">2 to 3 Business Days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400 font-medium">Shipping Address:</span>
                <span className="font-medium text-white">{formData.address}, {formData.city}</span>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="px-8 py-3.5 rounded-full bg-red-600 text-white font-label-md text-sm font-bold hover:bg-red-700 shadow-lg shadow-red-600/30 transition-all"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};
