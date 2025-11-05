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
          {/* Left: Logo */}
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
          </div>

          {/* Center: Menu */}
          <div className="flex justify-center flex-grow">
            <a href="/" className="text-gray-600 hover:text-gray-900 px-3 py-2">지도 home</a>
            <a href="#" className="text-gray-600 hover:text-gray-900 px-3 py-2">메뉴 1</a>
            <a href="#" className="text-gray-600 hover:text-gray-900 px-3 py-2">메뉴 2</a>
            <a href="#" className="text-gray-600 hover:text-gray-900 px-3 py-2">메뉴 3</a>
          </div>

          {/* Right: Spacer to balance the logo */}
          <div className="flex-shrink-0" style={{ width: '40px' }}>
            {/* This is a spacer to help center the menu. It should have the same width as the logo. */}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
