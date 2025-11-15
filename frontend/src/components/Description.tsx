import React, { useState } from 'react';
import { Apartment, ApartmentDataByDate } from '../pages/MapPage';

interface DescriptionProps {
  apartment: Apartment;
  apartmentData: ApartmentDataByDate;
  onClose: () => void;
}

const Description: React.FC<DescriptionProps> = ({
  apartment,
  apartmentData,
  onClose,
}) => {
  const dates = Object.keys(apartmentData).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime()
  );
  const [selectedDate, setSelectedDate] = useState<string>(dates[0] || '');

  const historicalApartment = apartmentData[selectedDate]?.find(
    (apt) => apt.id === apartment.id
  );

  const price = historicalApartment?.price || apartment.price;

  return (
    <div className="fixed top-0 right-0 w-1/6 h-full bg-white shadow-lg p-8 z-10 overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">{apartment.name}</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">
          &times;
        </button>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-bold mb-2">가격 정보</h3>
        <div className="flex mb-2 border-b">
          {dates.map((date) => (
            <button
              key={date}
              className={`px-3 py-1 text-sm font-medium ${
                selectedDate === date
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setSelectedDate(date)}
            >
              {date.substring(5)}
            </button>
          ))}
        </div>
        <ul className="list-disc pl-5">
          {price['59'] && <li><strong>59형:</strong> {price['59']}</li>}
          {price['84'] && <li><strong>84형:</strong> {price['84']}</li>}
          {!price['59'] && !price['84'] && <li>가격 정보 없음</li>}
        </ul>
      </div>

      <div className="prose">
        <h3 className="text-lg font-bold mt-4">주요 정보</h3>
        <p>{apartment.description}</p>
        <ul>
          <li>
            <strong>주소:</strong> {apartment.address}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Description;