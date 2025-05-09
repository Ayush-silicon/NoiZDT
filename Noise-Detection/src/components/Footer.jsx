import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="bg-white border-t border-gray-200 py-6 mt-8 shadow-inner">
    <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
      <div className="text-gray-600 text-sm mb-2 md:mb-0">
        &copy; {new Date().getFullYear()} SonicSight. All rights reserved.
      </div>
      <div className="flex space-x-4 text-sm">
        <Link to="/" className="text-noise-600 hover:underline">Home</Link>
        <Link to="/journal" className="text-noise-600 hover:underline">Journal</Link>
        <Link to="/forecast" className="text-noise-600 hover:underline">Forecast</Link>
        <Link to="/quiet-spots" className="text-noise-600 hover:underline">Quiet Spots</Link>
      </div>
    </div>
  </footer>
);

export default Footer; 