import React from 'react';

/**
 * Props for the Header component.
 */
interface HeaderProps {
  // No props for now
}

/**
 * The main header and navigation bar for the application.
 * It displays the main menu items.
 */
const Header: React.FC<HeaderProps> = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 pointer-events-none">
      <div className="max-w-7xl mx-auto flex justify-between items-center pointer-events-auto">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-sky-400 to-blue-600 rounded-xl shadow-lg shadow-blue-500/30 flex items-center justify-center">
            <span className="text-white font-bold text-xl">L</span>
          </div>
          <span className="text-2xl font-bold text-white tracking-tight">
            Living<span className="text-sky-400">Home</span>
          </span>
        </div>

        {/* Navigation */}
        <nav className="glass-panel px-2 py-1.5 rounded-full flex items-center gap-1">
          <a
            href="/map"
            className="px-4 py-2 rounded-full text-sm font-medium text-white bg-white/10 transition-colors"
          >
            지도
          </a>
          <a
            href="/"
            className="px-4 py-2 rounded-full text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            실거래가
          </a>
          <a
            href="/"
            className="px-4 py-2 rounded-full text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            청약
          </a>
          <a
            href="/"
            className="px-4 py-2 rounded-full text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            뉴스
          </a>
        </nav>

        {/* User Actions */}
        <div className="flex items-center gap-3">
          <button className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/10 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
              />
            </svg>
          </button>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-700 to-slate-600 border border-white/10 shadow-lg flex items-center justify-center text-white font-bold text-sm cursor-pointer hover:ring-2 hover:ring-sky-500/50 transition-all">
            HW
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
