import React from 'react';

interface PriceMarkerProps {
  name: string;
  price: {
    '59'?: string;
    '84'?: string;
  };
}

const PriceMarker: React.FC<PriceMarkerProps> = ({ name, price }) => {
  return (
    <div className="relative transform -translate-x-1/2 -translate-y-full" style={{ top: '-10px' }}>
      <div className="bg-blue-600 text-white font-bold rounded-lg px-3 py-2 shadow-lg text-center">
        <div className="text-sm whitespace-nowrap">{name}</div>
        <hr className="border-t border-white/50 my-1" />
        <div className="text-xs flex flex-col items-center">
          {price['59'] && (
            <div className="whitespace-nowrap">59형: {price['59']}</div>
          )}
          {price['84'] && (
            <div className="whitespace-nowrap">84형: {price['84']}</div>
          )}
        </div>
      </div>
      <div
        className="absolute left-1/2 -translate-x-1/2"
        style={{
          width: 0,
          height: 0,
          borderLeft: '8px solid transparent',
          borderRight: '8px solid transparent',
          borderTop: '8px solid #2563EB', // Corresponds to bg-blue-600
        }}
      />
    </div>
  );
};

export default PriceMarker;
