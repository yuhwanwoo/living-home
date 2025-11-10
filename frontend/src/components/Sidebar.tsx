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
    description: '한강 조망이 가능한 최고의 입지를 자랑하는 아파트입니다. 최고급 마감재와 커뮤니티 시설을 갖추고 있습니다.',
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
    description: '반포의 중심에 위치한 랜드마크 아파트로, 편리한 교통과 우수한 학군을 자랑합니다.',
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
    description: '대단지 아파트로, 단지 내 조경이 아름답고 다양한 편의시설을 갖추고 있어 생활이 편리합니다.',
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
    description: '광명시의 중심에 위치한 아파트로, 주변에 공원과 상업시설이 많아 살기 좋은 환경을 제공합니다.',
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
