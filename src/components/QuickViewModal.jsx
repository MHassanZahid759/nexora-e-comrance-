import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useShop } from '../context/ShopContext';

export const QuickViewModal = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    formatPrice,
    addToCart,
    toggleWishlist,
    isWishlisted
  } = useShop();

  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('');
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    if (quickViewProduct) {
      setQuantity(1);
      setSelectedColor(quickViewProduct.colors ? quickViewProduct.colors[0] : 'Standard');
    }
  }, [quickViewProduct]);

  if (!quickViewProduct) return null;

  const wishlisted = isWishlisted(quickViewProduct.id);

  const handleAddToCart = () => {
    addToCart(quickViewProduct, quantity, selectedColor);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      setQuickViewProduct(null);
    }, 900);
  };

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={() => setQuickViewProduct(null)}
      />

      {/* Modal Card */}
      <div className="relative bg-neutral-950 text-white rounded-2xl shadow-2xl max-w-4xl w-full h-[90vh] max-h-[760px] overflow-hidden border border-neutral-800 z-10 animate-fade-in">
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-neutral-900/90 backdrop-blur-md text-white hover:bg-neutral-800 flex items-center justify-center transition-colors shadow-md border border-neutral-700"
          aria-label="Close modal"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-1 h-full min-h-0 overflow-hidden">
          {/* Product Image Section */}
          <div className="relative bg-neutral-900 h-[22vh] min-h-[150px] max-h-[210px] md:h-full md:max-h-none md:min-h-0">
            <img
              src={quickViewProduct.image}
              alt={quickViewProduct.name}
              className="w-full h-full object-cover"
            />
            {quickViewProduct.discountBadge && (
              <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-red-600 font-label-uppercase text-xs font-bold text-white shadow-sm">
                {quickViewProduct.discountBadge}
              </span>
            )}
          </div>

          {/* Product Details Section */}
          <div className="min-h-0 p-5 md:p-8 flex flex-col bg-neutral-950">
            <div className="flex-1 min-h-0 overflow-y-auto space-y-4 pb-4">
              {/* Category & Rating */}
              <div className="flex items-center justify-between">
                <span className="font-label-uppercase text-xs text-red-500 uppercase tracking-widest font-semibold">
                  {quickViewProduct.category}
                </span>
                <div className="flex items-center gap-1.5">
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className="material-symbols-outlined text-[15px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                    ))}
                  </div>
                  <span className="text-xs font-bold font-mono text-white">
                    {quickViewProduct.rating}
                  </span>
                  <span className="text-xs text-neutral-400">
                    ({quickViewProduct.reviewsCount} reviews)
                  </span>
                </div>
              </div>

              {/* Title & Price */}
              <h3 className="font-headline-lg text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight">
                {quickViewProduct.name}
              </h3>

              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-bold font-mono text-white">
                  {formatPrice(quickViewProduct.price)}
                </span>
                {quickViewProduct.originalPrice && (
                  <span className="text-base line-through text-neutral-500 font-mono">
                    {formatPrice(quickViewProduct.originalPrice)}
                  </span>
                )}
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800/50 font-semibold font-label-sm">
                  {quickViewProduct.stockStatus || 'In Stock'}
                </span>
              </div>

              {/* Description */}
              <p className="text-sm text-neutral-300 leading-relaxed">
                {quickViewProduct.description}
              </p>

              {/* Color / Variant Selector */}
              {quickViewProduct.colors && quickViewProduct.colors.length > 0 && (
                <div className="space-y-2 pt-2">
                  <label className="text-xs font-label-uppercase uppercase text-neutral-400 font-semibold">
                    Select Color: <strong className="text-white">{selectedColor}</strong>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {quickViewProduct.colors.map((color) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setSelectedColor(color)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                          selectedColor === color
                            ? 'bg-red-600 text-white border-red-500 shadow-sm font-semibold'
                            : 'bg-neutral-900 text-neutral-300 border-neutral-700 hover:bg-neutral-800'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Highlights / Features list */}
              {quickViewProduct.features && (
                <div className="pt-2 space-y-1.5">
                  <span className="text-xs font-label-uppercase uppercase text-neutral-400 font-semibold">
                    Product Highlights:
                  </span>
                  <ul className="space-y-1 text-xs text-neutral-300">
                    {quickViewProduct.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[16px] text-red-500">
                          check_circle
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Actions: Quantity + Add to Bag + Wishlist */}
            <div className="shrink-0 pt-3 border-t border-neutral-800 space-y-3 bg-neutral-950">
              <div className="flex items-center gap-3">
                {/* Quantity */}
                <div className="flex items-center border border-neutral-700 rounded-xl bg-neutral-900 px-2 py-1">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-8 h-8 rounded text-white hover:bg-neutral-800 flex items-center justify-center font-bold"
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-mono font-bold text-sm text-white">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-8 h-8 rounded text-white hover:bg-neutral-800 flex items-center justify-center font-bold"
                  >
                    +
                  </button>
                </div>

                {/* Add to Bag */}
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 py-3.5 px-6 rounded-xl font-label-md text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2 ${
                    isAdded
                      ? 'bg-emerald-600 text-white'
                      : 'bg-red-600 text-white hover:bg-red-700 shadow-red-600/30'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {isAdded ? 'check' : 'shopping_bag'}
                  </span>
                  <span>{isAdded ? 'Added to Cart!' : `Add to Cart • ${formatPrice(quickViewProduct.price * quantity)}`}</span>
                </button>

                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(quickViewProduct)}
                  aria-label="Wishlist"
                  className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-colors ${
                    wishlisted
                      ? 'bg-red-950 text-red-500 border-red-800'
                      : 'bg-neutral-900 text-neutral-400 hover:text-red-500 border-neutral-700'
                  }`}
                >
                  <span
                    className="material-symbols-outlined text-[20px]"
                    style={{ fontVariationSettings: wishlisted ? "'FILL' 1" : "'FILL' 0" }}
                  >
                    favorite
                  </span>
                </button>
              </div>

              <div className="flex items-center justify-between text-xs text-neutral-400 pt-1">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px] text-red-500">local_shipping</span>
                  Free Express Shipping
                </span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px] text-red-500">verified_user</span>
                  2-Year Warranty Included
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};
