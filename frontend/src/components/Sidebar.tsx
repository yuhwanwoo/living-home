import React, { useState } from 'react';
import { Apartment } from '../pages/MapPage';

interface SidebarProps {
  apartments: Apartment[];
  selectedApartment: Apartment | null;
  onApartmentClick: (apartment: Apartment) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  apartments,
  selectedApartment,
  onApartmentClick,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      className={`absolute top-4 left-4 bottom-4 z-50 transition-all duration-300 ease-in-out flex flex-col ${isOpen ? 'w-80' : 'w-20'
        }`}
    >
      {/* Main Sidebar Container */}
      <div className="glass-panel rounded-2xl h-full flex flex-col overflow-hidden relative">
        {/* Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
        >
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 5l7 7-7 7M5 5l7 7-7 7"
              />
            </svg>
          )}
        </button>

        {/* Header / Logo */}
        <div className="p-6 flex items-center justify-between shrink-0">
          {isOpen ? (
            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              LivingHome
            </h1>
          ) : (
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 mx-auto" />
          )}
        </div>

        {/* Navigation Menu (Placeholder for now) */}
        <nav className="px-4 mb-6 shrink-0">
          <ul className="space-y-2">
            <li>
              <button className="w-full flex items-center p-3 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-cyan-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                {isOpen && <span className="ml-3 font-medium">홈</span>}
              </button>
            </li>
            {/* Add more nav items here if needed */}
          </ul>
        </nav>

        {/* Apartment List */}
        {isOpen && (
          <div className="flex-1 overflow-y-auto px-4 pb-4 custom-scrollbar">
            <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-3 px-2">
              아파트 목록
            </h3>
            <ul className="space-y-3">
              {apartments.map((apartment) => (
                <li
                  key={apartment.id}
                  onClick={() => onApartmentClick(apartment)}
                  className={`p-4 rounded-xl cursor-pointer transition-all duration-200 border ${selectedApartment?.id === apartment.id
                    ? 'bg-blue-500/20 border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                    : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10'
                    }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-bold text-gray-100 text-sm truncate pr-2">
                      {apartment.name}
                    </h4>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-gray-700 text-gray-300 shrink-0">
                      {apartment.category}
                    </span>
                  </div>
                  <div className="flex justify-between items-end">
                    <div className="text-xs text-gray-400 truncate max-w-[60%]">
                      {apartment.address}
                    </div>
                    <div className="flex gap-2 text-xs mt-1">
                      {Object.keys(apartment.price).map((key) => (
                        <span
                          key={key}
                          className={key === '59' ? 'text-sky-400' : 'text-teal-400'}
                        >
                          {key}형: {apartment.price[key as keyof typeof apartment.price]}
                        </span>
                      ))}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;