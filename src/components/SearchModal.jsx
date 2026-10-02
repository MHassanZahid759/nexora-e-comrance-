import React, { useState, useEffect, useRef } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS, CATEGORIES } from '../data/products';

export const SearchModal = () => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    formatPrice,
    setQuickViewProduct
  } = useShop();

  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const filteredProducts = PRODUCTS.filter((p) => {
    if (!query) return true;
    const q = query.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    );
  });

  const handleSelectProduct = (product) => {
    setIsSearchOpen(false);
    setQuickViewProduct(product);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-start justify-center pt-16 sm:pt-24 px-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={() => setIsSearchOpen(false)}
      />

      <div className="relative bg-neutral-950 text-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden border border-neutral-800 z-10 animate-fade-in">
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-neutral-800 flex items-center gap-3">
          <span className="material-symbols-outlined text-[24px] text-red-500">search</span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type to search headphones, shoes, hoodies, watch..."
            className="flex-1 bg-transparent text-base sm:text-lg text-white placeholder:text-neutral-500 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-neutral-400 hover:text-white text-xs"
            >
              Clear
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="px-2 py-1 rounded-md bg-neutral-900 border border-neutral-800 text-xs text-neutral-400 font-mono font-medium"
          >
            ESC
          </button>
        </div>

        {/* Quick Categories Filter Pills */}
        <div className="px-5 py-2.5 bg-neutral-900 border-b border-neutral-800 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-neutral-400 font-label-uppercase text-[10px] uppercase font-bold whitespace-nowrap">
            Categories:
          </span>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setQuery(cat.name)}
              className="px-2.5 py-1 rounded-full bg-neutral-950 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 whitespace-nowrap transition-colors"
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Search Results List */}
        <div className="max-h-[380px] overflow-y-auto p-4 space-y-2">
          {filteredProducts.length === 0 ? (
            <div className="py-12 text-center text-neutral-400 space-y-1">
              <p className="font-semibold text-sm">No items found for "{query}"</p>
              <p className="text-xs">Try searching for "Headphones", "Coat", "Lamp", or "Watch"</p>
            </div>
          ) : (
            filteredProducts.map((p) => (
              <div
                key={p.id}
                onClick={() => handleSelectProduct(p)}
                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-neutral-900 cursor-pointer transition-colors group border border-transparent hover:border-neutral-800"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-12 h-14 rounded-lg object-cover bg-neutral-900"
                  />
                  <div>
                    <h5 className="font-label-md text-sm font-semibold text-white group-hover:text-red-500 transition-colors">
                      {p.name}
                    </h5>
                    <span className="text-xs text-red-500 uppercase tracking-wider">
                      {p.category}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono font-bold text-sm text-white">
                    {formatPrice(p.price)}
                  </span>
                  <span className="material-symbols-outlined text-[18px] text-neutral-500 group-hover:text-white group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer tip */}
        <div className="px-5 py-3 bg-neutral-900 border-t border-neutral-800 flex items-center justify-between text-[11px] text-neutral-400">
          <span>Tip: Press <strong>⌘K</strong> or <strong>Ctrl+K</strong> anytime to search</span>
          <span>{filteredProducts.length} Items Found</span>
        </div>
      </div>
    </div>
  );
};
