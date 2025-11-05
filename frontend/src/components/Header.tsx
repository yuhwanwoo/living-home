import React from 'react';

/**
 * Props for the Header component.
 */
interface HeaderProps {
  // No props for now
}

/**
 * The main header and navigation bar for the application.
 * It displays the main menu items.
 */
const Header: React.FC<HeaderProps> = () => {
  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="text-xl font-semibold text-gray-700">
            <a href="/" className="text-gray-800 hover:text-gray-700">지도 home</a>
          </div>
          {/* Future menu items can be added here */}
        </div>
      </nav>
    </header>
  );
};

export default Header;
