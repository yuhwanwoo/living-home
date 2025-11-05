import React, { useEffect, useRef } from 'react';

declare global {
  interface Window {
    naver: any;
  }
}

/**
 * Props for the HomePage component.
 */
interface HomePageProps {
  // No props for now
}

/**
 * The main home page of the application.
 * It will display the Naver Map.
 */
const HomePage: React.FC<HomePageProps> = () => {
  const mapElement = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);

  useEffect(() => {
    const mapContainer = mapElement.current;
    if (!mapContainer) return;

    const interval = setInterval(() => {
      if (window.naver && window.naver.maps) {
        clearInterval(interval);
        if (!mapInstance.current) {
          const mapOptions = {
            center: new window.naver.maps.LatLng(37.5665, 126.9780),
            zoom: 10,
          };
          mapInstance.current = new window.naver.maps.Map(mapContainer, mapOptions);
        }
      }
    }, 100);

    // Cleanup function to destroy the map instance and clear interval
    return () => {
      clearInterval(interval);
      if (mapInstance.current) {
        mapInstance.current.destroy();
        mapInstance.current = null;
      }
    };
  }, []);

  return (
    <main className="flex-grow">
      <div
        ref={mapElement}
        id="map"
        className="w-full h-full bg-gray-200"
      />
    </main>
  );
};

export default HomePage;