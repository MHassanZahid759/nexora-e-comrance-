import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS, CURRENCIES } from '../data/products';

const ShopContext = createContext(null);
const AUTH_STORAGE_KEY = 'nexora_user_v2';

export const ShopProvider = ({ children }) => {
  // User Authentication State
  const [user, setUser] = useState(() => {
    try {
      const savedUser = sessionStorage.getItem(AUTH_STORAGE_KEY);
      if (savedUser) return JSON.parse(savedUser);
    } catch (e) {
      console.error(e);
    }
    return null; // Guest / Logged out by default
  });

  // Netflix Landing Page vs Full Store state
  const [isStoreUnlocked, setIsStoreUnlocked] = useState(() => {
    try {
      const savedUser = sessionStorage.getItem(AUTH_STORAGE_KEY);
      if (savedUser) return true; // Logged in users go directly to store
    } catch (e) { /* ignore */ }
    return false; // Show Netflix landing page first by default
  });

  const [initialAuthEmail, setInitialAuthEmail] = useState('');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('signup'); // 'login' | 'signup'
  const [authPromptMessage, setAuthPromptMessage] = useState('Please sign in or create an account to start shopping.');
  const [pendingAction, setPendingAction] = useState(null);

  // Cart state
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('nexora_cart');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [];
  });

  // Wishlist state (IDs)
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('nexora_wishlist');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [];
  });

  // Currency
  const [currency, setCurrency] = useState('USD');

  // Active coupon
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  // Active navigation view
  const [activePage, setActivePage] = useState('home');

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTab, setSelectedTab] = useState('all');
  const [sortBy, setSortBy] = useState('recommended');

  // Drawer / Modals UI state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Dynamic Toasts
  const [toasts, setToasts] = useState([]);

  // Keep authentication limited to this browser tab/session.
  useEffect(() => {
    try {
      localStorage.removeItem('nexora_user');
      sessionStorage.removeItem('nexora_user');
      if (user) {
        sessionStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
        setIsStoreUnlocked(true);
      } else {
        sessionStorage.removeItem(AUTH_STORAGE_KEY);
      }
    } catch (e) {}
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem('nexora_cart', JSON.stringify(cart));
    } catch (e) {}
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('nexora_wishlist', JSON.stringify(wishlist));
    } catch (e) {}
  }, [wishlist]);

  // Keyboard shortcut for Command palette (⌘K / Ctrl+K) & Escape to close modals
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsCartOpen(false);
        setIsWishlistOpen(false);
        setIsSearchOpen(false);
        setIsAuthModalOpen(false);
        setQuickViewProduct(null);
        setIsCheckoutOpen(false);
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const showToast = (message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Require Auth Gate
  const requireAuth = (actionCallback, customPrompt = 'Please sign in or create an account first.') => {
    if (user) {
      if (actionCallback) actionCallback();
      return true;
    } else {
      setAuthPromptMessage(customPrompt);
      setPendingAction(() => actionCallback);
      setIsAuthModalOpen(true);
      return false;
    }
  };

  // Enter Store action from Netflix Landing Page
  const enterStoreWithEmail = (email = '') => {
    if (email) {
      setInitialAuthEmail(email);
    }
    setAuthMode('signup');
    setAuthPromptMessage('Complete your account details to start shopping.');
    setIsAuthModalOpen(true);
  };

  // Direct unlock request prompts sign in
  const unlockStoreDirectly = () => {
    setIsAuthModalOpen(true);
    setAuthMode('login');
    setAuthPromptMessage('Please sign in or create an account to access the store.');
  };

  // Return to Netflix Landing page
  const exitToLanding = () => {
    setIsStoreUnlocked(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Helper to generate dynamic profile avatar matching email/name
  const generateAvatar = (email, name = '') => {
    const cleanEmail = (email || '').trim().toLowerCase();
    const displayName = name.trim() || cleanEmail.split('@')[0] || 'Customer';
    // Generates a sharp Netflix-Red (#e50914) round profile avatar with white initials matching the user's email/name
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=e50914&color=ffffff&bold=true&size=256`;
  };

  const completeAuth = (authenticatedUser, message) => {
    const userWithAvatar = {
      ...authenticatedUser,
      avatar: authenticatedUser.avatar || generateAvatar(authenticatedUser.email, authenticatedUser.name)
    };
    setUser(userWithAvatar);
    setIsStoreUnlocked(true);
    setIsAuthModalOpen(false);
    showToast(message);

    if (pendingAction) {
      setTimeout(() => {
        pendingAction();
        setPendingAction(null);
      }, 200);
    }
  };

  const login = async (email, password) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Sign-in failed.');

      completeAuth(data.user, `Welcome back, ${data.user.name}!`);
      return true;
    } catch (error) {
      showToast(error.message || 'Could not sign in. Please try again.', 'error');
      return false;
    }
  };

  const signup = async (name, email, password) => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ name, email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Account creation failed.');

      completeAuth(data.user, `Account created successfully! Welcome, ${data.user.name}.`);
      return true;
    } catch (error) {
      showToast(error.message || 'Could not create the account. Please try again.', 'error');
      return false;
    }
  };

  // Google Sign-In — sends the credential (ID token) to the backend for verification
  const loginWithGoogle = async (credential) => {
    try {
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ credential })
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || 'Google sign-in failed.');
      }

      const data = await res.json();
      const googleUser = data.user;
      completeAuth(googleUser, `Welcome, ${googleUser.name}!`);
      return true;
    } catch (err) {
      console.error('[loginWithGoogle]', err);
      showToast(err.message || 'Google sign-in failed. Please try again.', 'error');
      return false;
    }
  };

  const loginWithGoogleAccessToken = async (accessToken) => {
    try {
      const res = await fetch('/api/auth/google/access-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ accessToken })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Google sign-in failed.');

      completeAuth(data.user, `Welcome, ${data.user.name}!`);
      return true;
    } catch (error) {
      console.error('[loginWithGoogleAccessToken]', error);
      showToast(error.message || 'Google sign-in failed. Please try again.', 'error');
      return false;
    }
  };

  // User Logout — also destroys server session
  const logout = async () => {
    // Attempt to destroy server session (non-blocking)
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });
    } catch (e) {
      // Backend may be unavailable — still log out client-side
    }
    setUser(null);
    setIsStoreUnlocked(false); // Return to Netflix landing page on logout
    showToast('You have signed out', 'info');
  };

  // Price formatter with currency rate
  const formatPrice = (amountInUSD) => {
    if (amountInUSD == null) return null;
    const curr = CURRENCIES[currency] || CURRENCIES.USD;
    const converted = amountInUSD * curr.rate;
    if (currency === 'JPY') {
      return `${curr.symbol}${Math.round(converted).toLocaleString()}`;
    }
    return `${curr.symbol}${converted.toFixed(2)}`;
  };

  // Cart operations
  const addToCart = (product, quantity = 1, selectedColor = null) => {
    const proceed = () => {
      setCart((prev) => {
        const existingIdx = prev.findIndex((item) => item.product.id === product.id);
        if (existingIdx > -1) {
          const updated = [...prev];
          updated[existingIdx].quantity += quantity;
          return updated;
        } else {
          return [
            ...prev,
            {
              product,
              quantity,
              selectedColor: selectedColor || (product.colors && product.colors[0]) || 'Standard'
            }
          ];
        }
      });
      showToast(`Added "${product.name}" to cart!`);
    };

    requireAuth(proceed, `Please sign in or create an account to add "${product.name}" to your cart.`);
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Item removed from cart', 'info');
  };

  const updateQuantity = (productId, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist toggle
  const toggleWishlist = (product) => {
    const proceed = () => {
      setWishlist((prev) => {
        const exists = prev.includes(product.id);
        if (exists) {
          showToast(`Removed from wishlist`, 'info');
          return prev.filter((id) => id !== product.id);
        } else {
          showToast(`Added "${product.name}" to wishlist ❤️`);
          return [...prev, product.id];
        }
      });
    };

    requireAuth(proceed, `Please sign in or create an account to save items to your wishlist.`);
  };

  const isWishlisted = (productId) => wishlist.includes(productId);

  // Coupon handling
  const applyCoupon = (code) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'NEXORA20') {
      setAppliedCoupon({ code: 'NEXORA20', discountPercent: 20 });
      showToast('20% Promo Code "NEXORA20" applied successfully!');
      return { success: true, message: '20% off applied!' };
    } else {
      showToast('Invalid promo code. Try "NEXORA20"', 'error');
      return { success: false, message: 'Invalid code. Try "NEXORA20"' };
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Promo code removed', 'info');
  };

  // Cart calculations
  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountAmount = appliedCoupon ? (cartSubtotal * appliedCoupon.discountPercent) / 100 : 0;
  const freeShippingThreshold = 150;
  const isFreeShipping = cartSubtotal >= freeShippingThreshold || cart.length === 0;
  const shippingCost = isFreeShipping ? 0 : 15;
  const cartTotal = Math.max(0, cartSubtotal - discountAmount + shippingCost);
  const cartItemsCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <ShopContext.Provider
      value={{
        user,
        setUser,
        isStoreUnlocked,
        setIsStoreUnlocked,
        enterStoreWithEmail,
        unlockStoreDirectly,
        exitToLanding,
        initialAuthEmail,
        setInitialAuthEmail,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authMode,
        setAuthMode,
        authPromptMessage,
        setAuthPromptMessage,
        requireAuth,
        login,
        signup,
        loginWithGoogle,
        loginWithGoogleAccessToken,
        logout,
        cart,
        wishlist,
        currency,
        setCurrency,
        appliedCoupon,
        activePage,
        setActivePage,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        selectedTab,
        setSelectedTab,
        sortBy,
        setSortBy,
        isCartOpen,
        setIsCartOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        isSearchOpen,
        setIsSearchOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isMobileMenuOpen,
        setIsMobileMenuOpen,
        quickViewProduct,
        setQuickViewProduct,
        toasts,
        showToast,
        removeToast,
        formatPrice,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isWishlisted,
        applyCoupon,
        removeCoupon,
        cartSubtotal,
        discountAmount,
        isFreeShipping,
        shippingCost,
        cartTotal,
        cartItemsCount,
        freeShippingThreshold
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
