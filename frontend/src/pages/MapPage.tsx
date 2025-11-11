import React, { useState } from 'react';
import NaverMap from '../components/Map';
import Sidebar from '../components/Sidebar';

export interface Apartment {
  id: number;
  name: string;
  price: {
    '59'?: string;
    '84'?: string;
  };
  address: string;
  lat: number;
  lng: number;
  polygon: { lat: number; lng: number }[];
  description: string;
  category: '대장단지' | '재개발' | '아파트';
}

const apartments: Apartment[] = [
  {
    id: 1,
    name: '철산자이 더헤리티지',
    price: { '59': '10억', '84': '13억' },
    address: '경기 광명시 철산동',
    lat: 37.482235,
    lng: 126.869145,
    polygon: [
      { lat: 37.484048, lng: 126.866569 },
      { lat: 37.483713, lng: 126.866618 },
      { lat: 37.481463, lng: 126.865176 },
      { lat: 37.48055, lng: 126.867168 },
      { lat: 37.481643, lng: 126.871997 },
      { lat: 37.484832, lng: 126.870749 },
    ],
    description:
      '한강 조망이 가능한 최고의 입지를 자랑하는 아파트입니다. 최고급 마감재와 커뮤니티 시설을 갖추고 있습니다.',
    category: '대장단지',
  },
  {
    id: 2,
    name: '하안 주공 4단지',
    price: { '59': '6.2억' },
    address: '경기도 광명시 하안동',
    lat: 37.46433,
    lng: 126.877251,
    polygon: [
      { lat: 37.464885, lng: 126.875816 },
      { lat: 37.465549, lng: 126.877056 },
      { lat: 37.463726, lng: 126.878659 },
      { lat: 37.463028, lng: 126.877383 },
    ],
    description:
      '반포의 중심에 위치한 랜드마크 아파트로, 편리한 교통과 우수한 학군을 자랑합니다.',
    category: '아파트',
  },
  {
    id: 3,
    name: '하안 주공 11단지',
    price: { '84': '7.5억' },
    address: '경기도 광명시 하안동',
    lat: 37.464773,
    lng: 126.881659,
    polygon: [
      { lat: 37.463934, lng: 126.879281 },
      { lat: 37.465282, lng: 126.881676 },
      { lat: 37.464295, lng: 126.882744 },
      { lat: 37.463274, lng: 126.880906 },
      { lat: 37.463555, lng: 126.880591 },
      { lat: 37.463198, lng: 126.879798 },
    ],
    description:
      '대단지 아파트로, 단지 내 조경이 아름답고 다양한 편의시설을 갖추고 있어 생활이 편리합니다.',
    category: '아파트',
  },
  {
    id: 4,
    name: '하안주공 10단지',
    price: { '59': '5.8억', '84': '7.2억' },
    address: '경기도 광명시 하안동',
    lat: 37.4652845,
    lng: 126.87958,
    polygon: [
      { lat: 37.465659, lng: 126.877275 },
      { lat: 37.467082, lng: 126.879894 },
      { lat: 37.46536, lng: 126.881566 },
      { lat: 37.46386, lng: 126.878805 },
    ],
    description:
      '광명시의 중심에 위치한 아파트로, 주변에 공원과 상업시설이 많아 살기 좋은 환경을 제공합니다.',
    category: '아파트',
  },
  {
    id: 5,
    name: '힐스테이트 광명 11R 재개발',
    price: { '59': '8억', '84': '11억' },
    address: '경기도 광명시 하안동',
    lat: 37.47726,
    lng: 126.856862,
    polygon: [
      { lat: 37.477678, lng: 126.854266 },
      { lat: 37.47626, lng: 126.853572 },
      { lat: 37.475021, lng: 126.85965 },
      { lat: 37.477224, lng: 126.860296 },
      { lat: 37.478607, lng: 126.855506 },
      { lat: 37.477511, lng: 126.854924 },
    ],
    description:
      '광명시의 중심에 위치한 아파트로, 주변에 공원과 상업시설이 많아 살기 좋은 환경을 제공합니다.',
    category: '재개발',
  },
{
    id: 6,
    name: '철산 주공 13단지',
    price: { '59': '8억', '84': '11억' },
    address: '경기 광명시 철산동',
    lat: 37.479259,
    lng: 126.870085,
    polygon: [
      { lat: 37.480511, lng: 126.867960 },
        { lat: 37.476807, lng: 126.869441 },
        { lat: 37.477693, lng: 126.872434 },
        { lat: 37.478570, lng: 126.871952 },
        { lat: 37.478936, lng: 126.873314 },
        { lat: 37.481439, lng: 126.872123 }
    ],
    description:
      '광명시의 중심에 위치한 아파트로, 주변에 공원과 상업시설이 많아 살기 좋은 환경을 제공합니다.',
    category: '대장단지',
  },
];

const MapPage: React.FC = () => {
  const [selectedApartment, setSelectedApartment] = useState<Apartment | null>(
    null
  );

  return (
    <div className="flex h-screen">
      <Sidebar
        apartments={apartments}
        onApartmentClick={setSelectedApartment}
      />
      <div className="flex-1 h-full">
        <NaverMap
          apartments={apartments}
          selectedApartment={selectedApartment}
          onClearSelection={() => setSelectedApartment(null)}
          onApartmentClick={setSelectedApartment}
        />
      </div>
    </div>
  );
};

export default MapPage;
