import React from 'react';
import Navbar from '@/components/Navbar';
import QuietFinder from '@/components/QuietFinder';

const QuietSpots = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <QuietFinder />
      </div>
    </div>
  );
};

export default QuietSpots;