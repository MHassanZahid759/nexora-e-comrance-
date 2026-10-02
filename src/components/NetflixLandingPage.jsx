import React, { useState, useEffect, useRef } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS, CURRENCIES } from '../data/products';
import { RevealOnScroll } from './RevealOnScroll';

export const NetflixLandingPage = () => {
  const {
    enterStoreWithEmail,
    setIsAuthModalOpen,
    setAuthMode,
    setAuthPromptMessage,
    currency,
    setCurrency,
    formatPrice
  } = useShop();

  const [emailTop, setEmailTop] = useState('');
  const [emailBottom, setEmailBottom] = useState('');
  const [openFaq, setOpenFaq] = useState(null);
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const canvasRef = useRef(null);

  // Animated background particles for high-end dark ambient effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const particles = Array.from({ length: 40 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2 + 0.5,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: -Math.random() * 0.4 - 0.1,
      alpha: Math.random() * 0.5 + 0.1,
      color: Math.random() > 0.4 ? '#e50914' : '#ffffff'
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.y < 0) {
          p.y = canvas.height;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < 0 || p.x > canvas.width) {
          p.x = Math.random() * canvas.width;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleStartTop = (e) => {
    e.preventDefault();
    enterStoreWithEmail(emailTop);
  };

  const handleStartBottom = (e) => {
    e.preventDefault();
    enterStoreWithEmail(emailBottom);
  };

  const handleSignIn = () => {
    setAuthMode('login');
    setAuthPromptMessage('Sign in to your NEXORA account to continue shopping.');
    setIsAuthModalOpen(true);
  };

  const faqs = [
    {
      q: 'What is NEXORA?',
      a: 'NEXORA is a modern online department store curated for quality everyday goods — from studio headphones and winter apparel to artisanal coffee makers, running shoes, and luxury leather bags.'
    },
    {
      q: 'How does shipping and delivery work?',
      a: 'We offer Free Express Tracked Delivery on all orders over $150. Orders ship within 24 hours and typically arrive within 2 to 3 business days.'
    },
    {
      q: 'What is the return policy?',
      a: 'You can return any item within 30 days of delivery for a full refund or exchange with prepaid return shipping labels.'
    },
    {
      q: 'Are my payment details safe?',
      a: 'Yes, 100%. We utilize 256-bit SSL bank-grade encryption and support all major credit cards, Apple Pay, and PayPal with buyer protection.'
    },
    {
      q: 'How do I contact customer support?',
      a: 'Our friendly customer support team is available 24/7 via live chat, email, or telephone to answer any questions or assist with your orders.'
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-white selection:bg-red-600 selection:text-white font-sans overflow-x-hidden">
      
      {/* ================= HERO BACKGROUND & HEADER ================= */}
      <div className="relative min-h-[720px] lg:min-h-[820px] w-full flex flex-col justify-between border-b-8 border-neutral-800">
        
        {/* 1. Animated Ambient Particles Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-70"
        />

        {/* 2. High Quality Dark Cinematic Video Loop */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-65 brightness-75 contrast-125 saturate-90 transition-all duration-1000"
          >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-fashion-model-in-a-dark-room-41565-large.mp4" type="video/mp4" />
            <source src="/netflix-bg.mp4" type="video/mp4" />
          </video>
          
          {/* Subtle Ambient Red Glows & Gradient Shades */}
          <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-red-900/20 rounded-full blur-[140px] pointer-events-none"></div>
          <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-red-600/15 rounded-full blur-[150px] pointer-events-none"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/50 to-black/70"></div>
        </div>

        {/* Top Navbar */}
        <header className="relative z-20 max-w-[1440px] w-full mx-auto px-6 md:px-12 py-6 flex items-center justify-between">
          
          {/* Bold Brand Logo */}
          <div className="flex items-center gap-2">
            <span className="font-headline-xl text-3xl md:text-4xl font-black tracking-tighter text-red-600 uppercase drop-shadow-md">
              NEXORA
            </span>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3 md:gap-4">
            
            {/* Currency Selector */}
            <div className="relative">
              <button
                onClick={() => setIsCurrencyOpen(!isCurrencyOpen)}
                className="flex items-center gap-1 text-xs bg-black/70 hover:bg-black/90 text-neutral-200 border border-neutral-700/80 rounded-md px-3 py-1.5 backdrop-blur-md transition-colors font-medium cursor-pointer"
              >
                <span className="material-symbols-outlined text-[15px]">language</span>
                <span>{currency}</span>
                <span className="material-symbols-outlined text-[14px]">expand_more</span>
              </button>

              {isCurrencyOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsCurrencyOpen(false)} />
                  <div className="absolute right-0 top-full mt-1.5 w-44 bg-neutral-900 border border-neutral-700 rounded-xl shadow-2xl py-1 z-50 text-xs">
                    {Object.entries(CURRENCIES).map(([code, item]) => (
                      <button
                        key={code}
                        onClick={() => {
                          setCurrency(code);
                          setIsCurrencyOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 hover:bg-neutral-800 transition-colors flex items-center justify-between ${
                          currency === code ? 'text-red-500 font-bold bg-neutral-800/50' : 'text-neutral-300'
                        }`}
                      >
                        <span>{item.label}</span>
                        {currency === code && <span className="material-symbols-outlined text-[14px]">check</span>}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Red Sign In Button */}
            <button
              onClick={handleSignIn}
              className="px-4 md:px-5 py-1.5 rounded-md bg-red-600 hover:bg-red-700 text-white font-bold text-xs md:text-sm shadow-md transition-all active:scale-95 duration-200 cursor-pointer hover:shadow-red-600/40"
            >
              Sign In
            </button>
          </div>
        </header>

        {/* Center Main Hero Content */}
        <RevealOnScroll animation="fade-up" duration={900} className="relative z-20 max-w-4xl mx-auto px-6 py-12 text-center flex flex-col items-center justify-center gap-4 md:gap-5 my-auto">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-950/80 border border-red-800/60 text-red-400 font-mono text-xs font-bold shadow-lg backdrop-blur-md mb-1 animate-pulse">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
            NEW COLLECTION LIVE • 20% OFF FOR NEW MEMBERS
          </div>

          <h1 className="font-headline-xl text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.1] drop-shadow-[0_4px_20px_rgba(0,0,0,0.95)] max-w-3xl">
            Quality Products. Better Prices. Everything in One Place.
          </h1>

          <p className="text-base sm:text-xl md:text-2xl text-neutral-200 font-semibold max-w-2xl drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
            Starts from only $46. Easy 30-day returns.
          </p>

          <p className="text-xs sm:text-base text-neutral-300 font-medium max-w-xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            Ready to start shopping? Enter your email to create an account or sign in.
          </p>

          {/* Email Input & Red "Get Started >" Button */}
          <form
            onSubmit={handleStartTop}
            className="flex flex-col sm:flex-row items-center justify-center gap-2.5 w-full max-w-2xl mt-2 drop-shadow-2xl"
          >
            <div className="relative w-full flex-1">
              <input
                type="email"
                required
                placeholder="Email address"
                value={emailTop}
                onChange={(e) => setEmailTop(e.target.value)}
                className="w-full h-14 px-5 rounded-md bg-neutral-950/90 border border-neutral-700 text-white placeholder:text-neutral-400 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/30 text-sm backdrop-blur-md transition-all shadow-2xl"
              />
            </div>
            
            <button
              type="submit"
              className="w-full sm:w-auto h-14 px-8 rounded-md bg-red-600 hover:bg-red-700 text-white font-bold text-base sm:text-lg flex items-center justify-center gap-2 shadow-2xl hover:shadow-red-600/50 transition-all active:scale-95 whitespace-nowrap cursor-pointer"
            >
              <span>Get Started</span>
              <span className="material-symbols-outlined text-[22px]">chevron_right</span>
            </button>
          </form>

        </RevealOnScroll>

        {/* Empty bottom spacer */}
        <div className="h-6"></div>
      </div>


      {/* ================= SECTION 2: TOP TRENDING ITEMS (NETFLIX ROW STYLE) ================= */}
      <section className="py-14 max-w-[1440px] mx-auto px-6 md:px-12 border-b-8 border-neutral-800">
        <RevealOnScroll animation="fade-left" duration={600}>
          <h2 className="text-xl md:text-2xl font-bold text-white mb-6">
            Trending Products Today
          </h2>
        </RevealOnScroll>

        {/* Netflix Horizontal Row with 1, 2, 3... rank numbers */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {PRODUCTS.slice(0, 6).map((product, idx) => (
            <RevealOnScroll
              key={product.id}
              animation="zoom-in"
              delay={idx * 80}
              duration={600}
            >
              <div
                onClick={() => enterStoreWithEmail()}
                className="group relative cursor-pointer select-none transition-transform duration-300 hover:scale-105"
              >
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-neutral-900 border border-neutral-800 group-hover:border-neutral-500 shadow-xl">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  
                  {/* Gradient shade */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent"></div>

                  {/* Big Netflix Style Number Rank */}
                  <span className="absolute -bottom-3 -left-2 text-6xl sm:text-7xl font-black text-black font-mono select-none drop-shadow-[0_2px_4px_rgba(255,255,255,0.4)] [-webkit-text-stroke:2px_#ffffff]">
                    {idx + 1}
                  </span>

                  <div className="absolute bottom-2 left-10 right-2">
                    <p className="text-[11px] font-bold text-white truncate group-hover:text-red-400 transition-colors">
                      {product.name}
                    </p>
                    <p className="text-[10px] font-mono text-neutral-300">
                      {formatPrice(product.price)}
                    </p>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>


      {/* ================= SECTION 3: MORE REASONS TO JOIN (NETFLIX CARD GRID) ================= */}
      <section className="py-16 max-w-[1440px] mx-auto px-6 md:px-12 border-b-8 border-neutral-800">
        <RevealOnScroll animation="fade-left" duration={600}>
          <h2 className="text-xl md:text-2xl font-bold text-white mb-8">
            More Reasons to Join NEXORA
          </h2>
        </RevealOnScroll>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {[
            {
              title: 'Free Fast Delivery',
              desc: 'Enjoy free carbon-neutral express shipping on all orders over $150 straight to your door.',
              icon: 'local_shipping'
            },
            {
              title: 'Easy 30-Day Returns',
              desc: 'If you are not 100% satisfied, send it back within 30 days for a quick and easy refund.',
              icon: 'restart_alt'
            },
            {
              title: 'Safe & Encrypted Checkout',
              desc: 'Bank-level 256-bit SSL encryption with Apple Pay, PayPal, and all major cards accepted.',
              icon: 'verified_user'
            },
            {
              title: '24/7 Dedicated Support',
              desc: 'Real customer service team ready via live chat, phone, or email to help you anytime.',
              icon: 'support_agent'
            }
          ].map((item, index) => (
            <RevealOnScroll
              key={index}
              animation="fade-up"
              delay={index * 120}
              duration={700}
            >
              <div className="relative p-6 rounded-2xl bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800 hover:border-neutral-700 transition-all flex flex-col justify-between min-h-[220px] hover:shadow-xl hover:shadow-black/50 group">
                <div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-red-400 transition-colors">{item.title}</h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <div className="self-end text-neutral-500 group-hover:text-red-500 transition-colors group-hover:scale-110 duration-300">
                  <span className="material-symbols-outlined text-[36px] text-red-500">{item.icon}</span>
                </div>
              </div>
            </RevealOnScroll>
          ))}

        </div>
      </section>


      {/* ================= SECTION 4: FREQUENTLY ASKED QUESTIONS (NETFLIX ACCORDION) ================= */}
      <section className="py-16 max-w-4xl mx-auto px-6 border-b-8 border-neutral-800">
        <RevealOnScroll animation="fade-up" duration={600}>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-center text-white mb-8">
            Frequently Asked Questions
          </h2>
        </RevealOnScroll>

        <div className="space-y-2.5">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <RevealOnScroll
                key={index}
                animation="fade-up"
                delay={index * 70}
                duration={500}
              >
                <div className="overflow-hidden rounded-md bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-colors">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between text-base sm:text-xl font-bold hover:bg-neutral-800/80 transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <span className={`material-symbols-outlined text-[28px] transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}>
                      add
                    </span>
                  </button>
                  {isOpen && (
                    <div className="p-5 sm:p-6 pt-0 text-sm sm:text-base text-neutral-300 border-t border-neutral-800 leading-relaxed animate-fade-in">
                      {faq.a}
                    </div>
                  )}
                </div>
              </RevealOnScroll>
            );
          })}
        </div>

        {/* Second Email Callout */}
        <RevealOnScroll animation="fade-up" delay={200} duration={700} className="pt-12 text-center flex flex-col items-center gap-4">
          <p className="text-xs sm:text-base text-neutral-300 font-medium">
            Ready to shop? Enter your email to create or restart your membership.
          </p>

          <form
            onSubmit={handleStartBottom}
            className="flex flex-col sm:flex-row items-center justify-center gap-2.5 w-full max-w-2xl"
          >
            <input
              type="email"
              required
              placeholder="Email address"
              value={emailBottom}
              onChange={(e) => setEmailBottom(e.target.value)}
              className="w-full flex-1 h-14 px-5 rounded-md bg-neutral-950/90 border border-neutral-700 text-white placeholder:text-neutral-400 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/30 text-sm backdrop-blur-md transition-all"
            />
            <button
              type="submit"
              className="w-full sm:w-auto h-14 px-8 rounded-md bg-red-600 hover:bg-red-700 text-white font-bold text-base sm:text-lg flex items-center justify-center gap-2 shadow-xl hover:shadow-red-600/30 transition-all active:scale-95 whitespace-nowrap cursor-pointer"
            >
              <span>Get Started</span>
              <span className="material-symbols-outlined text-[22px]">chevron_right</span>
            </button>
          </form>
        </RevealOnScroll>
      </section>


      {/* ================= SECTION 5: NETFLIX STYLE FOOTER ================= */}
      <footer className="py-12 max-w-4xl mx-auto px-6 text-xs text-neutral-400 space-y-6">
        <p>Questions? Call <a href="tel:1-800-000-0000" className="hover:underline font-semibold text-neutral-300">1-800-NEXORA-SHOP</a></p>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="flex flex-col gap-3">
            <button onClick={() => enterStoreWithEmail()} className="text-left hover:underline">Create Account</button>
            <a href="#faq" className="hover:underline">FAQ</a>
            <a href="#help" className="hover:underline">Help Center</a>
            <a href="#terms" className="hover:underline">Terms of Use</a>
          </div>
          <div className="flex flex-col gap-3">
            <button onClick={handleSignIn} className="text-left hover:underline">Account Login</button>
            <a href="#returns" className="hover:underline">30-Day Returns</a>
            <a href="#shipping" className="hover:underline">Shipping Information</a>
            <a href="#privacy" className="hover:underline">Privacy Policy</a>
          </div>
          <div className="flex flex-col gap-3">
            <a href="#deals" className="hover:underline">Special Deals</a>
            <a href="#contact" className="hover:underline">Contact Support</a>
            <a href="#cookies" className="hover:underline">Cookie Preferences</a>
            <a href="#status" className="hover:underline">Store Status</a>
          </div>
          <div className="flex flex-col gap-3">
            <a href="#about" className="hover:underline">About NEXORA</a>
            <a href="#careers" className="hover:underline">Careers</a>
            <a href="#press" className="hover:underline">Press & Media</a>
            <a href="#sustainability" className="hover:underline">Eco Commitment</a>
          </div>
        </div>

        <div className="pt-4 flex items-center justify-between">
          <p>© 2025 NEXORA E-Commerce Inc. All rights reserved.</p>
          <span className="text-[11px] text-neutral-500">English (US)</span>
        </div>
      </footer>

    </div>
  );
};
