import React from 'react';
import { Apartment } from '../pages/MapPage';

interface DescriptionProps {
  apartment: Apartment;
  onClose: () => void;
}

const Description: React.FC<DescriptionProps> = ({ apartment, onClose }) => {
  console.log('Description component rendered for:', apartment.name);
  return (
    <div className="fixed top-0 right-0 w-1/6 h-full bg-white shadow-lg p-8 z-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">{apartment.name}</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          X
        </button>
      </div>
      <div className="prose">
        <p>{apartment.description}</p>
        <h3 className="text-lg font-bold mt-4">주요 정보</h3>
        <ul>
          {apartment.price['59'] && <li><strong>59형 가격:</strong> {apartment.price['59']}</li>}
          {apartment.price['84'] && <li><strong>84형 가격:</strong> {apartment.price['84']}</li>}
          <li><strong>주소:</strong> {apartment.address}</li>
        </ul>
      </div>
    </div>
  );
};

export default Description;
