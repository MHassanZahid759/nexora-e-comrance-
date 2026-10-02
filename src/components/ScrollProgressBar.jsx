import React, { useEffect, useState } from 'react';

/**
 * ScrollProgressBar renders a sleek glowing progress bar at the very top of the page.
 */
export const ScrollProgressBar = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight <= 0) {
        setScrollProgress(0);
        return;
      }
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] z-50 pointer-events-none bg-neutral-900/30">
      <div
        className="h-full bg-gradient-to-r from-red-600 via-red-500 to-amber-500 transition-all duration-150 ease-out shadow-[0_0_10px_rgba(229,9,20,0.8)]"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
};
