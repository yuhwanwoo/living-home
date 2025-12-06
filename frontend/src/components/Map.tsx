// @ts-nocheck
import React, { useEffect, useRef, useState } from 'react';
import { createRoot, Root } from 'react-dom/client';
import { Apartment, ApartmentDataByDate } from '../pages/MapPage';
import PriceMarker from './PriceMarker';

declare global {
  interface Window {
    naver: any;
  }
}

interface MapProps {
  apartments: Apartment[];
  apartmentData: ApartmentDataByDate;
  selectedApartment: Apartment | null;
  onClearSelection: () => void;
  onApartmentClick: (apartment: Apartment) => void;
}

const NaverMap: React.FC<MapProps> = ({
  apartments,
  apartmentData,
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
          center: new window.naver.maps.LatLng(37.468, 126.875), // Centered on Ha-an dong
          zoom: 15,
          mapTypeId: window.naver.maps.MapTypeId.NORMAL,
          scaleControl: false,
          logoControl: false,
          mapDataControl: false,
          zoomControl: false, // We can add custom zoom controls later
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

    // Neon Colors - Updated for better distinction
    const categoryColors = {
      대장단지: '#e879f9', // Fuchsia 400 (Vibrant Purple)
      재개발: '#fbbf24', // Amber 400 (Bright Orange/Gold)
      아파트: '#22d3ee', // Cyan 400 (Electric Blue)
    };

    apartments.forEach((apt) => {
      const isSelected = apt.id === selectedApartment?.id;
      const color = categoryColors[apt.category] || '#94a3b8';

      const polygon = new window.naver.maps.Polygon({
        map: mapRef.current,
        paths: [
          apt.polygon.map((p) => new window.naver.maps.LatLng(p.lat, p.lng)),
        ],
        fillColor: color,
        fillOpacity: isSelected ? 0.6 : 0.2,
        strokeColor: color,
        strokeOpacity: 0.9,
        strokeWeight: isSelected ? 3 : 2,
        clickable: true,
      });

      window.naver.maps.Event.addListener(polygon, 'click', () => {
        onApartmentClick(apt);
      });

      window.naver.maps.Event.addListener(polygon, 'mouseover', () => {
        polygon.setOptions({ fillOpacity: 0.6, strokeWeight: 3 });
      });

      window.naver.maps.Event.addListener(polygon, 'mouseout', () => {
        if (selectedApartment?.id !== apt.id) {
          polygon.setOptions({ fillOpacity: 0.2, strokeWeight: 2 });
        }
      });

      polygonsRef.current.set(apt.id, polygon);

      const markerElement = document.createElement('div');
      markerElement.style.position = 'absolute';
      markerElement.style.zIndex = '100'; // Ensure markers are above polygons
      const root = createRoot(markerElement);
      root.render(
        <PriceMarker
          name={apt.name}
          price={apt.price}
          onClick={() => onApartmentClick(apt)}
        />
      );

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
      mapRef.current.panTo(newCenter); // Smooth transition
      // mapRef.current.setZoom(17); // Keep zoom level or adjust if needed
    }
  }, [mapInitialized, apartments, selectedApartment, onApartmentClick]);

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
      <div ref={mapElement} style={{ width: '100%', height: '100%', background: '#0f172a' }} />
    </div>
  );
};

export default NaverMap;
