import React from 'react';

interface PriceMarkerProps {
  name: string;
  price: {
    '59'?: string;
    '84'?: string;
  };
  onClick?: () => void;
}

const PriceMarker: React.FC<PriceMarkerProps> = ({ name, price, onClick }) => {
  const priceKeys = Object.keys(price);

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
      className="glass-panel px-3 py-2 rounded-xl flex flex-col items-center transform transition-transform hover:scale-110 cursor-pointer relative"
    >
      <div className="text-xs font-bold text-white mb-1 whitespace-nowrap">{name}</div>
      <div className="flex gap-2 text-xs">
        {priceKeys.map((key) => (
          <span key={key} className={`font-bold ${key === '59' ? 'text-sky-400' : 'text-teal-400'}`}>
            {key}형: {price[key as keyof typeof price]}
          </span>
        ))}
      </div>
      {/* Triangle pointer */}
      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-slate-900/70"></div>
    </div>
  );
};

export default PriceMarker;
