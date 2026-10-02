import React from 'react';
import { useShop } from '../context/ShopContext';
import { CATEGORIES } from '../data/products';
import { RevealOnScroll } from './RevealOnScroll';

export const CategorySection = () => {
  const { setSelectedCategory, setActivePage } = useShop();

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    setActivePage('shop');
    const el = document.getElementById('featured-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="categories-section" className="w-full py-space-3xl bg-neutral-950 border-b border-neutral-800">
      <div className="max-w-[1440px] mx-auto px-margin md:px-margin-md lg:px-margin-lg">
        {/* Section Title & Meta */}
        <RevealOnScroll animation="fade-up" duration={600}>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-space-md mb-space-2xl">
            <div className="flex flex-col gap-space-xs">
              <span className="font-label-uppercase text-label-uppercase text-red-500 uppercase tracking-widest font-bold">
                Collections
              </span>
              <h2 className="font-headline-xl text-headline-xl text-white font-bold tracking-tight">
                Shop by Category
              </h2>
              <p className="font-body-md text-body-md text-neutral-400">
                Find exactly what you need across our main categories.
              </p>
            </div>

            <button
              onClick={() => handleCategorySelect('all')}
              className="inline-flex items-center gap-space-xs font-label-md text-label-md text-neutral-400 hover:text-red-400 transition-colors font-semibold group whitespace-nowrap cursor-pointer"
            >
              <span>View All Categories</span>
              <span className="material-symbols-outlined text-[18px] transition-transform group-hover:translate-x-1">
                arrow_forward
              </span>
            </button>
          </div>
        </RevealOnScroll>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {CATEGORIES.map((category, index) => (
            <RevealOnScroll
              key={category.id}
              animation="fade-up"
              delay={index * 120}
              duration={700}
            >
              <div
                onClick={() => handleCategorySelect(category.id)}
                className="group relative flex flex-col justify-between h-[360px] rounded-xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 bg-neutral-900 cursor-pointer border border-neutral-800 hover:border-neutral-600"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

                {/* Top Card Badge & Action Arrow */}
                <div className="relative z-10 p-6 flex justify-between items-start">
                  <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-white font-label-uppercase text-label-uppercase font-semibold shadow-sm border border-neutral-700">
                    {category.itemCount}
                  </span>
                  <div className="w-9 h-9 rounded-full bg-black/70 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-red-600 transition-all duration-300 shadow-sm group-hover:scale-110 border border-neutral-700">
                    <span className="material-symbols-outlined text-[18px]">north_east</span>
                  </div>
                </div>

                {/* Bottom Details */}
                <div className="relative z-10 p-6 flex flex-col gap-1">
                  <h3 className="font-headline-lg text-headline-lg text-white font-bold tracking-tight group-hover:translate-x-1 transition-transform">
                    {category.name}
                  </h3>
                  <p className="font-body-sm text-body-sm text-white/70 line-clamp-2">
                    {category.tagline}
                  </p>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};
