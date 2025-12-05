import mockData from '../data/mockData.json';
import { Apartment } from '../pages/MapPage';

// Simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchApartments = async (): Promise<Apartment[]> => {
  await delay(500); // 0.5s delay
  return mockData as Apartment[];
};

export const fetchApartmentHistory = async (id: number) => {
  await delay(300);
  // Simulate history data generation based on the apartment
  // In a real app, this would fetch from an endpoint
  const apartment = mockData.find((apt) => apt.id === id);
  if (!apartment) throw new Error('Apartment not found');

  // Generate some dummy history data
  // This logic mimics the data manipulation seen in the original MapPage.tsx
  // but dynamically generated for the demo
  return {
    '2025-11-13': [apartment],
    '2025-11-12': [{ ...apartment, price: { ...apartment.price, '59': '13.8억', '84': '16.8억' } }],
    '2025-11-11': [{ ...apartment, price: { ...apartment.price, '59': '13.5억', '84': '16.5억' } }],
  };
};
