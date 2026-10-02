import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';

export const ProductCard = ({ product }) => {
  const {
    formatPrice,
    addToCart,
    toggleWishlist,
    isWishlisted,
    setQuickViewProduct
  } = useShop();

  const [isAdded, setIsAdded] = useState(false);
  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product, 1);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 1200);
  };

  const handleWishlistToggle = (e) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div
      onClick={() => setQuickViewProduct(product)}
      className="group flex flex-col justify-between bg-neutral-900 rounded-xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-black/50 transition-all duration-300 border border-neutral-800 hover:border-neutral-600 cursor-pointer"
    >
      {/* Product Image Container */}
      <div className="relative w-full aspect-[4/5] bg-neutral-800 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.discountBadge && (
            <span
              className={`px-2.5 py-1 rounded-full font-label-uppercase text-label-uppercase font-bold shadow-sm backdrop-blur-md ${
                product.discountBadge.includes('-')
                  ? 'bg-red-600/90 text-white'
                  : 'bg-black/70 text-white border border-neutral-600'
              }`}
            >
              {product.discountBadge}
            </span>
          )}
        </div>

        {/* Top Right Wishlist & Quick View Actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
          <button
            onClick={handleWishlistToggle}
            aria-label={wishlisted ? "Remove from Wishlist" : "Save to Wishlist"}
            className={`w-9 h-9 rounded-full bg-black/70 backdrop-blur-md flex items-center justify-center transition-all shadow-sm border border-neutral-700 ${
              wishlisted ? 'text-red-500 scale-110 border-red-800' : 'text-neutral-400 hover:text-red-500 hover:scale-110'
            }`}
          >
            <span
              className="material-symbols-outlined text-[18px]"
              style={{ fontVariationSettings: wishlisted ? "'FILL' 1" : "'FILL' 0" }}
            >
              favorite
            </span>
          </button>
        </div>

        {/* Quick View Floating Overlay on Hover */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 z-10 hidden sm:block">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            className="w-full py-2.5 rounded-lg bg-black/80 backdrop-blur-md text-white font-label-md text-label-md font-semibold shadow-md hover:bg-red-600 transition-colors flex items-center justify-center gap-1.5 border border-neutral-700 hover:border-red-500"
          >
            <span className="material-symbols-outlined text-[18px]">visibility</span>
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Card Info Section */}
      <div className="p-5 flex flex-col flex-1 justify-between gap-space-md">
        <div className="flex flex-col gap-1.5">
          <span className="font-label-uppercase text-label-uppercase text-neutral-500 uppercase tracking-wider">
            {product.category}
          </span>
          <h3 className="font-headline-sm text-headline-sm text-white font-semibold line-clamp-2 group-hover:text-red-400 transition-colors leading-snug">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1.5 pt-0.5">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className="material-symbols-outlined text-[14px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
              ))}
            </div>
            <span className="font-label-sm text-label-sm font-semibold text-white">
              {product.rating}
            </span>
            <span className="font-body-sm text-body-sm text-neutral-500">
              ({product.reviewsCount.toLocaleString()})
            </span>
          </div>
        </div>

        {/* Pricing & Add to Cart */}
        <div className="pt-2 flex items-center justify-between border-t border-neutral-800">
          <div className="flex items-baseline gap-2">
            <span className="font-headline-sm text-headline-sm font-bold text-white">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="font-body-sm text-body-sm line-through text-neutral-500">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            aria-label="Add to cart"
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-sm ${
              isAdded
                ? 'bg-emerald-600 text-white scale-110'
                : 'bg-neutral-800 hover:bg-red-600 hover:text-white text-neutral-300 border border-neutral-700 hover:border-red-500'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">
              {isAdded ? 'check' : 'add_shopping_cart'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
