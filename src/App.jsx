import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { NetflixLandingPage } from './components/NetflixLandingPage';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { CategorySection } from './components/CategorySection';
import { FeaturedProductsSection } from './components/FeaturedProductsSection';
import { PromoBanner } from './components/PromoBanner';
import { BestSellersSection } from './components/BestSellersSection';
import { ValuePropsSection } from './components/ValuePropsSection';
import { NewsletterSection } from './components/NewsletterSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { QuickViewModal } from './components/QuickViewModal';
import { CheckoutModal } from './components/CheckoutModal';
import { SearchModal } from './components/SearchModal';
import { MobileMenu } from './components/MobileMenu';
import { ToastContainer } from './components/ToastContainer';
import { AuthModal } from './components/AuthModal';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { BackToTop } from './components/BackToTop';

function MainStoreApp() {
  const { user } = useShop();

  // If user is not signed in, strictly keep them on the Landing Page with Auth Modal
  if (!user) {
    return (
      <div className="min-h-screen bg-neutral-950 flex flex-col">
        <ScrollProgressBar />
        <NetflixLandingPage />
        <AuthModal />
        <ToastContainer />
        <BackToTop />
      </div>
    );
  }

  // Once authenticated via Sign In or Google, show the Full Store
  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col selection:bg-red-600 selection:text-white animate-fade-in">
      {/* Scroll Progress Bar at the top */}
      <ScrollProgressBar />

      {/* Global Navigation Header */}
      <Header />

      {/* Main Content Sections */}
      <main className="w-full pt-[116px] md:pt-[152px] bg-neutral-950 flex-1">
        <HeroSection />
        <CategorySection />
        <FeaturedProductsSection />
        <PromoBanner />
        <BestSellersSection />
        <ValuePropsSection />
        <NewsletterSection />
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Slide-over Drawers & Modals */}
      <CartDrawer />
      <WishlistDrawer />
      <QuickViewModal />
      <CheckoutModal />
      <SearchModal />
      <MobileMenu />
      <ToastContainer />
      <AuthModal />
      <BackToTop />
    </div>
  );
}

export default function App() {
  return (
    <ShopProvider>
      <MainStoreApp />
    </ShopProvider>
  );
}
