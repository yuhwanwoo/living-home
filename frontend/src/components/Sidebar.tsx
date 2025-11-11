import React, { useEffect, useState } from 'react';
import { Apartment } from '../pages/MapPage';

interface SidebarProps {
  apartments: Apartment[];
  onApartmentClick: (apartment: Apartment) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  apartments,
  onApartmentClick,
}) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  useEffect(() => {
    const firstApartment = apartments[0];
    if (firstApartment) {
      handleApartmentClick(firstApartment);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apartments, onApartmentClick]);

  const handleApartmentClick = (apartment: Apartment) => {
    onApartmentClick(apartment);
    setSelectedId(apartment.id);
  };

  return (
    <div className="w-96 h-full bg-white p-4 shadow-lg">
      <h2 className="text-xl font-bold mb-4">아파트 목록</h2>
      <ul>
        {apartments.map((apartment) => (
          <li
            key={apartment.id}
            className={`p-4 mb-2 rounded-lg cursor-pointer transition-colors ${
              selectedId === apartment.id
                ? 'bg-blue-200'
                : 'hover:bg-gray-100'
            }`}
            onClick={() => handleApartmentClick(apartment)}
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
