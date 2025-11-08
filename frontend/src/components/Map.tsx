import React, { useEffect, useRef, useState } from 'react';
import { Apartment } from '../pages/MapPage';
import Journal from './Journal';

declare global {
  interface Window {
    naver: any;
  }
}

interface MapProps {
  selectedApartment: Apartment | null;
}

const Map: React.FC<MapProps> = ({ selectedApartment }) => {
  const mapElement = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const polygonRef = useRef<any>(null);
  const [isJournalOpen, setIsJournalOpen] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.REACT_APP_NAVER_MAP_CLIENT_ID}`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      if (mapElement.current) {
        const map = new window.naver.maps.Map(mapElement.current, {
          center: new window.naver.maps.LatLng(37.5124, 127.0122),
          zoom: 15,
        });
        mapRef.current = map;
      }
    };

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (mapRef.current && selectedApartment) {
      setTimeout(() => {
        const { lat, lng, polygon } = selectedApartment;
        const newCenter = new window.naver.maps.LatLng(lat, lng);
        mapRef.current.setCenter(newCenter);
        mapRef.current.setZoom(17);

        if (polygonRef.current) {
          polygonRef.current.setMap(null);
        }

        const newPolygon = new window.naver.maps.Polygon({
          map: mapRef.current,
          paths: [
            polygon.map((p) => new window.naver.maps.LatLng(p.lat, p.lng)),
          ],
          fillColor: '#ff0000',
          fillOpacity: 0.3,
          strokeColor: '#ff0000',
          strokeOpacity: 0.6,
          strokeWeight: 3,
          clickable: true,
        });

        window.naver.maps.Event.addListener(newPolygon, 'click', () => {
          console.log('Polygon clicked!');
          setIsJournalOpen(true);
        });

        polygonRef.current = newPolygon;
      }, 100);
    }
  }, [selectedApartment]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div ref={mapElement} style={{ width: '100%', height: '100%' }} />
      {isJournalOpen && <Journal onClose={() => setIsJournalOpen(false)} />}
    </div>
  );
};

export default Map;
