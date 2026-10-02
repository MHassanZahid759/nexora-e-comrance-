import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { useShop } from '../context/ShopContext';

export const CartDrawer = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateQuantity,
    formatPrice,
    cartSubtotal,
    discountAmount,
    shippingCost,
    cartTotal,
    isFreeShipping,
    freeShippingThreshold,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    setIsCheckoutOpen
  } = useShop();

  const [couponInput, setCouponInput] = useState('');

  if (!isCartOpen) return null;

  const progressPercent = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);
  const remainingForFree = Math.max(0, freeShippingThreshold - cartSubtotal);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponInput) return;
    applyCoupon(couponInput);
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return createPortal(
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md h-dvh min-h-0 bg-neutral-950 shadow-2xl flex flex-col animate-fade-in border-l border-neutral-800">
          
          {/* Drawer Header */}
          <div className="shrink-0 p-6 border-b border-neutral-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[24px] text-red-500">shopping_bag</span>
              <h2 className="font-headline-sm text-headline-sm font-bold text-white">Shopping Bag</h2>
              <span className="px-2 py-0.5 rounded-full bg-neutral-800 text-neutral-300 text-xs font-bold font-mono">
                {cart.reduce((s, i) => s + i.quantity, 0)}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-full hover:bg-neutral-800 text-neutral-400 transition-colors"
              aria-label="Close bag"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="shrink-0 px-6 py-3.5 bg-neutral-900 border-b border-neutral-800">
            {isFreeShipping && cart.length > 0 ? (
              <div className="flex items-center gap-2 text-emerald-400 font-label-md text-sm font-semibold">
                <span className="material-symbols-outlined text-[18px]">verified</span>
                <span>You get <strong>FREE Fast Shipping</strong>!</span>
              </div>
            ) : (
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-xs text-neutral-400">
                  <span>Add <strong className="text-white">{formatPrice(remainingForFree)}</strong> more for <strong className="text-white">Free Shipping</strong></span>
                  <span className="font-bold text-neutral-300">{Math.round(progressPercent)}%</span>
                </div>
                <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-red-600 transition-all duration-500 rounded-full"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Drawer Body - Items List */}
          <div className="flex-1 min-h-0 overflow-y-auto p-6 space-y-5">
            {cart.length === 0 ? (
              <div className="py-16 text-center flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-neutral-800 flex items-center justify-center text-neutral-500">
                  <span className="material-symbols-outlined text-[32px]">shopping_bag</span>
                </div>
                <div className="space-y-1">
                  <p className="font-headline-sm text-headline-sm font-semibold text-white">Your bag is empty</p>
                  <p className="font-body-sm text-body-sm text-neutral-400 max-w-xs">
                    Looks like you haven't added anything to your cart yet.
                  </p>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-2 px-6 py-2.5 rounded-full bg-red-600 text-white font-label-md text-sm font-bold hover:bg-red-700 transition-colors shadow-sm"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedColor}`}
                  className="flex gap-4 p-3 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-neutral-600 transition-colors"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-24 rounded-lg object-cover bg-neutral-800"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="font-label-md text-sm font-semibold text-white line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-neutral-500 hover:text-red-500 transition-colors p-0.5"
                          title="Remove item"
                        >
                          <span className="material-symbols-outlined text-[18px]">delete</span>
                        </button>
                      </div>
                      <p className="text-xs text-neutral-500 mt-0.5">
                        Color: <span className="font-medium text-neutral-300">{item.selectedColor}</span>
                      </p>
                      <p className="text-sm font-bold text-white mt-1">
                        {formatPrice(item.product.price)}
                      </p>
                    </div>

                    {/* Quantity Stepper */}
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center border border-neutral-700 rounded-lg bg-neutral-950">
                        <button
                          onClick={() => updateQuantity(item.product.id, -1)}
                          className="px-2.5 py-1 text-neutral-300 hover:bg-neutral-800 text-sm transition-colors rounded-l-lg"
                        >
                          -
                        </button>
                        <span className="px-2 text-xs font-bold font-mono text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, 1)}
                          className="px-2.5 py-1 text-neutral-300 hover:bg-neutral-800 text-sm transition-colors rounded-r-lg"
                        >
                          +
                        </button>
                      </div>

                      <span className="text-xs text-neutral-500 font-mono">
                        Subtotal: <strong className="text-neutral-300">{formatPrice(item.product.price * item.quantity)}</strong>
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer & Checkout */}
          {cart.length > 0 && (
            <div className="shrink-0 p-6 border-t border-neutral-800 bg-neutral-950 space-y-4">
              {/* Promo Code Box */}
              {!appliedCoupon ? (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="Coupon code (NEXORA20)"
                    className="flex-1 h-10 px-3 rounded-lg bg-neutral-900 text-white text-xs border border-neutral-700 focus:outline-none focus:border-red-600 uppercase font-mono placeholder:text-neutral-500"
                  />
                  <button
                    type="submit"
                    className="px-4 h-10 rounded-lg bg-neutral-800 text-neutral-200 hover:bg-red-600 hover:text-white font-label-md text-xs font-semibold transition-colors border border-neutral-700"
                  >
                    Apply
                  </button>
                </form>
              ) : (
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-emerald-950/50 border border-emerald-800 text-emerald-400 text-xs">
                  <div className="flex items-center gap-1.5 font-semibold">
                    <span className="material-symbols-outlined text-[16px]">check_circle</span>
                    <span>Coupon <strong>{appliedCoupon.code}</strong> applied (-20%)</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-emerald-400 hover:text-emerald-200 font-bold underline text-xs"
                  >
                    Remove
                  </button>
                </div>
              )}

              {/* Price Breakdown */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-neutral-400">
                  <span>Subtotal</span>
                  <span className="font-mono text-white">{formatPrice(cartSubtotal)}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-emerald-400 font-medium">
                    <span>Discount (20%)</span>
                    <span className="font-mono">-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-neutral-400">
                  <span>Shipping</span>
                  <span className="font-mono">
                    {isFreeShipping ? <strong className="text-emerald-400 font-semibold uppercase text-xs">FREE</strong> : formatPrice(shippingCost)}
                  </span>
                </div>
                <div className="pt-2 border-t border-neutral-800 flex justify-between font-bold text-base text-white">
                  <span>Total</span>
                  <span className="font-mono text-lg">{formatPrice(cartTotal)}</span>
                </div>
              </div>

              {/* Checkout Action Button */}
              <button
                onClick={handleProceedToCheckout}
                className="w-full py-4 rounded-full bg-red-600 hover:bg-red-700 text-white font-label-md text-sm font-bold shadow-lg shadow-red-600/20 transition-transform active:scale-95 flex items-center justify-center gap-2"
              >
                <span>Proceed to Checkout</span>
                <span className="material-symbols-outlined text-[18px]">lock</span>
              </button>

              <div className="flex items-center justify-center gap-4 text-[11px] text-neutral-500 pt-1">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">shield</span> Safe Checkout
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">restart_alt</span> 30-Day Returns
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};
