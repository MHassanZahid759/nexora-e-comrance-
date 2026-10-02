import React from 'react';
import { useShop } from '../context/ShopContext';

export const ToastContainer = () => {
  const { toasts, removeToast } = useShop();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-center justify-between gap-3 p-4 rounded-xl shadow-2xl backdrop-blur-xl border animate-fade-in ${
            toast.type === 'error'
              ? 'bg-red-950/90 text-red-100 border-red-800/50'
              : toast.type === 'info'
              ? 'bg-neutral-900/90 text-neutral-100 border-neutral-700/50'
              : 'bg-neutral-900/95 text-white border-neutral-700/60'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <span
              className={`material-symbols-outlined text-[20px] ${
                toast.type === 'error'
                  ? 'text-red-400'
                  : toast.type === 'info'
                  ? 'text-amber-400'
                  : 'text-emerald-400'
              }`}
            >
              {toast.type === 'error' ? 'error' : toast.type === 'info' ? 'info' : 'check_circle'}
            </span>
            <span className="font-body-sm text-sm font-medium leading-snug">
              {toast.message}
            </span>
          </div>

          <button
            onClick={() => removeToast(toast.id)}
            className="p-1 text-white/60 hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      ))}
    </div>
  );
};
