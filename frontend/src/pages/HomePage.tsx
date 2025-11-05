import React from 'react';

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
  return (
    <main className="flex-grow">
      <div
        id="map"
        className="w-full h-full bg-gray-200"
      >
        {/* Naver Map will be rendered here */}
      </div>
    </main>
  );
};

export default HomePage;
