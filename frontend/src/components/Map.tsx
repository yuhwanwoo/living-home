// @ts-nocheck
import React, { useEffect, useRef, useState } from 'react';
import { createRoot, Root } from 'react-dom/client';
import { Apartment } from '../pages/MapPage';
import Description from './Description';
import PriceMarker from './PriceMarker';

declare global {
  interface Window {
    naver: any;
  }
}

interface MapProps {
  apartments: Apartment[];
  selectedApartment: Apartment | null;
  onClearSelection: () => void;
  onApartmentClick: (apartment: Apartment) => void;
}

const NaverMap: React.FC<MapProps> = ({
  apartments,
  selectedApartment,
  onClearSelection,
  onApartmentClick,
}) => {
  const mapElement = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const polygonsRef = useRef(new Map<number, any>());
  const markersRef = useRef(new Map<number, any>());
  const [mapInitialized, setMapInitialized] = useState(false);

  // Naver Map script loading
  useEffect(() => {
    const scriptId = 'naver-maps-script';
    let script = document.getElementById(scriptId) as HTMLScriptElement;

    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.REACT_APP_NAVER_MAP_CLIENT_ID}`;
      script.async = true;
      document.head.appendChild(script);
    }

    script.onload = () => {
      if (mapElement.current && !mapRef.current) {
        const map = new window.naver.maps.Map(mapElement.current, {
          center: new window.naver.maps.LatLng(37.5124, 127.0122),
          zoom: 12,
        });
        mapRef.current = map;
        setMapInitialized(true);
      }
    };
  }, []);

  // Map objects (polygons, markers) rendering
  useEffect(() => {
    if (!mapInitialized) return;

    // Define Custom Overlay Class only when the map is ready
    function PriceMarkerOverlay(
      position: any,
      content: HTMLElement,
      root: Root
    ) {
      this._position = position;
      this._content = content;
      this._root = root;
      this.setMap(null);
    }

    PriceMarkerOverlay.prototype = new window.naver.maps.OverlayView();
    PriceMarkerOverlay.prototype.constructor = PriceMarkerOverlay;

    PriceMarkerOverlay.prototype.onAdd = function () {
      const overlayLayer = this.getPanes().overlayLayer;
      overlayLayer.appendChild(this._content);
    };

    PriceMarkerOverlay.prototype.draw = function () {
      if (!this.getMap()) return;
      const projection = this.getProjection();
      const pixelPosition = projection.fromCoordToOffset(this._position);
      this._content.style.left = `${pixelPosition.x}px`;
      this._content.style.top = `${pixelPosition.y}px`;
    };

    PriceMarkerOverlay.prototype.onRemove = function () {
      this._root.unmount();
      if (this._content.parentNode) {
        this._content.parentNode.removeChild(this._content);
      }
    };

    // Cleanup previous markers and polygons
    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current.clear();
    polygonsRef.current.forEach((polygon) => polygon.setMap(null));
    polygonsRef.current.clear();

    const categoryColors = {
      대장단지: '#ff0000',
      재개발: '#00ff00',
      아파트: '#0000ff',
    };

    apartments.forEach((apt) => {
      const isSelected = apt.id === selectedApartment?.id;
      const color = categoryColors[apt.category] || '#000000';

      const polygon = new window.naver.maps.Polygon({
        map: mapRef.current,
        paths: [
          apt.polygon.map((p) => new window.naver.maps.LatLng(p.lat, p.lng)),
        ],
        fillColor: color,
        fillOpacity: isSelected ? 0.7 : 0.3,
        strokeColor: color,
        strokeOpacity: 0.8,
        strokeWeight: isSelected ? 4 : 2,
        clickable: true,
      });

      window.naver.maps.Event.addListener(polygon, 'click', () => {
        onApartmentClick(apt);
      });

      polygonsRef.current.set(apt.id, polygon);

      const markerElement = document.createElement('div');
      markerElement.style.position = 'absolute';
      const root = createRoot(markerElement);
      root.render(<PriceMarker name={apt.name} price={apt.price} />);

      const priceMarker = new (PriceMarkerOverlay as any)(
        new window.naver.maps.LatLng(apt.lat, apt.lng),
        markerElement,
        root
      );

      priceMarker.setMap(mapRef.current);
      markersRef.current.set(apt.id, priceMarker);
    });

    if (selectedApartment) {
      const { lat, lng } = selectedApartment;
      const newCenter = new window.naver.maps.LatLng(lat, lng);
      mapRef.current.setCenter(newCenter);
      mapRef.current.setZoom(17);
    }
  }, [mapInitialized, apartments, selectedApartment, onApartmentClick]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div ref={mapElement} style={{ width: '100%', height: '100%' }} />
      {selectedApartment && (
        <Description apartment={selectedApartment} onClose={onClearSelection} />
      )}
    </div>
  );
};

export default NaverMap;
