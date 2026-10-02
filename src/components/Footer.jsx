import React from 'react';
import { useShop } from '../context/ShopContext';
import { CATEGORIES } from '../data/products';
import { RevealOnScroll } from './RevealOnScroll';

export const Footer = () => {
  const { setSelectedCategory, setActivePage } = useShop();

  const handleCategoryClick = (catId) => {
    setSelectedCategory(catId);
    setActivePage('shop');
    const el = document.getElementById('featured-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer id="footer-section" className="w-full bg-black pt-space-3xl pb-space-2xl border-t border-neutral-800">
      <div className="max-w-[1440px] mx-auto px-margin md:px-margin-md lg:px-margin-lg">
        
        {/* Main Footer Grid */}
        <RevealOnScroll animation="fade-up" duration={700}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-gutter-lg pb-space-2xl border-b border-neutral-800">
            
            {/* Brand Bio */}
            <div className="lg:col-span-2 flex flex-col gap-space-md">
              <div className="flex items-center gap-space-sm">
                <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-700 flex items-center justify-center text-white text-sm font-bold shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" className="w-6 h-6" fill="none">
                    <path d="M7 22L14 8L21 22M10 18H18" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="21" cy="8" r="2.5" fill="#e50914"/>
                  </svg>
                </div>
                <span className="font-headline-sm text-headline-sm font-bold tracking-tight text-white">
                  NEXORA
                </span>
              </div>

              <p className="font-label-md text-label-md text-white font-semibold">
                Shop Smart. Live Better.
              </p>
              <p className="font-body-sm text-body-sm text-neutral-400 max-w-sm leading-relaxed">
                Quality everyday products for your home, work, and lifestyle. Fast shipping, easy returns, and friendly customer support.
              </p>

              {/* Social Icons */}
              <div className="flex items-center gap-space-sm pt-space-xs">
                <button aria-label="Social Channel" className="p-2 rounded-full text-neutral-500 hover:bg-neutral-900 hover:text-white transition-all border border-transparent hover:border-neutral-700 cursor-pointer">
                  <span className="material-symbols-outlined text-[20px]">public</span>
                </button>
                <button aria-label="Media Feed" className="p-2 rounded-full text-neutral-500 hover:bg-neutral-900 hover:text-white transition-all border border-transparent hover:border-neutral-700 cursor-pointer">
                  <span className="material-symbols-outlined text-[20px]">photo_camera</span>
                </button>
                <button aria-label="Video Channel" className="p-2 rounded-full text-neutral-500 hover:bg-neutral-900 hover:text-white transition-all border border-transparent hover:border-neutral-700 cursor-pointer">
                  <span className="material-symbols-outlined text-[20px]">smart_display</span>
                </button>
                <button aria-label="Professional Network" className="p-2 rounded-full text-neutral-500 hover:bg-neutral-900 hover:text-white transition-all border border-transparent hover:border-neutral-700 cursor-pointer">
                  <span className="material-symbols-outlined text-[20px]">share</span>
                </button>
              </div>
            </div>

            {/* Col 1: Customer Service */}
            <div className="flex flex-col gap-space-sm">
              <span className="font-label-uppercase text-label-uppercase text-white uppercase font-bold tracking-wider">
                Customer Help
              </span>
              <div className="flex flex-col gap-space-xs">
                {['Track Order', 'Shipping Info', 'Returns & Refunds', 'Help & FAQs'].map((link) => (
                  <a key={link} className="font-body-sm text-body-sm text-neutral-400 hover:text-red-400 transition-colors" href="#help">
                    {link}
                  </a>
                ))}
              </div>
            </div>

            {/* Col 2: About */}
            <div className="flex flex-col gap-space-sm">
              <span className="font-label-uppercase text-label-uppercase text-white uppercase font-bold tracking-wider">
                About NEXORA
              </span>
              <div className="flex flex-col gap-space-xs">
                {['About Us', 'Careers', 'Contact Us', 'Eco Promise'].map((link) => (
                  <a key={link} className="font-body-sm text-body-sm text-neutral-400 hover:text-red-400 transition-colors" href="#about">
                    {link}
                  </a>
                ))}
              </div>
            </div>

            {/* Col 3: Categories */}
            <div className="flex flex-col gap-space-sm">
              <span className="font-label-uppercase text-label-uppercase text-white uppercase font-bold tracking-wider">
                Shop Categories
              </span>
              <div className="flex flex-col gap-space-xs">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryClick(cat.id)}
                    className="font-body-sm text-body-sm text-neutral-400 hover:text-red-400 transition-colors text-left cursor-pointer"
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Col 4: Legal */}
            <div className="flex flex-col gap-space-sm">
              <span className="font-label-uppercase text-label-uppercase text-white uppercase font-bold tracking-wider">
                Legal
              </span>
              <div className="flex flex-col gap-space-xs">
                {['Privacy Policy', 'Terms of Use', 'Cookie Settings', 'Store Status'].map((link) => (
                  <a key={link} className="font-body-sm text-body-sm text-neutral-400 hover:text-red-400 transition-colors" href="#legal">
                    {link}
                  </a>
                ))}
              </div>
            </div>

          </div>
        </RevealOnScroll>

        {/* Bottom Bar */}
        <RevealOnScroll animation="fade-up" duration={600} delay={150}>
          <div className="pt-space-xl flex flex-col md:flex-row items-center justify-between gap-space-md">
            <div className="flex items-center gap-space-sm flex-wrap justify-center">
              {['Visa', 'Mastercard', 'Amex', 'Apple Pay', 'PayPal'].map((pm) => (
                <span key={pm} className="px-2.5 py-1 rounded bg-neutral-900 text-neutral-300 font-label-uppercase text-[10px] font-bold border border-neutral-700">
                  {pm}
                </span>
              ))}
            </div>

            <p className="font-body-sm text-body-sm text-neutral-500 text-center">
              © 2025 NEXORA Inc. All rights reserved.
            </p>
          </div>
        </RevealOnScroll>

      </div>
    </footer>
  );
};
