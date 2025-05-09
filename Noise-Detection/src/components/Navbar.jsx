import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Map, BookOpen, BarChart2, Settings, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ReportForm from '@/components/ReportForm';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showReportForm, setShowReportForm] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const navigate = useNavigate();
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);
  const [username, setUsername] = useState('');

  React.useEffect(() => {
    if (token) {
      // Optionally decode token to get username
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUsername(payload.username || 'User');
      } catch {
        setUsername('User');
      }
    } else {
      setUsername('');
    }
    setIsLoggedIn(!!token);
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUsername('');
    navigate('/');
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <div className="w-8 h-8 bg-noise-500 rounded-full flex items-center justify-center">
                  <Map className="w-5 h-5 text-white" />
                </div>
                <span className="ml-2 text-xl font-semibold text-gray-900">
                  SonicSight
                </span>
              </Link>
            </div>

            {/* Desktop navigation */}
            <div className="hidden md:flex md:items-center">
              <Link to="/" className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-noise-600">
                <Map className="w-4 h-4 mr-1" />
                Map
              </Link>
              <Link to="/journal" className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-noise-600">
                <BookOpen className="w-4 h-4 mr-1" />
                Journal
              </Link>
              <Link to="/forecast" className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-noise-600">
                <BarChart2 className="w-4 h-4 mr-1" />
                Forecast
              </Link>
              <Link to="/quiet-spots" className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-noise-600">
                <MapPin className="w-4 h-4 mr-1" />
                Quiet Spots
              </Link>
              {isLoggedIn ? (
                <>
                  <span className="flex items-center px-3 py-2 text-sm font-medium text-gray-700">Welcome, {username}</span>
                  <button onClick={handleLogout} className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-noise-600 focus:outline-none">Logout</button>
                </>
              ) : (
                <Link to="/login" className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-noise-600">Sign In</Link>
              )}
              <Button
                className="ml-2 bg-noise-500 hover:bg-noise-600"
                size="sm"
                onClick={() => setShowReportForm(true)}
              >
                Report Noise
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={toggleMenu}
                className="text-gray-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-noise-500"
              >
                {isOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden border-t border-gray-100">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                to="/"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-noise-600 hover:bg-gray-50"
                onClick={toggleMenu}
              >
                <div className="flex items-center">
                  <Map className="w-5 h-5 mr-2" />
                  Map
                </div>
              </Link>
              <Link
                to="/journal"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-noise-600 hover:bg-gray-50"
                onClick={toggleMenu}
              >
                <div className="flex items-center">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Journal
                </div>
              </Link>
              <Link
                to="/forecast"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-noise-600 hover:bg-gray-50"
                onClick={toggleMenu}
              >
                <div className="flex items-center">
                  <BarChart2 className="w-5 h-5 mr-2" />
                  Forecast
                </div>
              </Link>
              <Link
                to="/quiet-spots"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-noise-600 hover:bg-gray-50"
                onClick={toggleMenu}
              >
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  Quiet Spots
                </div>
              </Link>
              {isLoggedIn ? (
                <>
                  <span className="block px-3 py-2 rounded-md text-base font-medium text-gray-700">Welcome, {username}</span>
                  <button onClick={() => { handleLogout(); toggleMenu(); }} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-noise-600 focus:outline-none">Logout</button>
                </>
              ) : (
                <Link to="/login" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-noise-600 hover:bg-gray-50" onClick={toggleMenu}>Sign In</Link>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Report Noise Modal */}
      <ReportForm isOpen={showReportForm} onClose={() => setShowReportForm(false)} />

      {/* Settings Modal (Sheet) */}
      <Sheet open={showSettings} onOpenChange={setShowSettings}>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>Settings</SheetTitle>
          </SheetHeader>
          <div className="p-4">
            <p className="text-gray-600">Settings content goes here.</p>
            {/* Add your settings form/controls here */}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Navbar;