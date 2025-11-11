import React, { useState } from 'react';
import Map from '../components/Map';
import Sidebar from '../components/Sidebar';

export interface Apartment {
  id: number;
  name: string;
  price: string;
  address: string;
  lat: number;
  lng: number;
  polygon: { lat: number; lng: number }[];
  description: string;
  category: '대장단지' | '재개발' | '아파트';
}

const MapPage: React.FC = () => {
  const [selectedApartment, setSelectedApartment] = useState<Apartment | null>(
    null
  );

  return (
    <div className="flex h-screen">
      <Sidebar onApartmentClick={setSelectedApartment} />
      <div className="flex-1 h-full">
        <Map
          selectedApartment={selectedApartment}
          onClearSelection={() => setSelectedApartment(null)}
        />
      </div>
    </div>
  );
};

export default MapPage;