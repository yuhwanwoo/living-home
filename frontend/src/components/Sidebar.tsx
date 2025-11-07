import React, { useState } from 'react';
import { Apartment } from '../pages/MapPage';

interface SidebarProps {
  onApartmentClick: (apartment: Apartment) => void;
}

const apartments: Apartment[] = [
  {
    id: 1,
    name: '래미안 원베일리',
    price: '35억',
    address: '서울특별시 서초구 반포동',
    lat: 37.505,
    lng: 127.005,
    polygon: [
      { lat: 37.504, lng: 127.004 },
      { lat: 37.506, lng: 127.004 },
      { lat: 37.506, lng: 127.006 },
      { lat: 37.504, lng: 127.006 },
    ],
  },
  {
    id: 2,
    name: '아크로리버파크',
    price: '32억',
    address: '서울특별시 서초구 반포동',
    lat: 37.51,
    lng: 127.01,
    polygon: [
      { lat: 37.509, lng: 127.009 },
      { lat: 37.511, lng: 127.009 },
      { lat: 37.511, lng: 127.011 },
      { lat: 37.509, lng: 127.011 },
    ],
  },
  {
    id: 3,
    name: '반포자이',
    price: '30억',
    address: '서울특별시 서초구 반포동',
    lat: 37.515,
    lng: 127.015,
    polygon: [
      { lat: 37.514, lng: 127.014 },
      { lat: 37.516, lng: 127.016 },
      { lat: 37.516, lng: 127.012 },
      { lat: 37.514, lng: 127.011 },
      { lat: 37.513, lng: 127.014 },
    ],
  },
  {
    id: 4,
    name: '하안주공 10단지',
    price: '30억',
    address: '경기도 광명시 하안동',
    lat: 37.4652845,
    lng: 126.87958,
    polygon: [
      { lat: 37.4642845, lng: 126.87858 },
      { lat: 37.4662845, lng: 126.87858 },
      { lat: 37.4662845, lng: 126.88058 },
      { lat: 37.4642845, lng: 126.88058 },
    ],
  },
];

const Sidebar: React.FC<SidebarProps> = ({ onApartmentClick }) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

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
                ? 'bg-blue-100'
                : 'hover:bg-gray-100'
            }`}
            onClick={() => handleApartmentClick(apartment)}
          >
            <h3 className="font-bold text-lg">{apartment.name}</h3>
            <p className="text-gray-600">{apartment.price}</p>
            <p className="text-sm text-gray-500">{apartment.address}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
