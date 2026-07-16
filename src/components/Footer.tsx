import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-card-border mt-10 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-2xl font-black font-serif text-accent">OshiHos · 推しホス</p>
            <p className="text-xs text-zinc-600 mt-1">Kabukicho Edition — Tokyo, Japan</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-zinc-700 leading-relaxed max-w-sm">
              OshiHos is an independent digital guide. We are not affiliated with any host club groups. All host information is for cultural and informational purposes only.
            </p>
          </div>
          <div className="flex flex-col items-end gap-1">
            <p className="text-[10px] text-zinc-700 uppercase tracking-widest">Compliant with</p>
            <p className="text-xs font-semibold text-emerald-500">2026 Host Club Regulations</p>
            <div className="flex items-center gap-3 mt-1">
              <a
                href="/terms"
                className="text-[10px] text-zinc-500 hover:text-accent transition-colors"
              >
                Terms of Service
              </a>
              <span className="text-[10px] text-zinc-700">·</span>
              <p className="text-[10px] text-zinc-700">© {new Date().getFullYear()} OshiHos</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
