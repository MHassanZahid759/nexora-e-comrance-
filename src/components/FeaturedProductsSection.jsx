import React from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { ProductCard } from './ProductCard';
import { RevealOnScroll } from './RevealOnScroll';

export const FeaturedProductsSection = () => {
  const {
    selectedTab,
    setSelectedTab,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy
  } = useShop();

  const filteredProducts = PRODUCTS.filter((product) => {
    if (selectedCategory !== 'all' && product.category !== selectedCategory) return false;
    if (selectedTab === 'new' && !product.isNew) return false;
    if (selectedTab === 'trending' && !product.isTrending) return false;
    if (selectedTab === 'offers' && !product.isSale) return false;
    return true;
  }).sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  return (
    <section id="featured-section" className="w-full py-space-3xl bg-neutral-950 border-b border-neutral-800">
      <div className="max-w-[1440px] mx-auto px-margin md:px-margin-md lg:px-margin-lg">
        {/* Section Header */}
        <RevealOnScroll animation="fade-up" duration={600}>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-lg mb-space-2xl">
            <div className="flex flex-col gap-space-xs">
              <span className="font-label-uppercase text-label-uppercase text-red-500 uppercase tracking-widest font-bold">
                Top Picks
              </span>
              <h2 className="font-headline-xl text-headline-xl text-white font-bold tracking-tight">
                Featured Products
              </h2>
              <p className="font-body-md text-body-md text-neutral-400">
                Quality items, simple designs, and practical daily products for you.
              </p>
            </div>

            {/* Controls */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Tab Filter Pills */}
              <div className="flex items-center gap-space-xs overflow-x-auto pb-1 sm:pb-0 bg-neutral-900 p-1 rounded-full border border-neutral-800">
                {[
                  { id: 'all', label: 'All Products' },
                  { id: 'new', label: 'New In' },
                  { id: 'trending', label: 'Popular' },
                  { id: 'offers', label: 'On Sale' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedTab(tab.id)}
                    className={`px-5 py-2 rounded-full font-label-md text-label-md whitespace-nowrap transition-all cursor-pointer ${
                      selectedTab === tab.id
                        ? 'bg-red-600 text-white shadow-sm'
                        : 'bg-transparent text-neutral-400 hover:text-white hover:bg-neutral-800'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="h-10 px-3.5 py-1 rounded-full bg-neutral-900 border border-neutral-700 text-xs font-medium text-neutral-300 focus:outline-none shadow-sm cursor-pointer focus:border-red-600"
              >
                <option value="recommended">Sort: Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>
        </RevealOnScroll>

        {/* Category Filter Chips */}
        <RevealOnScroll animation="fade-right" duration={600} delay={100}>
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-red-600 text-white font-bold border border-red-500'
                  : 'bg-neutral-900 text-neutral-400 hover:bg-neutral-800 hover:text-white border border-neutral-700'
              }`}
            >
              All Categories ({PRODUCTS.length})
            </button>
            {CATEGORIES.map((cat) => {
              const count = PRODUCTS.filter((p) => p.category === cat.id).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-red-600 text-white font-bold border border-red-500'
                      : 'bg-neutral-900 text-neutral-400 hover:bg-neutral-800 hover:text-white border border-neutral-700'
                  }`}
                >
                  {cat.name} ({count})
                </button>
              );
            })}
          </div>
        </RevealOnScroll>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-16 text-center bg-neutral-900 rounded-2xl p-8 border border-neutral-800 animate-fade-in">
            <span className="material-symbols-outlined text-[36px] text-neutral-500">inventory_2</span>
            <p className="font-headline-sm font-semibold text-white mt-2">No products found</p>
            <p className="text-xs text-neutral-400 mt-1">Try clicking on another category or tab</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedTab('all');
              }}
              className="mt-4 px-5 py-2 rounded-full bg-red-600 text-white text-xs font-bold hover:bg-red-700 transition-colors cursor-pointer"
            >
              Show All Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
            {filteredProducts.map((product, idx) => (
              <RevealOnScroll
                key={product.id}
                animation="fade-up"
                delay={Math.min((idx % 4) * 100, 300)}
                duration={600}
              >
                <ProductCard product={product} />
              </RevealOnScroll>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
