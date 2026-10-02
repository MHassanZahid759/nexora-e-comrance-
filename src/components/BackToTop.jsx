import React, { useEffect, useState } from 'react';

/**
 * Floating BackToTop button that appears smoothly when scrolled down > 300px.
 */
export const BackToTop = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      if (window.scrollY > 300) {
        setShow(true);
      } else {
        setShow(false);
      }
    };

    window.addEventListener('scroll', checkScroll, { passive: true });
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!show) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-red-600/90 hover:bg-red-600 text-white shadow-2xl shadow-red-600/50 flex items-center justify-center backdrop-blur-md border border-red-400/30 transition-all duration-300 hover:scale-110 active:scale-95 animate-bounce-subtle cursor-pointer group"
    >
      <span className="material-symbols-outlined text-[22px] transition-transform group-hover:-translate-y-0.5">
        arrow_upward
      </span>
    </button>
  );
};
