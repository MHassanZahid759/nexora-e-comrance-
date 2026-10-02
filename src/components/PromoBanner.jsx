import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { RevealOnScroll } from './RevealOnScroll';

export const PromoBanner = () => {
  const { applyCoupon, setSelectedTab } = useShop();
  const [copied, setCopied] = useState(false);

  // Live countdown timer
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 14,
    minutes: 32,
    seconds: 45
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCopyCode = () => {
    navigator.clipboard?.writeText('NEXORA20');
    applyCoupon('NEXORA20');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShopDeals = () => {
    setSelectedTab('offers');
    const el = document.getElementById('featured-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="deals-section" className="w-full py-space-xl bg-neutral-950 border-b border-neutral-800 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-margin md:px-margin-md lg:px-margin-lg">
        <RevealOnScroll animation="zoom-in" duration={800}>
          <div className="relative w-full rounded-2xl overflow-hidden bg-gradient-to-r from-neutral-900 via-neutral-900 to-red-950/40 text-white p-space-xl md:p-space-2xl shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-space-2xl border border-neutral-800">
            
            {/* Subtle Ambient Glow */}
            <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-red-600/10 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute top-0 left-1/4 w-72 h-72 bg-red-900/10 rounded-full blur-[100px] pointer-events-none"></div>

            {/* Left Copy */}
            <div className="flex flex-col gap-space-md z-10 max-w-2xl">
              <div className="inline-flex items-center gap-space-xs px-3 py-1 rounded-full bg-red-600/20 text-red-400 font-label-uppercase text-label-uppercase self-start border border-red-500/30">
                <span className="material-symbols-outlined text-[14px]">local_fire_department</span>
                LIMITED TIME SALE
              </div>

              <div className="flex flex-col gap-space-xs">
                <h2 className="font-headline-xl text-headline-xl lg:text-[44px] font-bold tracking-tight text-white leading-tight">
                  Save 20% on Everyday Essentials.
                </h2>
                <p className="font-body-lg text-body-lg text-neutral-300">
                  Good products at fair prices. Use the discount coupon below to save on your entire order today.
                </p>
              </div>

              {/* Promo Code Box with Instant Copy Action */}
              <div
                onClick={handleCopyCode}
                className="inline-flex items-center gap-space-sm p-2 pr-4 rounded-xl bg-neutral-800/80 backdrop-blur-md self-start border border-neutral-700 cursor-pointer hover:bg-neutral-800 hover:border-red-600/50 transition-all group"
                title="Click to apply and copy code"
              >
                <span className="px-3 py-1 rounded-lg bg-neutral-950 text-red-500 font-mono font-bold text-label-md flex items-center gap-1.5 shadow-sm border border-neutral-800">
                  <span>NEXORA20</span>
                  <span className="material-symbols-outlined text-[14px] text-neutral-400 group-hover:text-red-400">
                    {copied ? 'check' : 'content_copy'}
                  </span>
                </span>
                <span className="font-body-sm text-body-sm text-neutral-200">
                  {copied ? 'Coupon applied! 20% off at checkout' : 'Click here to apply 20% discount'}
                </span>
              </div>

              {/* CTA and Live Countdown */}
              <div className="flex flex-wrap items-center gap-space-lg pt-space-xs">
                <button
                  onClick={handleShopDeals}
                  className="inline-flex items-center gap-space-xs px-8 py-3.5 rounded-full bg-red-600 text-white hover:bg-red-700 font-label-md text-label-md font-bold shadow-lg shadow-red-600/30 transition-transform hover:-translate-y-0.5 active:scale-95 cursor-pointer"
                >
                  <span>View Sale Items</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>

                <div className="flex items-center gap-2 font-mono text-neutral-300 font-label-md text-label-md">
                  <span className="material-symbols-outlined text-[18px] text-red-500">schedule</span>
                  <span>
                    Sale ends in <strong className="text-white bg-neutral-950 px-2.5 py-1 rounded-lg border border-neutral-800">{timeLeft.days}d : {timeLeft.hours}h : {timeLeft.minutes}m : {timeLeft.seconds}s</strong>
                  </span>
                </div>
              </div>
            </div>

            {/* Right Visual Feature */}
            <div className="relative w-full lg:w-96 h-72 rounded-xl overflow-hidden shadow-2xl z-10 hidden md:block border border-neutral-800">
              <img
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZZMNHn8EUmz1GlpCTFgX6GDShfEQquMp7h8G8603hUisghCXRAIhCVFZ9soctuDy011qmgPmKnDIJZ-LuNQzfmmnqYDUCyNFsvc8iJDNTRKFFmI8EVjAOaMs7qK7Ame8dbPrDjpX1bjB4sw_nyJJmpsstUV50y-RzSAHAsSoCFTPzmEmfzFHSIXnwpuzRDl4zf4qFtP-GGAVw0F4HpuuDChBiA94Pggzefpgo2o9JsD68Q8bvCmQs"
                alt="Seasonal Sale"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-lg bg-neutral-900/90 backdrop-blur-md flex items-center justify-between text-white border border-neutral-800">
                <span className="font-label-sm text-label-sm font-medium">Seasonal Sale Items</span>
                <span className="font-label-uppercase text-label-uppercase text-red-500 font-bold">
                  Up to 35% Off
                </span>
              </div>
            </div>

          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};
