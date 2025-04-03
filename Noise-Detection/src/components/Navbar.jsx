import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-gray-900 text-white shadow-lg">
      <div className="max-w-5xl mx-auto flex justify-between items-center py-4 px-6">
        <Link to="/" className="text-2xl font-bold text-teal-400">
          NoiseMap
        </Link>
        <div className="space-x-6">
          <Link to="/" className="hover:text-teal-300 transition-colors">
            Home
          </Link>
          <Link to="/journal" className="hover:text-teal-300 transition-colors">
            Journal
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;