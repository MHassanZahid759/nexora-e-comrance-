import React from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';

export const WishlistDrawer = () => {
  const {
    isWishlistOpen,
    setIsWishlistOpen,
    wishlist,
    toggleWishlist,
    addToCart,
    formatPrice
  } = useShop();

  if (!isWishlistOpen) return null;

  const wishlistedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  const handleMoveAllToCart = () => {
    wishlistedProducts.forEach((p) => addToCart(p, 1));
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={() => setIsWishlistOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-neutral-950 text-white shadow-2xl flex flex-col justify-between animate-fade-in border-l border-neutral-800">
          
          {/* Header */}
          <div className="p-6 border-b border-neutral-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[24px] text-red-500" style={{ fontVariationSettings: "'FILL' 1" }}>
                favorite
              </span>
              <h2 className="font-headline-sm text-headline-sm font-bold text-white">Saved Wishlist</h2>
              <span className="px-2 py-0.5 rounded-full bg-neutral-800 text-xs font-bold font-mono text-neutral-300">
                {wishlistedProducts.length}
              </span>
            </div>
            <button
              onClick={() => setIsWishlistOpen(false)}
              className="p-2 rounded-full hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
              aria-label="Close wishlist"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {wishlistedProducts.length === 0 ? (
              <div className="py-16 text-center flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-500">
                  <span className="material-symbols-outlined text-[32px]">favorite_border</span>
                </div>
                <div className="space-y-1">
                  <p className="font-headline-sm text-headline-sm font-semibold text-white">No saved items</p>
                  <p className="font-body-sm text-body-sm text-neutral-400 max-w-xs">
                    Click the heart icon on any product to save it here for later.
                  </p>
                </div>
                <button
                  onClick={() => setIsWishlistOpen(false)}
                  className="mt-2 px-6 py-2.5 rounded-full bg-red-600 text-white font-label-md text-sm font-bold hover:bg-red-700 transition-colors shadow-lg shadow-red-600/30"
                >
                  Start Browsing
                </button>
              </div>
            ) : (
              wishlistedProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex gap-4 p-3 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-colors"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-24 rounded-lg object-cover bg-neutral-950"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="font-label-md text-sm font-semibold text-white line-clamp-1">
                          {product.name}
                        </h4>
                        <button
                          onClick={() => toggleWishlist(product)}
                          className="text-neutral-500 hover:text-red-500 transition-colors p-0.5"
                          title="Remove from wishlist"
                        >
                          <span className="material-symbols-outlined text-[18px]">close</span>
                        </button>
                      </div>
                      <p className="text-xs text-red-500 uppercase tracking-wider mt-0.5">
                        {product.category}
                      </p>
                      <p className="text-sm font-bold text-white mt-1">
                        {formatPrice(product.price)}
                      </p>
                    </div>

                    <button
                      onClick={() => addToCart(product, 1)}
                      className="mt-2 w-full py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 font-label-md text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                    >
                      <span className="material-symbols-outlined text-[16px]">add_shopping_cart</span>
                      <span>Move to Cart</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {wishlistedProducts.length > 0 && (
            <div className="p-6 border-t border-neutral-800 bg-neutral-950">
              <button
                onClick={handleMoveAllToCart}
                className="w-full py-3.5 rounded-full bg-red-600 hover:bg-red-700 text-white font-label-md text-sm font-bold shadow-lg shadow-red-600/30 transition-transform active:scale-95 flex items-center justify-center gap-2"
              >
                <span>Add All to Cart</span>
                <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
