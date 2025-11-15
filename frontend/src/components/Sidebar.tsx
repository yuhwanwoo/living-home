import React from 'react';
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
  return (
    <div className="w-96 h-full bg-white p-4 shadow-lg flex flex-col">
      <h2 className="text-xl font-bold mb-4">아파트 목록</h2>
      <ul className="overflow-y-auto">
        {apartments.map((apartment) => (
          <li
            key={apartment.id}
            className={`p-4 mb-2 rounded-lg cursor-pointer transition-colors ${
              selectedApartment?.id === apartment.id
                ? 'bg-blue-200'
                : 'hover:bg-gray-100'
            }`}
            onClick={() => onApartmentClick(apartment)}
          >
            <h3 className="font-bold text-lg">{apartment.name}</h3>
            <div className="text-gray-600">
              {apartment.price['59'] && (
                <span className="mr-2">59형: {apartment.price['59']}</span>
              )}
              {apartment.price['84'] && (
                <span>84형: {apartment.price['84']}</span>
              )}
            </div>
            <p className="text-sm text-gray-500">{apartment.address}</p>
            <p className="text-sm text-gray-500 font-semibold">
              {apartment.category}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;