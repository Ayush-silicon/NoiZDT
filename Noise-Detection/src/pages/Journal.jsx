import React from 'react';
import Navbar from '@/components/Navbar';
import NoiseJournal from '@/components/NoiseJournal';

const Journal = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <NoiseJournal />
      </div>
    </div>
  );
};

export default Journal;
