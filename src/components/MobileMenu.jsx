import React from 'react';
import { useShop } from '../context/ShopContext';
import { CATEGORIES } from '../data/products';

export const MobileMenu = () => {
  const {
    user,
    logout,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    setActivePage,
    setSelectedCategory,
    setSelectedTab,
    setIsCartOpen,
    setIsWishlistOpen,
    wishlist,
    cartItemsCount
  } = useShop();

  if (!isMobileMenuOpen) return null;

  const navigateTo = (page, category = 'all') => {
    setIsMobileMenuOpen(false);
    setActivePage(page);
    if (page === 'shop') {
      setSelectedCategory(category);
      const el = document.getElementById('featured-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (page === 'categories') {
      const el = document.getElementById('categories-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (page === 'deals') {
      setSelectedTab('offers');
      const el = document.getElementById('featured-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };


  return (
    <div className="fixed inset-0 z-50 overflow-hidden xl:hidden">
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={() => setIsMobileMenuOpen(false)}
      />

      <div className="fixed inset-y-0 left-0 max-w-full flex pr-10">
        <div className="w-screen max-w-xs bg-neutral-950 text-white shadow-2xl flex flex-col justify-between animate-fade-in border-r border-neutral-800">
          
          {/* Header */}
          <div className="p-5 border-b border-neutral-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center text-white text-xs font-bold shadow-md shadow-red-600/30">
                N
              </div>
              <span className="font-headline-sm font-bold tracking-tight text-white text-lg">NEXORA</span>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-1.5 rounded-lg hover:bg-neutral-800 text-neutral-400 hover:text-white"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          {/* User Account Card (shown if logged in) */}
          {user && (
            <div className="p-4 bg-neutral-900 border-b border-neutral-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-9 h-9 rounded-lg object-cover ring-1 ring-red-600"
                  />
                  <div>
                    <p className="text-xs font-bold text-white">{user.name}</p>
                    <p className="text-[10px] text-neutral-400 truncate max-w-[120px]">{user.email}</p>
                  </div>
                </div>
                <button
                  onClick={logout}
                  className="p-1.5 text-xs text-red-500 hover:bg-red-950 rounded-lg font-bold"
                  title="Sign Out"
                >
                  <span className="material-symbols-outlined text-[18px]">logout</span>
                </button>
              </div>
            </div>
          )}

          {/* Navigation Links */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5">
            <div className="space-y-1">
              <span className="text-[10px] font-label-uppercase uppercase text-red-500 font-bold tracking-wider px-2">
                Menu
              </span>
              <nav className="space-y-0.5">
                <button
                  onClick={() => navigateTo('home')}
                  className="w-full text-left py-2 px-3 rounded-lg text-xs font-semibold text-neutral-300 hover:text-white hover:bg-neutral-900 flex items-center justify-between"
                >
                  <span>Home</span>
                  <span className="material-symbols-outlined text-[16px] text-neutral-500">home</span>
                </button>
                <button
                  onClick={() => navigateTo('shop')}
                  className="w-full text-left py-2 px-3 rounded-lg text-xs font-semibold text-neutral-300 hover:text-white hover:bg-neutral-900 flex items-center justify-between"
                >
                  <span>Shop All Products</span>
                  <span className="material-symbols-outlined text-[16px] text-neutral-500">storefront</span>
                </button>
                <button
                  onClick={() => navigateTo('categories')}
                  className="w-full text-left py-2 px-3 rounded-lg text-xs font-semibold text-neutral-300 hover:text-white hover:bg-neutral-900 flex items-center justify-between"
                >
                  <span>Categories</span>
                  <span className="material-symbols-outlined text-[16px] text-neutral-500">category</span>
                </button>
                <button
                  onClick={() => navigateTo('deals')}
                  className="w-full text-left py-2 px-3 rounded-lg text-xs font-semibold text-neutral-300 hover:text-white hover:bg-neutral-900 flex items-center justify-between"
                >
                  <span className="flex items-center gap-1.5">
                    <span>Special Deals</span>
                    <span className="px-1.5 py-0.2 rounded bg-red-950 text-red-400 text-[9px] font-bold border border-red-800">20% OFF</span>
                  </span>
                  <span className="material-symbols-outlined text-[16px] text-red-500">local_fire_department</span>
                </button>
              </nav>
            </div>

            {/* Department shortcuts */}
            <div className="space-y-1.5 pt-2 border-t border-neutral-800">
              <span className="text-[10px] font-label-uppercase uppercase text-red-500 font-bold tracking-wider px-2">
                Departments
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => navigateTo('shop', cat.id)}
                    className="p-2 rounded-lg bg-neutral-900 text-[11px] font-medium text-neutral-300 text-left hover:bg-neutral-800 hover:text-white transition-colors border border-neutral-800"
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-1 pt-2 border-t border-neutral-800">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsWishlistOpen(true);
                }}
                className="w-full py-2 px-3 rounded-lg text-xs text-neutral-300 hover:text-white hover:bg-neutral-900 flex items-center justify-between"
              >
                <span className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px]">favorite</span>
                  <span>Wishlist</span>
                </span>
                <span className="font-bold text-[10px] bg-neutral-800 text-neutral-300 px-1.5 py-0.2 rounded-full">
                  {wishlist.length}
                </span>
              </button>

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsCartOpen(true);
                }}
                className="w-full py-2 px-3 rounded-lg text-xs text-neutral-300 hover:text-white hover:bg-neutral-900 flex items-center justify-between"
              >
                <span className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px]">shopping_bag</span>
                  <span>Cart</span>
                </span>
                <span className="font-bold text-[10px] bg-red-600 text-white px-1.5 py-0.2 rounded-full">
                  {cartItemsCount}
                </span>
              </button>
            </div>
          </div>

          {/* Footer bio */}
          <div className="p-4 border-t border-neutral-800 bg-neutral-900 text-xs text-neutral-400">
            <p className="font-semibold text-white">NEXORA Online Store</p>
            <p className="text-[10px] mt-0.5">Simple, high-quality products for everyday life.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
