import React from 'react';
import Header from './components/Header';
import HomePage from './pages/HomePage';

/**
 * The root component of the application.
 * It sets up the main layout.
 */
const App: React.FC = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <HomePage />
    </div>
  );
}

export default App;
