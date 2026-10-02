import React, { useEffect, useState } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { RevealOnScroll } from './RevealOnScroll';

export const HeroSection = () => {
  const { setQuickViewProduct } = useShop();
  const [activeSpotlight, setActiveSpotlight] = useState(0);

  const headphones = PRODUCTS.find((p) => p.id === 'aura-sound-pro') || PRODUCTS[0];
  const watch = PRODUCTS.find((p) => p.id === 'obsidian-chrono') || PRODUCTS[1];
  const brew = PRODUCTS.find((p) => p.id === 'nordic-ceramic-brew') || PRODUCTS[3];

  const spotlightProducts = [headphones, watch, brew];
  const currentProduct = spotlightProducts[activeSpotlight];

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveSpotlight((currentIndex) => (currentIndex + 1) % spotlightProducts.length);
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, [spotlightProducts.length]);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative w-full bg-neutral-950 overflow-hidden pt-8 lg:pt-16 pb-20 lg:pb-28 border-b border-neutral-800">
      
      {/* ================= FULL BACKGROUND IMAGE SPOTLIGHT ================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Headphone / Product Image in right background */}
        <div className="absolute top-0 right-0 w-full lg:w-3/5 h-full opacity-60 lg:opacity-75 transition-all duration-700">
          <img
            key={currentProduct.id}
            src={currentProduct.image}
            alt={currentProduct.name}
            className="animate-hero-image w-full h-full object-cover object-center filter brightness-95 contrast-110"
          />
        </div>

        {/* Ambient Dark Gradients & Red Glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/85 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-neutral-950/60"></div>
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-red-600/15 rounded-full blur-[140px]"></div>
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-margin md:px-margin-md lg:px-margin-lg">
        
        {/* Top Micro-Badge */}
        <RevealOnScroll animation="fade-down" duration={600}>
          <div className="flex flex-wrap items-center gap-space-sm mb-space-md">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-neutral-900/90 border border-red-500/30 shadow-lg text-red-400 font-label-uppercase text-xs font-bold backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
              NEW ARRIVALS 2025
            </span>
            <span className="hidden sm:inline-block font-label-sm text-xs text-neutral-400 font-medium">
              Curated Quality Everyday Goods
            </span>
          </div>
        </RevealOnScroll>

        {/* Hero Content */}
        <div className="max-w-2xl flex flex-col gap-6">
          
          <RevealOnScroll animation="fade-up" duration={700} delay={100} className="space-y-4">
            <h1 className="font-display-hero text-4xl sm:text-5xl md:text-6xl lg:text-[64px] text-white font-black tracking-tight leading-[1.08] drop-shadow-xl">
              Everything You Need. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-400 to-amber-500">
                All in One Place.
              </span>
            </h1>
            
            <p className="font-body-lg text-base sm:text-lg text-neutral-300 max-w-xl leading-relaxed">
              Find premium products, everyday essentials, and exclusive deals. Designed for performance, priced fairly, and delivered express to your door.
            </p>
          </RevealOnScroll>

          {/* CTAs */}
          <RevealOnScroll animation="fade-up" duration={700} delay={200}>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => scrollToSection('featured-section')}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-red-600 text-white hover:bg-red-700 shadow-xl shadow-red-600/30 transition-all font-bold text-sm sm:text-base group active:scale-95 cursor-pointer"
              >
                <span>Shop All Products</span>
                <span className="material-symbols-outlined text-[20px] transition-transform group-hover:translate-x-1">
                  arrow_forward
                </span>
              </button>

              <button
                onClick={() => setQuickViewProduct(currentProduct)}
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-neutral-900/90 text-white hover:bg-neutral-800 shadow-md font-bold text-sm sm:text-base transition-all border border-neutral-700 hover:border-neutral-500 backdrop-blur-md active:scale-95 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px] text-red-500">visibility</span>
                <span>Quick View Specs</span>
              </button>
            </div>
          </RevealOnScroll>

          {/* Trust Stats Bar */}
          <RevealOnScroll animation="fade-up" duration={700} delay={300}>
            <div className="pt-2">
              <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-neutral-400 font-medium">
                <div className="flex items-center gap-1.5">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="material-symbols-outlined text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                        star
                      </span>
                    ))}
                  </div>
                  <span className="font-bold text-white">4.9/5 Rating</span>
                  <span className="text-neutral-400">(24k+ Reviews)</span>
                </div>
                <span className="text-neutral-700 hidden sm:inline">•</span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px] text-red-500">local_shipping</span>
                  Free Express Shipping
                </span>
                <span className="text-neutral-700 hidden sm:inline">•</span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px] text-red-500">verified</span>
                  30-Day Money Back
                </span>
              </div>
            </div>
          </RevealOnScroll>

        </div>

      </div>
    </section>
  );
};
