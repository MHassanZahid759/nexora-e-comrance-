import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { RevealOnScroll } from './RevealOnScroll';

export const NewsletterSection = () => {
  const { showToast } = useShop();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitted(true);
    showToast(`Thanks for signing up! Your 20% discount coupon is NEXORA20`);
    setEmail('');
  };

  return (
    <section className="w-full py-space-3xl bg-neutral-950 border-b border-neutral-800">
      <div className="max-w-[1440px] mx-auto px-margin md:px-margin-md lg:px-margin-lg">
        <RevealOnScroll animation="zoom-in" duration={800}>
          <div className="relative w-full rounded-2xl bg-gradient-to-br from-neutral-900 to-black p-space-xl sm:p-space-2xl md:p-space-3xl overflow-hidden flex flex-col items-center text-center border border-neutral-800 shadow-2xl">
            
            {/* Background red glow */}
            <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-red-950/30 rounded-full blur-[80px] pointer-events-none"></div>

            <div className="relative z-10 max-w-xl flex flex-col gap-space-md">
              <span className="font-label-uppercase text-label-uppercase text-red-500 uppercase tracking-widest font-bold">
                Special Offer
              </span>
              <h2 className="font-headline-xl text-headline-xl text-white font-bold tracking-tight">
                Get 20% Off Your First Order
              </h2>
              <p className="font-body-md text-body-md text-neutral-400">
                Enter your email to receive discount codes, new product alerts, and seasonal sales directly.
              </p>

              {/* Input Group */}
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-space-xs mt-space-sm w-full">
                <div className="relative w-full flex-1">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 text-[20px] pointer-events-none">
                    mail
                  </span>
                  <input
                    className="w-full h-12 pl-12 pr-4 rounded-lg bg-neutral-900 text-white font-body-md text-body-md placeholder:text-neutral-500 focus:outline-none shadow-sm transition-all border border-neutral-700 focus:border-red-600"
                    placeholder="Enter your email address"
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <button
                  className="w-full sm:w-auto h-12 px-8 rounded-lg bg-red-600 text-white hover:bg-red-700 font-label-md text-label-md font-semibold shadow-md shadow-red-600/20 transition-all whitespace-nowrap active:scale-95 cursor-pointer"
                  type="submit"
                >
                  {isSubmitted ? 'Subscribed!' : 'Sign Up Free'}
                </button>
              </form>

              <p className="font-body-sm text-body-sm text-neutral-500 mt-1">
                We never spam. You can unsubscribe anytime with one click.
              </p>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};
