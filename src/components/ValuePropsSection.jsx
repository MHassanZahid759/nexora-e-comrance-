import React from 'react';
import { RevealOnScroll } from './RevealOnScroll';

export const ValuePropsSection = () => {
  const values = [
    {
      title: 'Free Fast Shipping',
      desc: 'Free delivery on all orders over $150 with live tracking straight to your door.',
      icon: (
        <svg className="w-6 h-6 text-currentColor" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
          <path d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.25V3.75c0-.621-.504-1.125-1.125-1.125h-9.75A1.125 1.125 0 002.25 3.75v10.5c0 .621.504 1.125 1.125 1.125h1.5" strokeLinecap="round" strokeLinejoin="round"></path>
        </svg>
      )
    },
    {
      title: 'Safe Payments',
      desc: '100% secure payment with encrypted checkout for cards, Apple Pay, and PayPal.',
      icon: (
        <svg className="w-6 h-6 text-currentColor" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
          <path d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" strokeLinecap="round" strokeLinejoin="round"></path>
        </svg>
      )
    },
    {
      title: '30-Day Easy Returns',
      desc: "Don't like what you got? Return it within 30 days for an easy, full refund.",
      icon: (
        <svg className="w-6 h-6 text-currentColor" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
          <path d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" strokeLinecap="round" strokeLinejoin="round"></path>
        </svg>
      )
    },
    {
      title: '24/7 Friendly Support',
      desc: 'Our team is always ready to answer your questions by live chat, email, or phone.',
      icon: (
        <svg className="w-6 h-6 text-currentColor" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
          <path d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3.6-3.091H7.5a4.5 4.5 0 01-4.5-4.5v-4.286c0-.97.616-1.813 1.5-2.097" strokeLinecap="round" strokeLinejoin="round"></path>
        </svg>
      )
    }
  ];

  return (
    <section id="values-section" className="w-full py-space-2xl bg-black border-b border-neutral-800">
      <div className="max-w-[1440px] mx-auto px-margin md:px-margin-md lg:px-margin-lg">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
          {values.map((val, idx) => (
            <RevealOnScroll
              key={idx}
              animation="fade-up"
              delay={idx * 100}
              duration={600}
            >
              <div className="flex flex-col gap-space-sm p-6 rounded-xl bg-neutral-900 shadow-sm hover:shadow-lg hover:shadow-black/50 transition-all border border-neutral-800 hover:border-neutral-600 h-full group">
                <div className="w-12 h-12 rounded-xl bg-red-950/60 text-red-400 flex items-center justify-center group-hover:scale-110 group-hover:bg-red-900/60 transition-all duration-300">
                  {val.icon}
                </div>
                <h4 className="font-headline-sm text-headline-sm font-semibold text-white group-hover:text-red-400 transition-colors">
                  {val.title}
                </h4>
                <p className="font-body-sm text-body-sm text-neutral-400 leading-relaxed">
                  {val.desc}
                </p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};
