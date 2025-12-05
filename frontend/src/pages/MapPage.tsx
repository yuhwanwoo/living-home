import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import NaverMap from '../components/Map';
import Sidebar from '../components/Sidebar';
import SearchBar from '../components/SearchBar';
import DetailPanel from '../components/DetailPanel';
import Header from '../components/Header';
import { fetchApartments } from '../api/mockApi';

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

export interface ApartmentDataByDate {
  [date: string]: Apartment[];
}

const MapPage: React.FC = () => {
  const [selectedApartment, setSelectedApartment] = useState<Apartment | null>(
    null
  );

  const { data: apartments = [], isLoading } = useQuery({
    queryKey: ['apartments'],
    queryFn: fetchApartments,
  });

  // Construct apartmentData for compatibility with existing components
  // In a real app, this might be fetched separately or structured differently
  const apartmentData: ApartmentDataByDate = {
    '2025-11-13': apartments,
    // Mocking previous dates for now as duplicates of current data
    // In a real scenario, you'd fetch history or have it in the API response
    '2025-11-12': apartments,
    '2025-11-11': apartments,
  };

  const handleSearch = (query: string) => {
    console.log('Search query:', query);
    // Implement search logic here later
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-900 text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="relative h-screen w-full bg-slate-900 overflow-hidden">
      {/* Header */}
      <Header />

      {/* Map Background */}
      <div className="absolute inset-0 z-0">
        <NaverMap
          apartments={apartments}
          apartmentData={apartmentData}
          selectedApartment={selectedApartment}
          onClearSelection={() => setSelectedApartment(null)}
          onApartmentClick={setSelectedApartment}
        />
      </div>

      {/* Floating UI Elements */}
      <Sidebar
        apartments={apartments}
        selectedApartment={selectedApartment}
        onApartmentClick={setSelectedApartment}
      />

      <div className="absolute top-20 left-6 z-40">
        <SearchBar onSearch={handleSearch} />
      </div>

      {selectedApartment && (
        <DetailPanel
          apartment={selectedApartment}
          apartmentData={apartmentData}
          onClose={() => setSelectedApartment(null)}
        />
      )}
    </div>
  );
};

export default MapPage;