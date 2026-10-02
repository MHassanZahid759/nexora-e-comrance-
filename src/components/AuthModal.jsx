import React, { useState, useCallback } from 'react';
import { useShop } from '../context/ShopContext';

// ---------------------------------------------------------------------------
// Google Client ID — must match the backend's GOOGLE_CLIENT_ID
// ---------------------------------------------------------------------------
const GOOGLE_CLIENT_ID =
  '633177782845-t6srrr00sdppiobgfv0oj74ubl8a019i.apps.googleusercontent.com';

export const AuthModal = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    authMode,
    setAuthMode,
    authPromptMessage,
    initialAuthEmail,
    login,
    signup,
    loginWithGoogle,
    loginWithGoogleAccessToken,
    showToast
  } = useShop();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  React.useEffect(() => {
    if (initialAuthEmail) {
      setEmail(initialAuthEmail);
    }
  }, [initialAuthEmail, isAuthModalOpen]);

  // -------------------------------------------------------------------------
  // Google Sign-In handler — uses Google Identity Services (GIS)
  // The GIS script is loaded in index.html:
  //   <script src="https://accounts.google.com/gsi/client" async defer></script>
  // -------------------------------------------------------------------------
  const handleGoogleSignIn = useCallback(() => {
    if (isGoogleLoading) return;

    // Make sure the GIS library is loaded
    if (!window.google?.accounts?.id) {
      showToast('Google Sign-In is still loading. Please try again in a moment.', 'error');
      return;
    }

    setIsGoogleLoading(true);

    // Initialize Google Identity Services
    window.google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: async (response) => {
        // response.credential contains the JWT ID token
        if (response.credential) {
          const success = await loginWithGoogle(response.credential);
          if (!success) {
            setIsGoogleLoading(false);
          }
        } else {
          showToast('Google sign-in was cancelled or failed.', 'error');
          setIsGoogleLoading(false);
        }
      },
      auto_select: false,
      cancel_on_tap_outside: true
    });

    // Trigger the Google sign-in popup
    window.google.accounts.id.prompt((notification) => {
      // If prompt was dismissed or not displayed, fall back to button-click flow
      if (
        notification.isNotDisplayed() ||
        notification.isSkippedMoment() ||
        notification.isDismissedMoment()
      ) {
        // Fallback: use the FedCM / popup picker approach
        try {
          window.google.accounts.id.renderButton(
            document.createElement('div'),
            { type: 'standard' }
          );
          // If prompt doesn't show, try the code client as fallback
          // Use the OAuth2 popup via google.accounts.oauth2.initCodeClient if available
          // For now, show a manual message
          if (notification.isNotDisplayed()) {
            // The One Tap prompt is blocked (e.g. by browser or 3p cookie settings)
            // Try the button-based popup instead
            showGooglePopupFallback();
          }
        } catch (e) {
          console.warn('[Google Sign-In] Prompt fallback error:', e);
        }
        setIsGoogleLoading(false);
      }
    });
  }, [isGoogleLoading, loginWithGoogle, showToast]);

  // Fallback: open a Google sign-in popup via the tokenClient
  const showGooglePopupFallback = useCallback(() => {
    if (!window.google?.accounts?.oauth2) {
      showToast('Google authentication is not available. Please ensure popups are enabled.', 'error');
      return;
    }

    const tokenClient = window.google.accounts.oauth2.initTokenClient({
      client_id: GOOGLE_CLIENT_ID,
      scope: 'openid email profile',
      callback: async (tokenResponse) => {
        if (tokenResponse.access_token) {
          await loginWithGoogleAccessToken(tokenResponse.access_token);
        }
        setIsGoogleLoading(false);
      }
    });

    tokenClient.requestAccessToken();
  }, [showToast, loginWithGoogleAccessToken]);

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return;
    if (authMode === 'signup' && !name) return;

    setIsSubmitting(true);
    const success = authMode === 'login'
      ? await login(email.trim(), password)
      : await signup(name.trim(), email.trim(), password);
    setIsSubmitting(false);
    if (success) {
      setEmail('');
      setPassword('');
      setName('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity"
        onClick={() => setIsAuthModalOpen(false)}
      />

      {/* Modal Dialog */}
      <div className="relative bg-surface-container-lowest rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto border border-outline-variant/50 z-10 animate-fade-in">
        
        {/* Top Decorative Header */}
        <div className="relative bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-800 text-white p-6 sm:p-8 overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Close"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>

          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center border border-white/15">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" className="w-5 h-5" fill="none">
                <path d="M7 22L14 8L21 22M10 18H18" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="21" cy="8" r="2.5" fill="#D97706"/>
              </svg>
            </div>
            <span className="font-headline-sm font-bold tracking-tight text-lg">NEXORA</span>
          </div>

          <h3 className="font-headline-lg text-2xl font-bold tracking-tight">
            {authMode === 'login' ? 'Welcome Back' : 'Create an Account'}
          </h3>
          <p className="text-xs text-neutral-300 mt-1 leading-relaxed">
            {authPromptMessage || 'Sign in or create your account to unlock shopping, saved carts, and express checkout.'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-outline-variant/30 bg-surface-container-low/50 p-1.5 gap-1.5">
          <button
            type="button"
            onClick={() => setAuthMode('login')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
              authMode === 'login'
                ? 'bg-surface-container-lowest text-on-surface shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setAuthMode('signup')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
              authMode === 'signup'
                ? 'bg-surface-container-lowest text-on-surface shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4">
          
          {authMode === 'signup' && (
            <div className="space-y-1.5">
              <label className="text-xs font-label-uppercase text-on-surface-variant font-bold uppercase tracking-wider">
                Full Name
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3.5 text-on-surface-variant text-[18px] pointer-events-none">
                  person
                </span>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Sarah Jenkins"
                  className="w-full h-11 pl-10 pr-4 rounded-xl bg-surface-container-low border border-outline-variant/50 text-xs text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:border-primary focus:bg-surface-container-lowest transition-all"
                />
              </div>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-label-uppercase text-on-surface-variant font-bold uppercase tracking-wider">
              Email Address
            </label>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-3.5 text-on-surface-variant text-[18px] pointer-events-none">
                mail
              </span>
              <input
                type="email"
                required
                maxLength={254}
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full h-11 pl-10 pr-4 rounded-xl bg-surface-container-low border border-outline-variant/50 text-xs text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:border-primary focus:bg-surface-container-lowest transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-xs font-label-uppercase text-on-surface-variant font-bold uppercase tracking-wider">
                Password
              </label>
              {authMode === 'login' && (
                <button
                  type="button"
                  onClick={() => alert('Password reset link sent to your email.')}
                  className="text-[11px] text-on-surface-variant hover:text-primary font-medium hover:underline"
                >
                  Forgot Password?
                </button>
              )}
            </div>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-3.5 text-on-surface-variant text-[18px] pointer-events-none">
                lock
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                minLength={authMode === 'signup' ? 8 : undefined}
                maxLength={128}
                autoComplete={authMode === 'signup' ? 'new-password' : 'current-password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full h-11 pl-10 pr-10 rounded-xl bg-surface-container-low border border-outline-variant/50 text-xs text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:border-primary focus:bg-surface-container-lowest transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 text-on-surface-variant hover:text-on-surface"
              >
                <span className="material-symbols-outlined text-[18px]">
                  {showPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
          </div>

          {authMode === 'signup' && (
            <label className="flex items-center gap-2 pt-1 cursor-pointer">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="rounded border-outline-variant text-primary focus:ring-0"
              />
              <span className="text-[11px] text-on-surface-variant">
                I agree to the Terms of Service & Privacy Policy.
              </span>
            </label>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-label-md text-xs font-bold shadow-lg transition-all duration-200 active:scale-98 flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
          >
            {isSubmitting ? (
              <>
                <span className="material-symbols-outlined text-[16px] animate-spin">progress_activity</span>
                <span>{authMode === 'login' ? 'Signing In...' : 'Creating Account...'}</span>
              </>
            ) : (
              <span>{authMode === 'login' ? 'Sign In to Shop' : 'Create My Account'}</span>
            )}
          </button>

          {/* Divider */}
          <div className="relative flex items-center justify-center pt-2">
            <div className="border-t border-outline-variant/30 w-full"></div>
            <span className="bg-surface-container-lowest px-3 text-[10px] font-label-uppercase text-on-surface-variant/70 font-bold uppercase">
              Or Continue With
            </span>
          </div>

          {/* Social Sign-In — Official Google Sign-In */}
          <div className="pt-1">
            <button
              type="button"
              id="google-signin-btn"
              onClick={handleGoogleSignIn}
              disabled={isGoogleLoading}
              className="w-full py-3 px-4 rounded-xl border border-outline-variant/60 hover:bg-surface-container-low text-xs font-semibold flex items-center justify-center gap-2.5 transition-all shadow-sm active:scale-98 disabled:opacity-60 bg-surface-container-lowest"
            >
              {isGoogleLoading ? (
                <>
                  <span className="material-symbols-outlined text-[16px] animate-spin">progress_activity</span>
                  <span>Connecting to Google…</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                  </svg>
                  <span>Continue with Google</span>
                </>
              )}
            </button>
          </div>

          <div className="pt-2 text-center text-xs text-on-surface-variant">
            {authMode === 'login' ? (
              <span>
                Don't have an account yet?{' '}
                <button
                  type="button"
                  onClick={() => setAuthMode('signup')}
                  className="text-primary font-bold hover:underline"
                >
                  Create one here
                </button>
              </span>
            ) : (
              <span>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setAuthMode('login')}
                  className="text-primary font-bold hover:underline"
                >
                  Sign in here
                </button>
              </span>
            )}
          </div>

        </form>

      </div>
    </div>
  );
};
