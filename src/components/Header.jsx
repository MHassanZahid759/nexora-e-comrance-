import React, { useState, useRef, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { CURRENCIES, CATEGORIES, PRODUCTS } from '../data/products';

export const Header = () => {
  const {
    user,
    logout,
    currency,
    setCurrency,
    cartItemsCount,
    cartTotal,
    wishlist,
    formatPrice,
    setIsCartOpen,
    setIsWishlistOpen,
    setIsSearchOpen,
    setIsMobileMenuOpen,
    activePage,
    setActivePage,
    setSelectedCategory,
    setSelectedTab,
    setQuickViewProduct
  } = useShop();

  // Scroll detection
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);
  const [isCategoriesMenuOpen, setIsCategoriesMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  
  // Interactive search state
  const [inlineSearchQuery, setInlineSearchQuery] = useState('');
  const [isInlineSearchFocused, setIsInlineSearchFocused] = useState(false);
  const searchContainerRef = useRef(null);

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 25) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setIsInlineSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (pageName, category = 'all') => {
    setActivePage(pageName);
    setIsCategoriesMenuOpen(false);
    setIsProfileMenuOpen(false);

    if (pageName === 'shop') {
      setSelectedCategory(category);
      const el = document.getElementById('featured-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (pageName === 'categories') {
      setSelectedCategory('all');
      const el = document.getElementById('categories-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (pageName === 'deals') {
      setSelectedTab('offers');
      const el = document.getElementById('deals-section') || document.getElementById('featured-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (pageName === 'about') {
      const el = document.getElementById('values-section') || document.getElementById('footer-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleCategorySelect = (categoryId) => {
    setIsCategoriesMenuOpen(false);
    setActivePage('shop');
    setSelectedCategory(categoryId);
    const el = document.getElementById('featured-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };


  // Quick live search matches
  const quickSearchResults = inlineSearchQuery.trim()
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(inlineSearchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(inlineSearchQuery.toLowerCase())
      ).slice(0, 4)
    : [];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-300" style={{fontFamily:'Inter,system-ui,sans-serif'}}>
      
      {/* 1. TOP ANNOUNCEMENT BAR */}
      <div
        className={`bg-black text-white transition-all duration-300 overflow-hidden border-b border-neutral-800 ${
          isScrolled ? 'max-h-0 opacity-0' : 'max-h-10 opacity-100'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-margin md:px-margin-md lg:px-margin-lg h-9 flex items-center justify-between text-xs font-medium">
          
          {/* Animated Announcement Ticker */}
          <div className="flex items-center gap-space-xs truncate">
            <span className="flex items-center gap-1.5 text-neutral-200">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Free shipping on orders over $150
            </span>
            <span className="opacity-30 hidden sm:inline">•</span>
            <span className="hidden sm:inline text-neutral-300">30-day money-back guarantee</span>
            <span className="opacity-30 hidden md:inline">•</span>
            
            {/* Promo Badge with Shimmer Effect */}
            <div className="hidden md:inline-flex relative overflow-hidden rounded px-2 py-0.5 bg-neutral-800 text-amber-300 font-mono text-[11px] font-bold border border-amber-400/30">
              <div className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shimmer pointer-events-none"></div>
              <span>Code: NEXORA20 (-20%)</span>
            </div>
          </div>

          {/* Right Links & Currency */}
          <div className="flex items-center gap-4 text-neutral-300">
            {/* Auth status in top bar (only show name if user logged in) */}
            {user && (
              <span className="hidden sm:inline text-xs text-neutral-300">
                Hi, <strong>{user.name}</strong>
              </span>
            )}

            <span className="hidden sm:inline text-neutral-700">|</span>

            {/* Currency Selector */}
            <div className="relative">
              <button
                onClick={() => setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen)}
                className="flex items-center gap-1 text-[11px] hover:text-white transition-colors py-0.5 px-2 rounded hover:bg-neutral-800 font-medium"
                aria-label="Currency selector"
              >
                <span className="material-symbols-outlined text-[14px]">language</span>
                <span>{CURRENCIES[currency]?.label || currency}</span>
                <span className={`material-symbols-outlined text-[13px] transition-transform duration-200 ${isCurrencyDropdownOpen ? 'rotate-180' : ''}`}>
                  expand_more
                </span>
              </button>

              {isCurrencyDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsCurrencyDropdownOpen(false)}
                  />
                  <div className="absolute right-0 top-full mt-1.5 w-56 bg-neutral-900 text-neutral-100 border border-neutral-700 rounded-xl shadow-2xl py-1 z-50 animate-dropdown">
                    <div className="px-3.5 py-2 text-[11px] font-label-uppercase text-neutral-400 border-b border-neutral-800 font-bold">
                      Select Currency
                    </div>
                    {Object.entries(CURRENCIES).map(([code, item]) => (
                      <button
                        key={code}
                        onClick={() => {
                          setCurrency(code);
                          setIsCurrencyDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-neutral-800 transition-colors ${
                          currency === code ? 'font-bold text-red-500 bg-neutral-800' : 'text-neutral-300'
                        }`}
                      >
                        <span>{item.label}</span>
                        {currency === code && (
                          <span className="material-symbols-outlined text-[16px] text-red-500">check</span>
                        )}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* 2. MAIN NAV CONTAINER */}
      <div
        className={`w-full transition-all duration-300 border-b ${
          isScrolled
            ? 'bg-black/95 backdrop-blur-2xl shadow-[0_4px_30px_rgba(0,0,0,0.8)] border-neutral-800/80 py-2.5'
            : 'bg-black/90 backdrop-blur-xl border-neutral-800/60 py-4'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-margin md:px-margin-md lg:px-margin-lg flex items-center justify-between gap-4 md:gap-6">
          
          {/* Left: Mobile Toggle & Brand Logo */}
          <div className="flex items-center gap-4 lg:gap-8">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="xl:hidden p-2 rounded-xl text-neutral-200 hover:bg-neutral-800 transition-all active:scale-95"
              aria-label="Open menu"
            >
              <span className="material-symbols-outlined text-[26px]">menu</span>
            </button>

            {/* Brand Logo with Jewel Sparkle Animation */}
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-2.5 text-left group"
            >
              <div className="relative w-9 h-9 rounded-xl bg-neutral-950 flex items-center justify-center text-white font-black shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all duration-300 overflow-hidden border border-neutral-700">
                <div className="absolute inset-0 bg-gradient-to-tr from-red-600/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" className="w-6 h-6 z-10" fill="none">
                  <path d="M7 22L14 8L21 22M10 18H18" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="21" cy="8" r="2.5" fill="#e50914" className="group-hover:animate-ping opacity-90"/>
                  <circle cx="21" cy="8" r="2.5" fill="#e50914"/>
                </svg>
              </div>

              <div className="flex flex-col">
                <span className="font-headline-sm text-[20px] font-extrabold tracking-tight text-white group-hover:text-red-500 transition-colors leading-none">
                  NEXORA
                </span>
                <span className="text-[10px] font-label-uppercase text-neutral-500 tracking-wider mt-0.5 font-semibold">
                  Modern Store
                </span>
              </div>
            </button>

            {/* Desktop Navigation Links with Animated Active Capsule */}
            <nav className="hidden xl:flex items-center gap-1 text-sm font-semibold">
              <button
                onClick={() => handleNavClick('home')}
                className={`relative px-4 py-2 rounded-xl transition-all duration-200 group ${
                  activePage === 'home'
                    ? 'text-red-500 font-bold bg-neutral-800'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800/70'
                }`}
              >
                <span>Home</span>
                {activePage === 'home' && (
                  <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-red-500 rounded-full animate-fade-in"></span>
                )}
              </button>

              <button
                onClick={() => handleNavClick('shop')}
                className={`relative px-4 py-2 rounded-xl transition-all duration-200 group ${
                  activePage === 'shop'
                    ? 'text-red-500 font-bold bg-neutral-800'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800/70'
                }`}
              >
                <span>Shop All</span>
                {activePage === 'shop' && (
                  <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-red-500 rounded-full animate-fade-in"></span>
                )}
              </button>

              {/* Categories Mega Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setIsCategoriesMenuOpen(true)}
                onMouseLeave={() => setIsCategoriesMenuOpen(false)}
              >
                <button
                  onClick={() => handleNavClick('categories')}
                  className={`px-4 py-2 rounded-xl flex items-center gap-1 transition-all duration-200 ${
                    isCategoriesMenuOpen || activePage === 'categories'
                      ? 'text-red-500 font-bold bg-neutral-800'
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-800/70'
                  }`}
                >
                  <span>Categories</span>
                  <span className={`material-symbols-outlined text-[16px] transition-transform duration-300 ${isCategoriesMenuOpen ? 'rotate-180 text-red-500' : ''}`}>
                    expand_more
                  </span>
                </button>

                {/* Categories Mega Menu Popover */}
                {isCategoriesMenuOpen && (
                  <div className="absolute left-0 top-full pt-2 w-[640px] z-50 animate-dropdown">
                    <div className="bg-neutral-900/98 backdrop-blur-2xl border border-neutral-700 rounded-2xl shadow-2xl p-5 grid grid-cols-2 gap-3">
                      {CATEGORIES.map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => handleCategorySelect(cat.id)}
                          className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-neutral-800 text-left transition-all duration-200 group/item border border-transparent hover:border-neutral-600 hover:shadow-sm"
                        >
                          <img
                            src={cat.image}
                            alt={cat.name}
                            className="w-14 h-14 rounded-xl object-cover bg-neutral-800 shadow-sm group-hover/item:scale-105 group-hover/item:rotate-1 transition-transform duration-300"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-xs text-white group-hover/item:text-red-400 transition-colors">
                                {cat.name}
                              </span>
                              <span className="text-[10px] text-neutral-500 font-mono bg-neutral-800 px-1.5 py-0.5 rounded">
                                {cat.itemCount}
                              </span>
                            </div>
                            <p className="text-[11px] text-neutral-400 truncate mt-0.5">
                              {cat.tagline}
                            </p>
                          </div>
                        </button>
                      ))}
                      
                      <div className="col-span-2 pt-2 border-t border-neutral-700 flex items-center justify-between text-xs">
                        <span className="text-neutral-400">Looking for all departments?</span>
                        <button
                          onClick={() => handleNavClick('categories')}
                          className="font-bold text-red-500 hover:underline flex items-center gap-1 group/btn"
                        >
                          <span>Explore All Categories</span>
                          <span className="material-symbols-outlined text-[14px] group-hover/btn:translate-x-1 transition-transform">
                            arrow_forward
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Special Deals with Live Flame & Shimmer Badge */}
              <button
                onClick={() => handleNavClick('deals')}
                className={`relative px-4 py-2 rounded-xl flex items-center gap-1.5 transition-all duration-200 ${
                  activePage === 'deals'
                    ? 'text-red-500 font-bold bg-neutral-800'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800/70'
                }`}
              >
                <span>Special Deals</span>
                <span className="relative overflow-hidden px-2 py-0.5 rounded-full bg-gradient-to-r from-red-600 to-orange-500 text-white font-label-uppercase text-[10px] font-extrabold flex items-center gap-0.5 shadow-sm animate-float">
                  <div className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 animate-shimmer pointer-events-none"></div>
                  <span className="material-symbols-outlined text-[12px]">local_fire_department</span>
                  <span>20% OFF</span>
                </span>
              </button>

              <button
                onClick={() => handleNavClick('about')}
                className={`px-4 py-2 rounded-xl transition-all duration-200 ${
                  activePage === 'about'
                    ? 'text-red-500 font-bold bg-neutral-800'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800/70'
                }`}
              >
                Why Us
              </button>
            </nav>
          </div>

          {/* Center/Right: Expanding Interactive Live Search */}
          <div ref={searchContainerRef} className="flex-1 max-w-md hidden lg:block relative">
            <div className={`relative flex items-center transition-all duration-300 ${isInlineSearchFocused ? 'scale-[1.02]' : ''}`}>
              <span className={`material-symbols-outlined absolute left-3.5 text-[20px] transition-colors duration-200 pointer-events-none ${
                isInlineSearchFocused ? 'text-red-500' : 'text-neutral-500'
              }`}>
                search
              </span>
              <input
                type="text"
                value={inlineSearchQuery}
                onChange={(e) => setInlineSearchQuery(e.target.value)}
                onFocus={() => setIsInlineSearchFocused(true)}
                placeholder="Search products, categories, shoes, headphones..."
                className={`w-full h-11 pl-10 pr-20 rounded-xl text-xs text-white placeholder:text-neutral-500 border transition-all duration-300 focus:outline-none ${
                  isInlineSearchFocused
                    ? 'bg-neutral-900 border-red-600/50 shadow-lg ring-2 ring-red-600/20'
                    : 'bg-neutral-900/80 hover:bg-neutral-900 border-neutral-700 hover:border-neutral-600 shadow-sm'
                }`}
              />
              <div className="absolute right-2.5 flex items-center gap-1">
                {inlineSearchQuery ? (
                  <button
                    onClick={() => setInlineSearchQuery('')}
                    className="p-1 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-700 transition-colors"
                  >
                    <span className="material-symbols-outlined text-[15px]">close</span>
                  </button>
                ) : (
                  <button
                    onClick={() => setIsSearchOpen(true)}
                    className="px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-400 font-label-uppercase text-[10px] tracking-wide border border-neutral-700 hover:bg-neutral-700 hover:text-white transition-colors"
                    title="Open Search Palette"
                  >
                    ⌘K
                  </button>
                )}
              </div>
            </div>

            {/* Quick Search Results Dropdown */}
            {isInlineSearchFocused && inlineSearchQuery.trim() && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-neutral-900/98 backdrop-blur-2xl border border-neutral-700 rounded-2xl shadow-2xl p-3 z-50 animate-dropdown">
                <div className="text-[11px] font-label-uppercase text-neutral-500 px-2 py-1 border-b border-neutral-800 font-semibold flex justify-between items-center">
                  <span>Matching Items</span>
                  <span>{quickSearchResults.length} Results</span>
                </div>
                
                <div className="divide-y divide-neutral-800 max-h-72 overflow-y-auto">
                  {quickSearchResults.length === 0 ? (
                    <div className="p-4 text-center text-xs text-neutral-500">
                      No matching products found for "{inlineSearchQuery}"
                    </div>
                  ) : (
                    quickSearchResults.map((prod) => (
                      <div
                        key={prod.id}
                        onClick={() => {
                          setQuickViewProduct(prod);
                          setIsInlineSearchFocused(false);
                          setInlineSearchQuery('');
                        }}
                        className="p-2.5 flex items-center justify-between hover:bg-neutral-800 rounded-xl cursor-pointer transition-all group"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={prod.image}
                            alt={prod.name}
                            className="w-10 h-11 rounded-lg object-cover bg-neutral-800 group-hover:scale-105 transition-transform"
                          />
                          <div>
                            <h6 className="font-semibold text-xs text-white group-hover:text-red-400 transition-colors line-clamp-1">
                              {prod.name}
                            </h6>
                            <span className="text-[11px] text-neutral-500 uppercase">
                              {prod.category}
                            </span>
                          </div>
                        </div>
                        <span className="font-mono font-bold text-xs text-white">
                          {formatPrice(prod.price)}
                        </span>
                      </div>
                    ))
                  )}
                </div>

                <div className="p-2 pt-2.5 border-t border-neutral-800 text-center">
                  <button
                    onClick={() => {
                      setIsSearchOpen(true);
                      setIsInlineSearchFocused(false);
                    }}
                    className="text-xs font-bold text-red-500 hover:underline flex items-center justify-center gap-1 mx-auto"
                  >
                    <span>View all results in search modal</span>
                    <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right: Actions (Sign In / Profile, Wishlist, Cart) */}
          <div className="flex items-center gap-2">
            
            {/* Mobile Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="lg:hidden p-2.5 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800 transition-all active:scale-90"
              aria-label="Open search"
            >
              <span className="material-symbols-outlined text-[22px]">search</span>
            </button>

            {/* Wishlist Button with Heart Pop Counter */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="relative p-2.5 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800 transition-all active:scale-90 group"
              aria-label="Wishlist"
              title="View Wishlist"
            >
              <span className="material-symbols-outlined text-[22px] group-hover:text-red-500 group-hover:scale-110 transition-all duration-200">
                favorite
              </span>
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-red-600 text-white rounded-full flex items-center justify-center font-label-sm text-[10px] font-bold shadow-md animate-fade-in ring-2 ring-black">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* User Account Dropdown (only if Logged In) */}
            {user && (
              <div className="relative">
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  aria-label="Account menu"
                  className="flex items-center gap-1.5 p-1 pl-1.5 pr-2 rounded-xl text-neutral-300 hover:bg-neutral-800 transition-all border border-neutral-700 hover:border-neutral-500 active:scale-95 bg-neutral-900"
                >
                  <img
                    alt={user.name}
                    className="w-7 h-7 rounded-lg object-cover ring-1 ring-neutral-600"
                    src={user.avatar}
                  />
                  <span className="text-xs font-bold text-white hidden md:inline">
                    {user.name}
                  </span>
                  <span className={`material-symbols-outlined text-[16px] transition-transform duration-200 ${isProfileMenuOpen ? 'rotate-180' : ''}`}>
                    expand_more
                  </span>
                </button>

                {/* Profile Dropdown Popover */}
                {isProfileMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setIsProfileMenuOpen(false)}
                    />
                    <div className="absolute right-0 top-full mt-2 w-60 bg-neutral-900/98 backdrop-blur-2xl border border-neutral-700 rounded-2xl shadow-2xl p-2 z-50 animate-dropdown">
                      <div className="p-3 border-b border-neutral-800 flex items-center gap-3">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-10 h-10 rounded-full object-cover ring-2 ring-red-600 shadow-md"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-white truncate">{user.name}</p>
                          <p className="text-[11px] text-neutral-400 truncate">{user.email}</p>
                        </div>
                      </div>
                      
                      <div className="py-1 text-xs space-y-0.5">
                        <button
                          onClick={() => {
                            setIsProfileMenuOpen(false);
                            handleNavClick('about');
                          }}
                          className="w-full text-left px-3 py-2 rounded-lg text-neutral-200 hover:bg-neutral-800 flex items-center gap-2.5 transition-colors"
                        >
                          <span className="material-symbols-outlined text-[16px] text-neutral-500">local_shipping</span>
                          <span>My Orders & Tracking</span>
                        </button>
                        
                        <button
                          onClick={() => {
                            setIsProfileMenuOpen(false);
                            setIsWishlistOpen(true);
                          }}
                          className="w-full text-left px-3 py-2 rounded-lg text-neutral-200 hover:bg-neutral-800 flex items-center justify-between transition-colors"
                        >
                          <span className="flex items-center gap-2.5">
                            <span className="material-symbols-outlined text-[16px] text-neutral-500">favorite</span>
                            <span>Saved Wishlist</span>
                          </span>
                          <span className="text-[10px] font-bold font-mono bg-neutral-800 text-neutral-300 px-1.5 py-0.5 rounded">
                            {wishlist.length}
                          </span>
                        </button>

                        <button
                          onClick={() => {
                            setIsProfileMenuOpen(false);
                            handleNavClick('about');
                          }}
                          className="w-full text-left px-3 py-2 rounded-lg text-neutral-200 hover:bg-neutral-800 flex items-center gap-2.5 transition-colors"
                        >
                          <span className="material-symbols-outlined text-[16px] text-neutral-500">support_agent</span>
                          <span>24/7 Support Team</span>
                        </button>
                      </div>

                      <div className="pt-1 border-t border-neutral-800">
                        <button
                          onClick={() => {
                            setIsProfileMenuOpen(false);
                            logout();
                          }}
                          className="w-full text-left px-3 py-1.5 rounded-lg text-[11px] text-red-400 hover:bg-red-950/50 font-bold transition-colors flex items-center gap-2"
                        >
                          <span className="material-symbols-outlined text-[16px]">logout</span>
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Cart Button with Wiggle Effect */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 pl-3.5 pr-4 py-2 rounded-full bg-red-600 text-white hover:bg-red-700 shadow-md hover:shadow-red-600/40 transition-all duration-300 active:scale-95 group animate-cart-wiggle"
              aria-label="View Cart"
            >
              <span className="material-symbols-outlined text-[19px] transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110">
                shopping_bag
              </span>
              <span className="flex items-center gap-1.5">
                <span className="px-1.5 py-0.2 rounded-full bg-black/40 text-white font-label-sm text-[11px] font-extrabold leading-tight shadow-sm">
                  {cartItemsCount}
                </span>
                <span className="font-label-md text-xs font-semibold hidden sm:inline transition-all">
                  {formatPrice(cartTotal)}
                </span>
              </span>
            </button>

          </div>

        </div>
      </div>

      {/* 3. CATEGORIES QUICK SCROLL RIBBON */}
      <div className="bg-black/80 backdrop-blur-md border-b border-neutral-800/60 hidden md:block transition-all duration-200">
        <div className="max-w-[1440px] mx-auto px-margin md:px-margin-md lg:px-margin-lg py-1.5 flex items-center justify-between text-xs text-neutral-400">
          <div className="flex items-center gap-1.5 overflow-x-auto">
            <span className="font-label-uppercase text-[10px] text-neutral-600 uppercase font-bold mr-1">
              Explore:
            </span>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategorySelect(cat.id)}
                className="px-3 py-1 rounded-lg hover:bg-neutral-800 hover:text-white transition-all duration-200 whitespace-nowrap hover:scale-105 active:scale-95"
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 text-[11px] shrink-0 font-semibold">
            <span className="flex items-center gap-1 text-red-400 bg-red-950/60 px-2.5 py-0.5 rounded-full border border-red-800/50">
              <span className="material-symbols-outlined text-[14px] animate-pulse">bolt</span>
              Flash Deals Live
            </span>
          </div>
        </div>
      </div>

    </header>
  );
};
