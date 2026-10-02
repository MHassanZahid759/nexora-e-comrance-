import React from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';
import { RevealOnScroll } from './RevealOnScroll';

export const BestSellersSection = () => {
  const { setSelectedTab } = useShop();

  const bestSellers = PRODUCTS.filter((p) => p.isBestSeller);

  const handleExploreAll = () => {
    setSelectedTab('trending');
    const el = document.getElementById('featured-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="w-full py-space-3xl bg-neutral-950 border-b border-neutral-800">
      <div className="max-w-[1440px] mx-auto px-margin md:px-margin-md lg:px-margin-lg">
        <RevealOnScroll animation="fade-up" duration={600}>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-space-md mb-space-2xl">
            <div className="flex flex-col gap-space-xs">
              <span className="font-label-uppercase text-label-uppercase text-red-500 uppercase tracking-widest font-bold">
                Most Popular
              </span>
              <h2 className="font-headline-xl text-headline-xl text-white font-bold tracking-tight">
                Best Sellers
              </h2>
              <p className="font-body-md text-body-md text-neutral-400">
                The products our customers buy and love the most.
              </p>
            </div>

            <button
              onClick={handleExploreAll}
              className="inline-flex items-center gap-space-xs font-label-md text-label-md text-white hover:text-red-500 transition-colors font-semibold group whitespace-nowrap cursor-pointer"
            >
              <span>See All Best Sellers</span>
              <span className="material-symbols-outlined text-[18px] transition-transform group-hover:translate-x-1">
                arrow_forward
              </span>
            </button>
          </div>
        </RevealOnScroll>

        {/* 4 Best Seller Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
          {bestSellers.map((product, idx) => (
            <RevealOnScroll
              key={product.id}
              animation="fade-up"
              delay={idx * 100}
              duration={600}
            >
              <ProductCard product={product} />
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};
