import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Moon, Sun, Menu, X } from "lucide-react";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-md transition-colors">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <img src={logo} alt="NoiseMap Logo" className="h-10 w-10 rounded-full" />
          <span className="text-2xl font-bold text-gray-800 dark:text-white tracking-tight">NoiseMap</span>
        </div>

        {/* Desktop Links */}
        <ul className="hidden md:flex space-x-6 font-medium text-gray-700 dark:text-gray-300">
          <li><Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400">Home</Link></li>
          <li><Link to="/journal" className="hover:text-blue-600 dark:hover:text-blue-400">Journal</Link></li>
          <li><Link to="/report" className="hover:text-blue-600 dark:hover:text-blue-400">Report</Link></li>
          <li><Link to="/quiet" className="hover:text-blue-600 dark:hover:text-blue-400">Quiet Finder</Link></li>
          <li><button className="hover:text-blue-600 dark:hover:text-blue-400">Login</button></li>
        </ul>

        {/* Controls */}
        <div className="flex items-center space-x-4 md:hidden">
          <button onClick={toggleDarkMode}>
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button onClick={toggleMenu}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Dark mode toggle on desktop */}
        <div className="hidden md:flex items-center space-x-4">
          <button onClick={toggleDarkMode} className="text-gray-700 dark:text-gray-300">
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 px-6 py-4 space-y-3 shadow-md">
          <Link to="/" onClick={toggleMenu} className="block text-gray-800 dark:text-gray-200">Home</Link>
          <Link to="/journal" onClick={toggleMenu} className="block text-gray-800 dark:text-gray-200">Journal</Link>
          <Link to="/report" onClick={toggleMenu} className="block text-gray-800 dark:text-gray-200">Report</Link>
          <Link to="/quiet" onClick={toggleMenu} className="block text-gray-800 dark:text-gray-200">Quiet Finder</Link>
          <button className="block text-gray-800 dark:text-gray-200">Login</button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
