import React, { useEffect, useRef } from 'react';

declare global {
  interface Window {
    naver: any;
  }
}

const Map: React.FC = () => {
  const mapElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.REACT_APP_NAVER_MAP_CLIENT_ID}`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      if (mapElement.current) {
        const map = new window.naver.maps.Map(mapElement.current, {
          center: new window.naver.maps.LatLng(37.5665, 126.9780),
          zoom: 10,
        });
      }
    };

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return <div ref={mapElement} style={{ width: '100%', height: '100%' }} />;
};

export default Map;
